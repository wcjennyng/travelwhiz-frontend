import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Homepage from '../homepage/Homepage'
import ProfileForm from '../auth/ProfileForm'
import Map from '../map/Map'
import Saved from '../saved/Saved'
import Access from './Access'
import PageNotFound from './PageNotFound'

//website routes
//If page not found, redirects to homepage

function WebsiteRoutes({ login, signup }) {
    return (
        <div>
            <Routes>
                <Route exact path='/map' element={<Access />} >
                    <Route exact path='/map' element={<Map />} />
                </Route>
                <Route exact path='/saved' element={<Access />} >
                    <Route exact path='/saved' element={<Saved />} />
                </Route>
                <Route exact path='/profile' element={<Access />} >
                    <Route exact path='/profile' element={<ProfileForm />} />
                </Route>
                <Route path="/" element={<Homepage login={login} signup={signup} />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default WebsiteRoutes;