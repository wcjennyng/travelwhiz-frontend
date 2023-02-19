import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../auth/UserContext'

//This will check if a current user is logged in
//If no current user logged in, redirect to login form.
//This replaces <Route...> in Routes.js 

const Access = () => {
    const { currentUser } = useContext(UserContext)

    if(!currentUser) {
        return <Navigate to='/' />
    }

    return (
        <Outlet />
    )
}

export default Access;