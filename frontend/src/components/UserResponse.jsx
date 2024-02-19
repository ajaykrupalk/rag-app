export default function UserResponse({ text }) {
    return (
        <div className="mx-1.5 mb-3 flex justify-center flex-nowrap">
            <div className="bg-black h-[24px] w-[24px] rounded-full flex justify-center items-center">
                <svg className="stroke-white h-[18px] w-[24px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg>
            </div>
            <div className="ml-1 p-1.5 w-[35rem] h-auto bg-white rounded-md rounded-tl-none border-2 border-gray-200">
                <p>{ text }</p>
            </div>
        </div>
    );
}