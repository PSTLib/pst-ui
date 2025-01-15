import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import FileUpload from './components/FileUpload'
import ProcessingStatus from './components/ProcessingStatus'

export default function App() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState(null)
  const [error, setError] = useState(null)

  const handleFileUpload = async (file) => {
    setIsProcessing(true)
    setDownloadUrl(null)
    setError(null) // added to clear previous errors

    const formData = new FormData()
    formData.append('pstFile', file)

    try {
      const response = await fetch('https://pst-api.onrender.com/upload-pst', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      setDownloadUrl(url)
    } catch (error) {
      console.error('Error details:', error)
      setError(`An error occurred while processing the file: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">PST File Processor</h1>
          {!isProcessing && !downloadUrl && !error && (
            <FileUpload onFileUpload={handleFileUpload} />
          )}
          {(isProcessing || downloadUrl || error) && (
            <ProcessingStatus isProcessing={isProcessing} downloadUrl={downloadUrl} error={error} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}

