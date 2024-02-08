export default function Card() {
    return (
        <div className="w-max border-2 border-gray-200 rounded-md">
            <div className="bg-white px-4 py-2 rounded-tl-md rounded-tr-md">
                <h4 className="font-bold text-base text-black">Converse</h4>
                <p className="text-xs font-medium text-gray-400">This application needs access to your Google API Key.</p>
            </div>
            <div className="bg-gray-100 px-4 py-3.5 rounded-bl-md rounded-br-md">
                <div className="flex">
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-1.5 pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 stroke-2 text-black" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path className="stroke-0" d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" fill="currentColor" />
                            </svg>
                        </div>
                        <input type="text" className="w-full rounded-md h-8 ps-7 p-2.5 pe-8 pr-0 text-sm font-basic border border-gray-300 focus:outline-none focus:border-gray-700" placeholder="Enter Google API Key"></input>
                        <div className="absolute inset-y-0 end-0 flex items-center pe-1.5 p-1 bg-black rounded-tr-md rounded-br-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M15 17L20 12L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4 18V16C4 14.9391 4.42143 13.9217 5.17157 13.1716C5.92172 12.4214 6.93913 12 8 12H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="text-xs text-gray-400 font-medium mt-2">
                    <p className="font-bold">To retrieve API key</p>
                    <ol className="list-decimal list-inside leading-5">
                        <li>Go to <a href="https://makersuite.google.com/app/apikey" className="underline font-bold" target="__blank">https://makersuite.google.com/app/apikey</a></li>
                        <li>Click on <span className="font-bold">Get API Key</span></li>
                        <li>Copy the API key and paste it above</li>
                        <li>Click on <span className="font-bold">Verify</span></li>
                    </ol>
                </div>
            </div>
        </div>
    )
}