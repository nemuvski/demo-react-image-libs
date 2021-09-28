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
    </ul>
  )
}

export default FrontPage
