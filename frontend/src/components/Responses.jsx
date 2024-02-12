import UserResponse from "./UserResponse";
import PdfDisplay from "./PdfDisplay";
import ChatResponse from "./ChatResponse";
import { useEffect, useRef } from "react";

export default function Responses({ fileName, fileUrl}) {
    const chatContainerRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    })

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }

    return (
        <div className="h-full w-full overflow-y-auto" ref={chatContainerRef}>
            <PdfDisplay fileName={fileName} fileUrl={fileUrl}/>
            <UserResponse />
            <ChatResponse />
            <UserResponse />
            <ChatResponse />
        </div>
    )
}