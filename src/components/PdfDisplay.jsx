import { useState } from "react";
import SamplePdf from "../assets/free-sample-pdf-to-download.jpg";
import TestPdf from "../assets/10840-001.pdf";
import { pdfjs, Document, Page, Thumbnail } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

export default function PdfDisplay() {
    const [numPages, setNumPages] = useState();

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className="m-3 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-md border-2 border-gray-200 overflow-hidden">
                <Document file={TestPdf} onLoadSuccess={onDocumentLoadSuccess} >
                    <Page pageNumber={1} height={100} scale={2}/>
                </Document>
            </div>
            <p className="font-medium text-sm text-center text-gray-400">Uploaded sample.pdf</p>
        </div>
    );
}