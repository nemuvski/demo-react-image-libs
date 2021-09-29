import React, { useMemo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ReactCrop, { Crop } from 'react-image-crop'

const initialCrop: Crop = {
  unit: '%',
  width: 50,
  height: 50,
  x: 25,
  y: 25,
  aspect: 1,
}

const ImageDragDropPage = () => {
  // 選択中のファイル
  const [selectedFile, setSelectedFile] = useState<File | undefined>()
  // react-dropzoneの設定等
  const { isDragAccept, isDragReject, getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 2,
    accept: 'image/jpeg,image/png',
    onDrop: (acceptedFiles: Array<File>) => setSelectedFile(acceptedFiles.pop()),
  })
  // cropの内容
  const [crop, setCrop] = useState<Partial<Crop>>(initialCrop)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  /**
   * ReactCropのonCompleteイベント
   *
   * @param c
   */
  const handleCropComplete = (c: Crop) => {
    if (imageRef.current && c.width && c.height && canvasRef.current) {
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height
      canvasRef.current.width = c.width
      canvasRef.current.height = c.height
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.imageSmoothingQuality = 'medium'
        ctx.imageSmoothingEnabled = true
        ctx.drawImage(
          imageRef.current,
          c.x * scaleX,
          c.y * scaleY,
          c.width * scaleX,
          c.height * scaleY,
          0,
          0,
          c.width,
          c.height
        )
      }
    }
  }

  const areaStyle = useMemo(
    () => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      maxWidth: 400,
      height: 50,
      padding: '20px',
      margin: '0 auto',
      cursor: 'pointer',
      borderRadius: 3,
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: '#eee',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      ...(isDragAccept ? { borderColor: '#00e676' } : {}),
      ...(isDragReject ? { borderColor: '#ff1744' } : {}),
    }),
    [isDragAccept, isDragReject]
  )

  return (
    <div>
      <div {...getRootProps({ style: areaStyle })}>
        <input {...getInputProps()} />
        <span>{"Drag 'n' drop a file here, or click to select a file"}</span>
      </div>

      <div>
        <button
          type='button'
          onClick={() => {
            setSelectedFile(undefined)
            setCrop(initialCrop)
          }}
        >
          Reset
        </button>
      </div>

      {selectedFile && (
        <>
          <div style={{ marginTop: 16 }}>
            <ReactCrop
              ruleOfThirds
              circularCrop
              crop={crop}
              onImageLoaded={(img) => {
                imageRef.current = img
              }}
              onChange={(c) => setCrop(c)}
              onComplete={handleCropComplete}
              src={URL.createObjectURL(selectedFile)}
            />
          </div>
          <div style={{ marginTop: 16 }}>
            <canvas ref={canvasRef} />
          </div>
        </>
      )}
    </div>
  )
}

export default ImageDragDropPage
