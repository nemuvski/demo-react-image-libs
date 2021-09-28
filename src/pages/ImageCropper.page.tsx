import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'

const ImageCropperPage = () => {
  const fileReader = useRef(new FileReader())
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [crop, setCrop] = useState<Partial<Crop>>({
    unit: 'px',
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    aspect: 1,
  })
  const imageRef = useRef<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    fileReader.current.addEventListener('loadstart', () => {
      setIsLoading(true)
    })
    fileReader.current.addEventListener('loadend', () => {
      setIsLoading(false)
    })
    fileReader.current.addEventListener('load', () => {
      setSelectedFile(fileReader.current.result)
    })
  }, [fileReader])

  /**
   * ファイルを読み込む際のハンドラ
   *
   * @param event
   */
  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files || !files.length) return
    // 1つのみを許可しているため、1つ目の要素をセットする
    const file = files.item(0)
    if (!file) return
    fileReader.current.readAsDataURL(file)
  }

  const handleCropComplete = (c: Crop) => {
    if (imageRef.current && c.width && c.height && canvasRef.current) {
      const scaleX = imageRef.current.naturalWidth / imageRef.current.width
      const scaleY = imageRef.current.naturalHeight / imageRef.current.height
      canvasRef.current.width = c.width
      canvasRef.current.height = c.height
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.imageSmoothingQuality = 'high'
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

  return (
    <div>
      {isLoading && <p>Now loading ...</p>}

      <div>
        <label htmlFor='input-image-file'>Image file</label>
        <input
          id='input-image-file'
          multiple={false}
          type='file'
          accept='image/png,image/jpeg'
          onChange={handleSelectFile}
          disabled={isLoading}
        />
      </div>

      {selectedFile && (
        <>
          <div style={{ marginTop: 16 }}>
            <ReactCrop
              ruleOfThirds
              circularCrop
              crop={crop}
              onImageLoaded={(image) => {
                imageRef.current = image
              }}
              onChange={(c) => {
                setCrop(c)
              }}
              onComplete={handleCropComplete}
              src={selectedFile as string}
              minWidth={100}
              minHeight={100}
              maxWidth={300}
              maxHeight={300}
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

export default ImageCropperPage
