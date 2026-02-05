import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {useState} from 'react'

import RetrieveExercises from './pages/RetrievePage.jsx'
import CreateExercise from './pages/CreatePage.jsx'
import UpdateExercise from './pages/UpdatePage.jsx'
import './App.css'
import { Link } from 'react-router-dom'


function App() {
  const [exerciseToUpdate, setExerciseToUpdate] = useState({});

  return (
    <Router>
      <header>
        <h1>Exercise Tracker</h1>
        <p>keeps track of your exercise routines and progress.</p>
      </header>
      <nav>
        <Link to="/Retrieve">Retrieve Exercises </Link>
        <Link to="/Create">Create Exercises </Link>
        <Link to="/Update">Update Exercises </Link>
        </nav>
        <main>
          <Routes>

            <Route path="/Retrieve" element={<RetrieveExercises setExerciseToUpdate={setExerciseToUpdate} />} />
            <Route path="/Create" element={<CreateExercise />} />
            <Route path="/Update" element={<UpdateExercise exerciseToUpdate={exerciseToUpdate} setExerciseToUpdate={setExerciseToUpdate} />} />
          </Routes>
        </main>
      <footer>
        <p>
          &copy; 2026 Karen Chan. All rights reserved.
        </p>
      </footer>
    </Router>
  )
}

export default App;