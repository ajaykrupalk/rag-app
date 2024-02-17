const { ChatGoogleGenerativeAI } = require('@langchain/google-genai')
const { helper } = require('../helpers/helper')

const welcome = (req, res) => {
    res.status(200).send('Hello World!')
}

const auth = async (req, res) => {
    console.log("Checking Authentication...")
    try {
        const { token } = req.body
        const model = new ChatGoogleGenerativeAI({
            modelName: "gemini-pro",
            maxOutputTokens: 1,
            apiKey: token
        });

        await model.invoke([
            [
                "human",
                "Hello World!",
            ],
        ]);

        return res.status(200).json({ message: 'Authorized Successfully' })
    } catch (err) {
        console.error(err)
        return res.status(401).json({ message: err.message })
    }
}

const pdfchat = async (req, res) => {
    try {
        const filePath = req.file.path;
        const { token, question, sessionId } = req.body
        console.log("Request Body", sessionId)
        const stream = await helper(token, question, sessionId, filePath)

        for await (const chunk of stream) {
            const decoder = new TextDecoder();
            const text = decoder.decode(chunk);
            console.log("Chunk:", text);
            res.write(text)
        }
        res.end();
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e.message })
    }
}


module.exports = { welcome, auth, pdfchat };