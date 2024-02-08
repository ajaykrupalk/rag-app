import SamplePdf from "../assets/free-sample-pdf-to-download.jpg"
export default function PdfDisplay(){
    return (
        <div className="m-3 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-200 rounded-md border-2 border-gray-200 overflow-hidden">
                <img className="h-40" src={SamplePdf} alt="" />
            </div>
            <p className="font-medium text-sm text-center text-gray-400">Uploaded sample.pdf</p>
        </div>
    );
}