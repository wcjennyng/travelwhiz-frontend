import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import NavBar from './routes/Nav'
import useLS from './hooks/useLS'
import WebsiteRoutes from './routes/WebsiteRoutes'
import LoadingSpinner from './general/LoadingSpinner'
import TravelWhizApi from './Api'
import UserContext from './auth/UserContext'
import { decodeToken } from 'react-jwt'

import 'mapbox-gl/dist/mapbox-gl.css'
import AlertTemplate from 'react-alert-template-basic'
import { positions, Provider } from 'react-alert'


//storing token in localStorage for logging in
export const TOKEN_STORAGE = "travelwhiz-token"

//performance for alerts
const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT
}

function App() {

  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [token, setToken] = useLS(TOKEN_STORAGE)
  const [favIds, setFavIds] = useState(new Set([]))
  const [favs, setFavs] = useState([])

  //handles current user 
  useEffect(function loadUser() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token)
          TravelWhizApi.token = token
          let currentUser = await TravelWhizApi.getCurrentUser(username)
          setCurrentUser(currentUser)
          if (currentUser) {
            userFavPinsIds(currentUser.username)
          }
        } catch (e) {
          setCurrentUser(null)
        }
      }
      setIsLoading(true)
    }
    //resets IsLoading back to false to control spinner while async runs
    setIsLoading(false)
    getCurrentUser()
  }, [token])


/* User Favorites - list and displays filled/unfilled heart accordingly */

  //get a list of user favorites 
  useEffect(() => {
    async function getFavList(username) {
      try {
        setFavs(await TravelWhizApi.userFavs(username))
      } catch (e) {
        console.error("list of favorites failed", e)
        return { success: false, e }
      }
    }
    if (currentUser) {
      getFavList(currentUser.username)
    }
  }, [favIds])

  //updates set of favorite pin id to fill in heart (liked) or unfill (unlike)
  async function userFavPinsIds(username) {
    let favs = await TravelWhizApi.userFavs(username)
    let updateFavs = []
    for (let set of favs.favorites) {
      updateFavs.push(set.id)
    }
    setFavIds(new Set(updateFavs))
  }

  /* Login/Logout handling */

  //handles logout
  const logout = () => {
    setCurrentUser(null)
    setToken(null)
  }

  //handles signup - automatically logs them in wih set token upon signup
  async function signup(signupData) {
    try {
      let token = await TravelWhizApi.signup(signupData)
      setToken(token)
      return { success: true }
    } catch (e) {
      console.error('Signup failed', e)
      return { success: false, e }
    }
  }

  //handles login
  async function login(loginData) {
    try {
      let token = await TravelWhizApi.login(loginData)
      setToken(token)
      return { success: true }
    } catch (e) {
      console.error("Log in failed", e)
      return { success: false, e }
    }
  }


/* User Favorites - handles favoriting/unfavoriting */

  //check if pin is favorited
  const favedPin = (id) => {
    return favIds.has(id)
  }

  //favorite a pin - make API call and update set of pin ids
  async function favPin(id) {
    try {
      await TravelWhizApi.fav(currentUser.username, id)
    } catch (e) {
      console.error(e)
    }
  }

  //unfavorite a pin
  async function unFavPin(id) {
    try {
      await TravelWhizApi.unfav(currentUser.username, id)
    } catch (e) {
      console.error(e)
    }
  }

  //handles if pin is already favorited
  const handleFav = (id) => {
    if (favIds.has(id)) {
      //removes from api
      unFavPin(id)
      //remove from set of fav pin ids
      setFavIds(new Set(Array.from(favIds).filter(f => f !== id)))
    } else {
      favPin(id)
      setFavIds(new Set([...favIds, id]))
    }
  }


  //if loading, display spinner on screen
  if (!isLoading) return <LoadingSpinner />

  return (
    <BrowserRouter>
      <Provider template={AlertTemplate} {...options}>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            favPin,
            favedPin,
            unFavPin,
            favIds,
            setFavIds,
            handleFav,
            favs,
            setFavs
          }}>

          <div>
            <NavBar logout={logout} />
            <WebsiteRoutes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </Provider>
    </BrowserRouter>


  )

}

export default App;
