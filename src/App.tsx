import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import TaskDetail from './pages/TaskDetail'
import PageNotFound from './pages/PageNotFound'

/**
 * Main application component that sets up the routing for the Kanban board app.
 * This component defines the routes for different pages in the application.
 */
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task/:taskId" element={<TaskDetail />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App
