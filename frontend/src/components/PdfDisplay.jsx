import { useEffect, useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf'
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

export default function PdfDisplay({ fileName, fileUrl }) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleRefresh = () => {
          return navigate("/upload")
        };
    
        // Listen for the beforeunload event to detect page refresh
        window.addEventListener('beforeunload', handleRefresh);
    
        // Cleanup the event listener when the component unmounts
        return () => {
          window.removeEventListener('beforeunload', handleRefresh);
        };
      }, [navigate]);

    const handleLoading = () => {
        return (
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
                <div className="w-35 h-35 rounded-full bg-black p-1">
                    <svg className="stroke-white animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" />
                    </svg>
                </div>
            </div>
        )
    }

    return (
        <div className="m-3 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-md border-2 border-gray-200 overflow-hidden">
                <Document file={fileUrl} loading={handleLoading}>
                    <Page pageNumber={1} height={100} scale={2} />
                </Document>
            </div>
            <p className="font-medium text-sm text-center text-gray-400 w-60 truncate" title={fileName}>Uploaded {fileName}</p>
        </div>
    );
}