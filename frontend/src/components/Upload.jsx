import { useState } from 'react';
import PdfIcon from '../assets/pdf-svgrepo-com.svg'
import FileDisplay from './FileDisplay';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

export default function Upload() {
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState("");
    const [fileUrl, setFileUrl] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(false);
    const [fileObj, setFileObj] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [cookies, setCookies] = useCookies(['token', 'fileUrl']);

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
        console.log("file",e.target.files[0])
        e.preventDefault();
        setFileName('')
        setUploadStatus(false)
        setFileName(e.target.files[0].name)
        handleFile(e.target.files[0])
    }

    const handleFile = async (file) => {
        if (file.type.startsWith('application/pdf')) {
            setFileObj(file)
            setFileUrl(URL.createObjectURL(file))
            setCookies("fileUrl", URL.createObjectURL(file))
            setTimeout(() => {
                setUploadStatus(true);
            }, 5000)
            setError('')
        } else {
            setFileName('')
            setFileUrl(null)
            setError('Select a valid PDF file')
        }
    }

    const handleUpload = () => {
        document.getElementById('fileInput').disabled = true;
        navigate("/chat", { state: { fileName: fileName, fileUrl: fileUrl, fileObj: fileObj } })
    }

    return (
        <>
            <div
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragEnter}
                onDrop={handleDrop}
                className={`bg-slate-50 flex flex-col items-center justify-center h-40 w-96 border-2 border-gray-400 border-dashed rounded-sm
                        ${dragging ? 'bg-indigo-200/75 border-indigo-400' : ''}`}>
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
                <FileDisplay fileName={fileName} uploadStatus={uploadStatus} handleUpload={handleUpload} />
            </div>
        </>
    );
}