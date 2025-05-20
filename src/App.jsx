import './App.css'
import Strings from './components/Strings.jsx'
import Home from './components/Home.jsx'
import Workshop from './components/Workshop.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/strings' element={<Strings />} />
        <Route path='/workshop' element={<Workshop />} />
      </Routes>
    </Router>
  )
}

export default App
