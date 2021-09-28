import React, { useState } from 'react'
import ReactImageUploading, { ImageListType } from 'react-images-uploading'

/**
 * 許容するファイル数
 */
const MAX_NUM_IMAGES = 3
/**
 * 最大のファイルサイズ (バイト)
 */
const MAX_FILE_SIZE = 1024 * 1024 * 2
/**
 * 許容するフォーマットの識別子群
 */
const ACCEPT_FORMAT_TYPES = ['gif', 'jpg', 'jpeg', 'png']
/**
 * データが格納されているキー
 */
const IMAGE_DATA_URL_KEY = 'data_url'

const ImageUploaderPage = () => {
  const [images, setImages] = useState<ImageListType>([])

  return (
    <ReactImageUploading
      multiple={MAX_NUM_IMAGES > 1}
      maxNumber={MAX_NUM_IMAGES}
      maxFileSize={MAX_FILE_SIZE}
      acceptType={ACCEPT_FORMAT_TYPES}
      dataURLKey={IMAGE_DATA_URL_KEY}
      value={images}
      onChange={(imageList) => {
        console.debug(imageList)
        setImages(imageList)
      }}
    >
      {({ imageList, isDragging, dragProps, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove }) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              style={{
                width: 200,
                height: 80,
                marginRight: 16,
                color: isDragging ? 'red' : 'unset',
              }}
              type='button'
              onClick={onImageUpload}
              {...dragProps}
            >
              Upload Image
            </button>
            <button
              style={{
                width: 200,
                height: 80,
              }}
              type='button'
              onClick={onImageRemoveAll}
            >
              Remove All Images
            </button>
          </div>

          {imageList.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 16,
              }}
            >
              {imageList.map((image, index) => (
                <div key={index}>
                  <img
                    src={image[IMAGE_DATA_URL_KEY]}
                    alt=''
                    style={{ width: 220, height: 'auto', verticalAlign: 'middle' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: 8 }}>
                    <button type='button' style={{ width: 80, height: 30 }} onClick={() => onImageUpdate(index)}>
                      Update
                    </button>
                    <button type='button' style={{ width: 80, height: 30 }} onClick={() => onImageRemove(index)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </ReactImageUploading>
  )
}

export default ImageUploaderPage
