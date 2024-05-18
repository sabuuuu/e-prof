import React from 'react'
import { Routes , Route , Navigate} from 'react-router-dom'
import  useAuthContext  from './hooks/useAuthContext'

import Home from './screens/Home'
import AjouterDisp from './screens/AjouterDisp'
import Login from './screens/Login'
function App() {
  const {user} = useAuthContext();
  return (
    <Routes>
      <Route path='/' element={user ? <Home /> : <Navigate to='/login' />} />
      <Route path='/ajouter-disp' element={user ? <AjouterDisp /> : <Navigate to='/login' />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
    </Routes>
  )
}

export default App
