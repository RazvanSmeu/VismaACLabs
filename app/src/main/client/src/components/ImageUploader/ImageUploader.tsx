import React from 'react'
import { useDropzone } from 'react-dropzone'

export function ImageUploader() {
  const { acceptedFiles, isDragAccept, getRootProps, getInputProps } = useDropzone({
    multiple: false
  })

  return (
    <section className='container'>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {!isDragAccept ? (
          <p>Drag n drop some files here, or click to select files</p>
        ) : (
          acceptedFiles.length
        )}
      </div>
    </section>
  )
}
