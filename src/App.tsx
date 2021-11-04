import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import FrontPage from './pages/Front.page'
import ImageUploaderPage from './pages/ImageUploader.page'
import ImageCropperPage from './pages/ImageCropper.page'
import ImageDragDropPage from './pages/ImageDragDrop.page'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<FrontPage />} />
          <Route path='/image-uploader' element={<ImageUploaderPage />} />
          <Route path='/image-cropper' element={<ImageCropperPage />} />
          <Route path='/image-drag-drop' element={<ImageDragDropPage />} />
          <Route path='*' element={<p>Page not found</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
