import { Loader2, Download } from 'lucide-react'

interface ProcessingStatusProps {
  isProcessing: boolean
  downloadUrl: string | null
}

export default function ProcessingStatus({ isProcessing, downloadUrl }: ProcessingStatusProps) {
  return (
    <div className="text-center">
      {isProcessing && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
          <p className="mt-2 text-gray-600">Processing your PST file...</p>
        </div>
      )}
      {downloadUrl && (
        <div className="flex flex-col items-center">
          <Download className="h-8 w-8 text-green-500" />
          <p className="mt-2 text-gray-600">Your file is ready!</p>
          <a
            href={downloadUrl}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Download ZIP
          </a>
        </div>
      )}
    </div>
  )
}

