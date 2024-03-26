import dotenv from "dotenv";
import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { RunnablePassthrough, RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
// import * as parse from "pdf-parse";
import fs from "fs";
dotenv.config();


async function loadAndSplitChunks({
    fileUrl,
    chunkSize,
    chunkOverlap
}) {

    const loader = new PDFLoader(fileUrl);

    const rawCS229Docs = await loader.load();

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize,
        chunkOverlap,
    });

    const splitDocs = await splitter.splitDocuments(rawCS229Docs);
    return splitDocs;

}

async function initializeVectorstoreWithDocuments({
    documents, token
}) {
    const embeddings = new GoogleGenerativeAIEmbeddings({
        modelName: "embedding-001", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Retrieval Document",
        apiKey: token
    });;
    const vectorstore = new MemoryVectorStore(embeddings);
    await vectorstore.addDocuments(documents);
    return vectorstore;
}

function createDocumentRetrievalChain(retriever) {
    const convertDocsToString = (documents) => {
        return documents.map((document) => `<doc>\n${document.pageContent}\n</doc>`).join("\n");
    };

    const documentRetrievalChain = RunnableSequence.from([
        (input) => input.standalone_question,
        retriever,
        convertDocsToString,
    ]);

    return documentRetrievalChain;
}

function createRephraseQuestionChain(token) {
    const REPHRASE_QUESTION_SYSTEM_TEMPLATE = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.`;

    const rephraseQuestionChainPrompt = ChatPromptTemplate.fromMessages([
        ["system", REPHRASE_QUESTION_SYSTEM_TEMPLATE],
        new MessagesPlaceholder("history"),
        ["human", "Rephrase the following question as a standalone question:\n{question}"],
    ]);
    const rephraseQuestionChain = RunnableSequence.from([
        rephraseQuestionChainPrompt,
        new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            maxOutputTokens: 2048,
            apiKey: token
        }),
        new StringOutputParser(),
    ]);
    return rephraseQuestionChain;
}

const messageHistory = new ChatMessageHistory();
// we should create a new history object per session
const messageHistories = {}
const getMessageHistoryForSession = (sessionId) => {
    if (messageHistories[sessionId] !== undefined) {
        return messageHistories[sessionId];
    }
    const newChatSessionHistory = new ChatMessageHistory();
    messageHistories[sessionId] = newChatSessionHistory;
    return newChatSessionHistory;
};


async function helper(token, question, sessionId, fileUrl) {
    // load the pdf file and split the document
        const splitDocs = await loadAndSplitChunks({
        fileUrl: fileUrl,
        chunkSize: 1536,
        chunkOverlap: 128,
    });

    const vectorstore = await initializeVectorstoreWithDocuments({
        documents: splitDocs,
        token
    });

    // retrieve the document the vectorstore
    const retriever = vectorstore.asRetriever();

    fs.unlink(fileUrl, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });


    const documentRetrievalChain = createDocumentRetrievalChain(retriever);
    const rephraseQuestionChain = createRephraseQuestionChain(token);

    // make a prompt template
    const ANSWER_CHAIN_SYSTEM_TEMPLATE = `You are an experienced researcher,
    expert at interpreting and answering questions based on provided sources.
    Using the below provided context and chat history, 
    answer the user's question to the best of your ability
    using only the resources provided. Be verbose!
    
    <context>
    {context}
    </context>`;

    const answerGenerationChainPrompt = ChatPromptTemplate.fromMessages([
        ["system", ANSWER_CHAIN_SYSTEM_TEMPLATE],
        new MessagesPlaceholder("history"),
        [
            "human",
            `Now, answer this question using the previous context and chat history:
      
        {standalone_question}`
        ]
    ]);

    const conversationalRetrievalChain = RunnableSequence.from([
        RunnablePassthrough.assign({
            standalone_question: rephraseQuestionChain,
        }),
        RunnablePassthrough.assign({
            context: documentRetrievalChain,
        }),
        answerGenerationChainPrompt,
        new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            maxOutputTokens: 2048,
            apiKey: token
        }),
    ]);

    // "text/event-stream" is also supported
    const httpResponseOutputParser = new HttpResponseOutputParser({
        contentType: "text/plain"
    });

    const finalRetrievalChain = new RunnableWithMessageHistory({
        runnable: conversationalRetrievalChain,
        getMessageHistory: getMessageHistoryForSession,
        inputMessagesKey: "question",
        historyMessagesKey: "history",
    }).pipe(httpResponseOutputParser);

    const stream = await finalRetrievalChain.stream({
        question: question
    }, {
        configurable: { sessionId: sessionId }
    });

    return stream;
}

export {helper};
// module.exports = { helper }