import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Layout from './components/Layout'
import FrontPage from './pages/Front.page'
import ImageUploaderPage from './pages/ImageUploader.page'
import ImageCropperPage from './pages/ImageCropper.page'
import ImageDragDropPage from './pages/ImageDragDrop.page'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path='/' component={FrontPage} />
          <Route exact path='/image-uploader' component={ImageUploaderPage} />
          <Route exact path='/image-cropper' component={ImageCropperPage} />
          <Route exact path='/image-drag-drop' component={ImageDragDropPage} />
          <Route render={() => <p>Page not found</p>} />
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
