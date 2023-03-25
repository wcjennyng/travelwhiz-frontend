import React, { useState, useContext, useCallback } from 'react'
import { Map, Marker, Popup } from "react-map-gl"
import UserContext from '../auth/UserContext'

// import 'mapbox-gl/dist/mapbox-gl.css'
import SignupForm from '../auth/SignupForm';
import LoginForm from '../auth/LoginForm';
import CircleIcon from '@mui/icons-material/Circle';
import RoomIcon from '@mui/icons-material/Room';
import ControlPanel from '../general/ControlPanel';
import HomepageCarousel from './Carousel'

import './Homepage.css'

//Homepage of website
//If not logged in/new user, displays login/register buttons
//If logged in, user welcome page
//Routed at /

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2NqZW5ueW5nIiwiYSI6ImNsMDQ4YjI2eTE3dGczam9kdmo5cTZoYzMifQ.0OarcZH_ocP258XKrZ2Xvg'

const Homepage = ({ signup, login }) => {
    const { currentUser } = useContext(UserContext)

    const [viewState, setViewState] = useState({
        latitude: 40.78,
        longitude: -73.96,
        zoom: 12.5
    })

    const [showSignup, setShowSignup] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [showPopup1, setShowPopup1] = useState(false)
    const [showPopup2, setShowPopup2] = useState(false)

    function handleShowLogin() {
        setShowPopup1(false)
        setShowPopup2(false)
        setShowSignup(false)
        setShowLogin(true)
    }

    function handleShowSignup() {
        setShowPopup1(false)
        setShowPopup2(false)
        setShowLogin(false)
        setShowSignup(true)
    }



    return (
        <div >
            <div className='container' style={{ marginTop: '50px' }}>

                {currentUser ? (
                    <>
                        <div className="Homepage">
                            <HomepageCarousel />

                        </div>
                        
                    </>)
                    :
                    (<div className="map-background">
                        <Map


                            {...viewState}
                            mapboxAccessToken={MAPBOX_TOKEN}
                            width='100%'
                            height='100%'
                            onMove={viewState => setViewState(viewState)}
                            mapStyle="mapbox://styles/mapbox/streets-v9"

                        >

                            <Marker
                                longitude={-73.9632}
                                latitude={40.7794}
                                color="red"
                                onClick={e => { e.originalEvent.stopPropagation(); setShowPopup2(false); setShowPopup1(true) }}
                            >
                                <RoomIcon
                                    style={{
                                        fontSize: `${4 * viewState.zoom}`,
                                        color: "tomato",
                                        cursor: "pointer"
                                    }}
                                />
                            </Marker>


                            {showPopup1 && (<Popup longitude={-73.9632} latitude={40.7794} anchor="left"
                                onClose={() => setShowPopup1(false)}>
                                <div className="popup">
                                    <label>Location</label>
                                    <h4 className="location">The MET</h4>
                                    <label>Review</label>
                                    <h4 className="review">Art Museum. Great afternoon walk indoors.</h4>
                                    <label>Activity Level</label>
                                    <h4 className="level">
                                        {['1'].fill(<CircleIcon className="circle" key="circle" />)}
                                    </h4>
                                    <hr />
                                    <span className="username">
                                        Created by <b>Jenny</b><br />
                                    </span>
                                    <span className="date" style={{ color: "gray", marginBottom: '4px' }}>12-25-2022 12:00:00</span>
                                </div>
                            </Popup>)}

                            <Marker
                                longitude={-73.9855}
                                latitude={40.7580}
                                color="purple"
                                onClick={e => { e.originalEvent.stopPropagation(); setShowPopup1(false); setShowPopup2(true) }}
                            >
                                <RoomIcon
                                    style={{
                                        fontSize: `${4 * viewState.zoom}`,
                                        color: "purple",
                                        cursor: "pointer"
                                    }}
                                />
                            </Marker>


                            {showPopup2 && (<Popup longitude={-73.9855} latitude={40.7580} anchor="left"
                                onClose={() => setShowPopup2(false)}>
                                <div className="popup">
                                    <label>Location</label>
                                    <h4 className="location">Times Square</h4>
                                    <label>Review</label>
                                    <h4 className="review">City never sleeps. Shopping and broadway shows.</h4>
                                    <label>Activity Level</label>
                                    <h4 className="level">
                                        {['2'].fill(<CircleIcon className="circle" key="circle" />)}
                                    </h4>
                                    <hr />
                                    <span className="username">
                                        Created by <b>Paul</b><br />
                                    </span>
                                    <span className="date" style={{ color: "gray", marginBottom: '4px' }}>02-08-2022 9:59:27</span>
                                </div>
                            </Popup>)}


                            <div className="buttons">
                                <button className="login-btn" onClick={handleShowLogin}>
                                    Log In
                                </button>
                                <button className="signup-btn" onClick={handleShowSignup}>
                                    Sign Up
                                </button>

                            </div>

                            <div className="form-popup">
                                {showSignup ? <SignupForm signup={signup} setShowSignup={setShowSignup} /> : null}
                                {showLogin ? <LoginForm login={login} setShowLogin={setShowLogin} /> : null}
                            </div>



                            <div className="panel-display"><ControlPanel /></div>


                        </Map>

                    </div>)
                }
            </div>
        </div>
    )
}

export default Homepage