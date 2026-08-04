import { getData } from '@/context/userContext'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {navigate} = useNavigate();
  const {user} = getData();
    return (
    <div>
        {
            user ? children:< navigate to={'/login'}/>
        }
    </div>
  )
}

export default ProtectedRoute
