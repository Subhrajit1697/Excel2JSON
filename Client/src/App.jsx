import { useState } from 'react'
import './App.css'
import axios from 'axios'
function App() {
  const [file, setFile] = useState(null)
  const [jsonResult, setJsonResult] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFile(file)

  }

  const uploadHandler = async () => {
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await axios.post('https://project1backend.dev-subhrajit.online/upload', formData)
      console.log(res.data)
      setJsonResult(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <h2>Excel/CSV to JSON converter</h2>

      <input type="file" onChange={handleFileChange} name="" id="" />
      <button onClick={uploadHandler} >Upload</button>

      <div style={{display:'flex', justifyContent:'flex-start', border:'2px solid red', textAlign:'left'}} >
        {jsonResult && <pre>{JSON.stringify(jsonResult, null, 1)}</pre>}

      </div>

    </>
  )
}

export default App
