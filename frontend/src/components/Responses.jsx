import UserResponse from "./UserResponse";
import PdfDisplay from "./PdfDisplay";
import ChatResponse from "./ChatResponse";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

export default function Responses({ fileName, userInput, fileObj }) {
    const chatContainerRef = useRef(null);
    const [messages, setMessages] = useState([])
    const [cookies, setCookies] = useCookies(['token', 'fileUrl']);
    const [streamingText, setStreamingText] = useState("")
    const [textStream, setTextStream] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState("");
    const formData = new FormData();

    useEffect(() => {
        if (cookies.fileUrl) {
            setSessionId(`${Date.now()}-${Math.floor(Math.random() * 10000)}`)
        }
    },[cookies.fileUrl])

    useEffect(() => {
        const handleMessage = async (message) => {
            if (message && !loading && !textStream) {
                setLoading(true)
                setMessages([...messages, { type: 'user', text: message }])
                const token = cookies.token
                formData.append('token', token)
                formData.append('question', message)
                formData.append('sessionId', sessionId)
                formData.append('file', fileObj)
                console.log('responses', fileObj)
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URI}/pdfchat`, {
                    method: 'POST',
                    body: formData
                })

                if (!response.ok) {
                    setMessages(prevMessages => [...prevMessages, { type: 'ai', text: 'Network response was not ok' }]);
                    setLoading(false);
                    setTextStream(false);
                    throw new Error('Network response was not ok');
                }

                const reader = response.body.getReader();

                let result = ''

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const text = new TextDecoder().decode(value);
                    result += text;
                    setLoading(false)
                    setTextStream(true);
                    scrollToBottom();
                    setStreamingText(prevText => prevText + text)
                }
                scrollToBottom();
                setStreamingText('')
                setTextStream(false);
                setMessages(prevMessages => [...prevMessages, { type: 'ai', text: result }]);
            }
        }

        handleMessage(userInput);
    }, [userInput, chatContainerRef]);

    useEffect(() => {
        scrollToBottom();
    }, [messages])

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    return (
        <div className="h-full w-full overflow-y-auto" ref={chatContainerRef}>
            <PdfDisplay fileName={fileName} />
            {textStream}
            {messages.map((message, index) => (
                <div key={index}>
                    {message.type === 'user' ?
                        <UserResponse text={message.text} /> :
                        <ChatResponse text={message.text} />
                    }
                </div>
            ))}
            <div className={`mb-3 flex justify-center flex-nowrap ${loading ? '' : 'hidden'}`}>
                <div className="bg-black h-8 w-8 rounded-full flex justify-center items-center">
                    <svg className="stroke-white fill-white animate-spin" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
                    </svg>
                </div>
                <div className="ml-2 w-[35rem]">
                </div>
            </div>
            <div className={textStream ? '' : 'hidden'}>
                <ChatResponse text={streamingText} />
            </div>
        </div>
    )
}