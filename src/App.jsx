import { Route, Routes } from 'react-router-dom'
import './App.css'
import DefaultPage from './pages/DefaultPage'
import { app, db } from './firebase/firebase.config'
import StudentsPage from './pages/StudentsPage'

function App() {

  return (
    <Routes>
      <Route path='/' element={<DefaultPage />} />
      <Route path='/students/details' element={<StudentsPage/>}/>
    </Routes>
  )
}

export default App
