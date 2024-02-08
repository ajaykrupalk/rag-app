import PdfIcon from '../assets/pdf-svgrepo-com.svg'

export default function Upload() {
    return (
        <div className="flex flex-col items-center justify-center h-40 w-96 border-2 border-gray-400 border-dashed rounded-sm">
            <img src={PdfIcon} alt="pdf-icon" className='h-8 w-8' />
            <input type="file" accept=".pdf" className="hidden" id='fileInput'/>
            <p className="mt-2 text-xs font-medium text-gray-400">Drag and Drop or
                <label htmlFor="fileInput" className="text-blue-600 hover:text-blue-400"> Choose File </label>
                to upload
            </p>
        </div>
    );
}