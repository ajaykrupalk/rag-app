import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default function InputBox({ handleInput }) {
    const textAreaRef = useRef("")
    const [value, setValue] = useState("")

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (value) {
            document.getElementById("send_btn").disabled = false;
        } else {
            document.getElementById("send_btn").disabled = true;
        }
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
    }, [value])

    const handleInputValueChange = () => {
        document.getElementById("send_btn").disabled = true;
        handleInput(value)
        setValue('')
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleInputValueChange();
        }
    }

    return (
        <div className="mb-2 w-full flex flex-col items-center p-1.5">
            <div className="relative w-full sm:w-[40rem]">
                <textarea className="w-full overflow-y-hidden max-h-[120px] p-2 pr-12 resize-none rounded-md focus: outline-none ring-1 ring-gray-200 focus:ring-1 focus:ring-gray-300 placeholder-black/50"
                    placeholder="Ask your PDF..." rows="1" value={value} ref={textAreaRef}
                    onChange={handleChange} onKeyDown={handleKeyDown}
                >
                </textarea>
                <button className="absolute bottom-3 right-2 flex p-0.5 rounded-md bg-black disabled:opacity-10" onClick={handleInputValueChange} id="send_btn">
                    <svg className="stroke-gray-200" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M19.9351 12.6258C19.6807 13.8374 18.327 14.7077 15.6198 16.4481C12.6753 18.3411 11.203 19.2876 10.0105 18.9229C9.60662 18.7994 9.23463 18.5823 8.92227 18.2876C8 17.4178 8 15.6118 8 12C8 8.38816 8 6.58224 8.92227 5.71235C9.23463 5.41773 9.60662 5.20057 10.0105 5.07707C11.203 4.71243 12.6753 5.6589 15.6198 7.55186C18.327 9.29233 19.6807 10.1626 19.9351 11.3742C20.0216 11.7865 20.0216 12.2135 19.9351 12.6258Z" strokeWidth="2" strokeLinejoin="round" />
                        <path d="M4 5L4 19" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <p className="min-[320px]:text-[12px] sm:text-sm text-center text-gray-500">AI can make mistakes. Consider checking important information.</p>
        </div>
    );
}