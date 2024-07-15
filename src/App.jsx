import { useState } from 'react'
import './App.css'
import ImageUploader from './components/imageUploader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageUploader/>
    </>
  )
}

export default App
