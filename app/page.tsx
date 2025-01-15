'use client'

import { useState } from 'react'
import FileUpload from './components/FileUpload'
import ProcessingStatus from './components/ProcessingStatus'

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true)
    setDownloadUrl(null)

    const formData = new FormData()
    formData.append('pstFile', file)

    try {
      const response = await fetch('https://pst-api.onrender.com/upload-pst', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        setDownloadUrl(url)
      } else {
        throw new Error('File processing failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while processing the file.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">PST File Processor</h1>
        {!isProcessing && !downloadUrl && (
          <FileUpload onFileUpload={handleFileUpload} />
        )}
        {(isProcessing || downloadUrl) && (
          <ProcessingStatus isProcessing={isProcessing} downloadUrl={downloadUrl} />
        )}
      </div>
    </main>
  )
}

