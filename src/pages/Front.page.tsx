import React from 'react'
import { Link } from 'react-router-dom'

const FrontPage = () => {
  return (
    <ul>
      <li>
        <Link to='/image-uploader'>Image Uploader</Link>
      </li>
      <li>
        <Link to='/image-cropper'>Image Cropper</Link>
      </li>
      <li>
        <Link to='/image-drag-drop'>Image Drag and Drop</Link>
      </li>
    </ul>
  )
}

export default FrontPage
