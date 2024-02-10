import { useState } from 'react';
import PdfIcon from '../assets/pdf-svgrepo-com.svg'
import FileDisplay from './FileDisplay';

export default function Upload() {
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState("");
    const [uploadStatus, setUploadStatus] = useState(false);
    const [error, setError] = useState("");

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);

        setFileName('')
        setUploadStatus(false)
        setFileName(e.dataTransfer.files[0].name)
        handleFile(e.dataTransfer.files[0])
    }

    const handleFileChange = (e) => {
        e.preventDefault();
        setFileName('')
        setUploadStatus(false)
        setFileName(e.target.files[0].name)
        handleFile(e.target.files[0])
    }

    const handleFile = (file) => {
        if(file.type.startsWith('application/pdf')){
            setTimeout(()=>{
                setUploadStatus(true);
            }, 5000)
            const fileUrl = URL.createObjectURL(file)
            setError('')
        } else {
            setFileName('')
            setError('Select a valid PDF file')
        }
    }

    const handleUpload = () => {
        document.getElementById('fileInput').disabled = true
    }

    return (
        <>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragEnter}
                onDrop={handleDrop}
                className={`bg-slate-50 flex flex-col items-center justify-center h-40 w-96 border-2 border-gray-400 border-dashed rounded-sm
                        ${dragging ? 'bg-indigo-100 border-indigo-400' : ''}`}>
                <img src={PdfIcon} alt="pdf-icon" className='h-8 w-8' />
                <input type="file" accept=".pdf" className="hidden pointer-events-none" id='fileInput' onChange={handleFileChange} />
                <p className="mt-2 text-xs font-medium text-gray-400">Drag and Drop or
                    <label htmlFor="fileInput" className="text-blue-600 hover:text-blue-400"> Choose File </label>
                    to upload
                </p>
                <p className="mt-2 text-xs font-medium w-44 truncate text-center">
                    {error && <span className='text-red-500'>{error}</span>}
                    {fileName && <span className='text-indigo-500'>Selected {fileName}</span>}
                </p>
            </div>
            <div className={`${fileName === '' ? 'hidden' : ''}`}>
                <FileDisplay fileName={fileName} uploadStatus={uploadStatus} handleUpload={handleUpload}/>
            </div>
        </>
    );
}