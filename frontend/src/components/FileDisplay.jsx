import UploadIcon from '../assets/upload-file.gif';

export default function FileDisplay({ fileName, uploadStatus, handleUpload }) {

    const handleButton = () => {
        handleUpload();
    }

    return (
        <>
            <div className="mt-3 w-50 h-max bg-gray-50 rounded-md p-1 flex gap-1 items-center border-2 border-gray-200">
                <div className='flex items-center gap-1'>
                    {uploadStatus ?
                        <svg className='stroke-green-400' xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <path d="M12 11v6" />
                            <path d="M9.5 13.5l2.5 -2.5l2.5 2.5" />
                        </svg> :
                        <img src={UploadIcon} alt="" width="35" height="35" />
                    }
                    <p className="text-xs font-medium text-gray-600 w-44 truncate" title={`Uploading ${fileName}`}>
                        {uploadStatus ? <span>Uploaded {fileName}</span> : <span>Uploading {fileName}</span>}
                    </p>
                    <div className={`flex m-1.5 ${!uploadStatus ? 'hidden' : ''}`}>
                        <button id="uploadConsent" onClick={handleButton} title='Click to Proceed'>
                            <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z" strokeWidth="0" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <p className={`text-xs text-center font-medium text-gray-500 ${!uploadStatus ? 'hidden' : ''}`}>click on the checkbox to proceed</p>
        </>
    )
}