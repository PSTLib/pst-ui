import React from 'react'
import { Loader2, Download, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProcessingStatus({ isProcessing, downloadUrl, error }) {
  return (
    <div className="text-center">
      {isProcessing && (
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
          <p className="mt-4 text-lg font-medium text-gray-600">Processing your PST file...</p>
          <p className="mt-2 text-sm text-gray-500">This may take a few minutes depending on the file size.</p>
        </div>
      )}
      {downloadUrl && (
        <div className="flex flex-col items-center">
          <Download className="h-12 w-12 text-green-500" />
          <p className="mt-4 text-lg font-medium text-gray-600">Your file is ready!</p>
          <p className="mt-2 text-sm text-gray-500">Click the button below to download your processed file.</p>
          <Button
            asChild
            className="mt-6"
          >
            <a href={downloadUrl} download="processed_pst.zip">
              Download ZIP
            </a>
          </Button>
        </div>
      )}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

