import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './public/Layout'
import Home from './public/Home'
import Projects from './public/Projects'
import Admin from './admin/AddProject'
import AddDetails from './admin/AddDetails'
import AdminHome from './admin/AdminHome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path='adminhome' element={<AdminHome/>} />
          <Route path='addproject' element={<Admin/>} />
          <Route path='adddetail' element={<AddDetails/>} />
        </Route>
      </Routes>
    </BrowserRouter> 
  )
}

export default App 