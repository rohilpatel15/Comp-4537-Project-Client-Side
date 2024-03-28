import Login from './pages/Login'
import Admin from './pages/Admin'
import User from './pages/User'
import SignUp from './pages/SignUp'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route index element = {<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<User />} /> 
        <Route path="/signup" element={<SignUp />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App