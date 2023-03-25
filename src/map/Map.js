import React, { useState, useContext, useEffect, useRef } from 'react'
import { Map, Marker, Popup } from "react-map-gl"
import UserContext from '../auth/UserContext'
import Searchbox from '../search/searchBox';
import SearchSelectMove from '../search/searchSelectMove';
import Checkbox from '../search/checkBox';
import EditPinForm from '../pins/EditPinForm';
import axios from 'axios';
import TravelWhizApi from '../Api'
import useToggle from '../hooks/useToggleState';
import moment from 'moment';
import useOutClick from '../hooks/outClick';
import PopupAlert from '../general/PopupAlert';
import { useAlert } from 'react-alert';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faLocationPin } from '@fortawesome/free-solid-svg-icons'
import {
    Room,
    Circle,
    AddLocation,
    DeleteOutline,
    ArrowCircleLeft,
    ArrowCircleRight,
    ModeEdit,
    FavoriteBorder,
    Favorite,
    HelpOutline
} from '@mui/icons-material';
import { MDBModal } from 'mdb-react-ui-kit';
import './Map.css'
import { Tooltip } from '@mui/material';

//Map page of website
//logged in user can add, delete and edit pins
//logged in user can favorite other users' pins
//Routed at /map

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2NqZW5ueW5nIiwiYSI6ImNsMDQ4YjI2eTE3dGczam9kdmo5cTZoYzMifQ.0OarcZH_ocP258XKrZ2Xvg'

const MapSearch = () => {
    const { currentUser, setCurrentUser, favIds, handleFav } = useContext(UserContext)
    const [pinLocationId, setPinLocationId] = useState(null)
    const [newLocation, setNewLocation] = useState(null)
    const [circle, setCircle] = useState('1')
    const [pins, setPins] = useState([])
    const [review, setReview] = useState(null)
    const [title, setTitle] = useState(null)
    const [currDate, setCurrDate] = useState('just now')
    const [toggleSidebar, setToggleSidebar] = useToggle(true)
    const [filteredPins, setFilteredPins] = useState([])
    const [pref, setPref] = useState([])
    const [update, setUpdate] = useState(null)
    const [showPop, setShowPop] = useState(false)

    const alert = useAlert()

    
    const [viewState, setViewState] = useState({
        //default view when routed to page
        latitude: 40.7306,
        longitude: -73.9866,
        zoom: 12.5
    })

    //handles outside click of popup - closes popup
    const ref = useRef();
    const editButtonRef = useRef();
    const popupRef = useRef();

    useOutClick(ref, (target) => {
        //Check if edit button is clicked, if target element is edit button, do not close modal
        const isEditClicked = target && editButtonRef.current && editButtonRef.current.contains(target);

        if (showPop && !isEditClicked) {
            setShowPop(false)
        }

    })

    //when pin is clicked, pop up is displayed
    const handlePinClick = (id, lat, long) => {
        setPinLocationId(id)
        setViewState({ ...viewState, latitude: lat, longitude: long })
    }


    //when user clicks on map, pop up form displays
    const handleAddClick = (e) => {
        setNewLocation({
            lat: e.lngLat.lat,
            long: e.lngLat.lng
        })

    }

    //format date as pin is added or updated
    useEffect(() => {
        setCurrDate(moment().format("MM-DD-YYYY hh:mm:ss"))
    }, [])

    //handles form submit for a new pin
    //calls post function prop 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newPin = {
            username: currentUser.username,
            title,
            review,
            rating: circle,
            lat: newLocation.lat,
            long: newLocation.long,
            date: currDate
        }

        try {

            //const res = await axios.post(`${BASE_URL}/pins`, newPin)
            const added = await TravelWhizApi.addPin(newPin)
            setFilteredPins([...filteredPins, added])
            setNewLocation(null)
            alert.success('Added!')
        } catch (err) {
            console.log(err)
        }

        //resets pins on map upon submit
        let user = await TravelWhizApi.getCurrentUser(currentUser.username);
        setCurrentUser(user);
    }


    //when routed to map page, diplays current pins 
    //pins can be filtered based on activity
    useEffect(() => {
        const getPins = async () => {
            try {
                //const allPins = await axios.get("/pins");
                const allPinsRes = await TravelWhizApi.allPins()
                console.log(allPinsRes)
                if (pref.length === 0) {
                    setFilteredPins(allPinsRes)
                } else {
                    setFilteredPins(allPinsRes.filter(pin =>
                        pref.some(val => [pin.rating].flat().includes(val))))

                }

            } catch (err) {
                console.log(err);
            }
        };
        getPins();
    }, [pref])

    //handles pin deleted
    const handleDeletePin = async (pinLocationId) => {
        try {
            await TravelWhizApi.deletePin(pinLocationId);
            const allPinsRes = await TravelWhizApi.allPins()
            if (pref.length === 0) {
                setFilteredPins(allPinsRes)
            } else {
                setFilteredPins(allPinsRes.filter(pin =>
                    pref.some(val => [pin.rating].flat().includes(val))))

            }
            let user = await TravelWhizApi.getCurrentUser(currentUser.username)
            setCurrentUser(user)
        } catch (err) {
            console.log(err);
        }
    }

    //handles if pin is already favorited
    const handleUnfav = (id) => {
        handleFav(id)
    }

    //handles toggle display of edit form
    const toggleEditForm = () => {
        setShowPop(!showPop)
    }

    //handles fav icon if pin is already favorited
    //displays alert if success
    const handleUnFavIcon = (id) => {
        handleUnfav(id)
        alert.success('Unfavorited!')
    }

    //handles fav icon to favorite pin
    //displays alert if success
    const handleFavIcon = (id) => {
        handleFav(id)
        alert.success('Favorited!')
    }
console.log(filteredPins)

    return (
        <>
            <div className="map-background">

                <Map
                    {...viewState}
                    mapboxAccessToken={MAPBOX_TOKEN}
                    width='60%'
                    height='100%'
                    onMove={e => setViewState(e.viewState)}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    onDblClick={currentUser.username && handleAddClick}

                >
                    <div className='panel'>

                        <div id="left"
                            className={toggleSidebar ? "sidebar flex-center left" : "sidebar flex-center left collapsed"}>
                            <div className="sidebar-content rounded-rect flex-center">
                                <div className="components">
                                    <br />
                                    <br />
                                    <Searchbox />
                                    <hr style={{ width: '80%', font: '2px' }} />
                                    <SearchSelectMove />
                                    <hr style={{ width: '80%', font: '2px' }} />
                                    <Checkbox pins={pins} pref={pref} setPref={setPref} />
                                    <Tooltip title="Want to add a pin? Double Click on the map!" arrow><HelpOutline className="helpIcon" /></Tooltip>
                                </div>
                                <div className="sidebar-toggle rounded-rect left" onClick={setToggleSidebar}>
                                    {toggleSidebar ? <Tooltip title="Collapse" arrow ><ArrowCircleLeft /></Tooltip>
                                        : <Tooltip title="Open" arrow placement="right"><ArrowCircleRight /></Tooltip>}
                                </div>
                            </div>
                        </div>

                    </div>


                    {/* display of pin pop up per user */}
                    {filteredPins?.map((p, index) => (
                        <div key={index} >
                            <Marker
                                latitude={p.lat}
                                longitude={p.long}
                            >
                                {favIds?.has(p.id) ? (
                                    <>
                                        <span className="fa-stack fa-2x">
                                            <FontAwesomeIcon
                                                icon={faLocationPin}
                                                className="fa-stack-2x"
                                                style={{
                                                    fontSize: `${1.5 * viewState.zoom}`,
                                                    color: currentUser.username === p.username ? "tomato" : "purple",
                                                    cursor: "pointer"
                                                }}
                                                onClick={() => handlePinClick(p.id, p.lat, p.long)} />
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                className="fa-stack-1x"
                                                style={{
                                                    fontSize: `${1 * viewState.zoom}`,
                                                    cursor: "pointer",
                                                    color: "lightpink",
                                                    top: "-6px"
                                                }}
                                                onClick={() => handlePinClick(p.id, p.lat, p.long)}
                                            />

                                        </span>
                                    </>) : (
                                    <Room
                                        style={{
                                            fontSize: `${4 * viewState.zoom}`,
                                            color: currentUser.username === p.username ? "tomato" : "purple",
                                            cursor: "pointer"
                                        }}
                                        onClick={() => handlePinClick(p.id, p.lat, p.long)}
                                    />)}
                            </Marker>
                            {p.id === pinLocationId && (
                                <Popup
                                    latitude={p.lat}
                                    longitude={p.long}
                                    closeButton={true}
                                    closeOnClick={false}
                                    closeOnMove={false}
                                    onClose={() => setPinLocationId(null)}
                                    anchor="left"
                                >
                                    <div className="popup">
                                        <label>Location</label>
                                        <h4 className="location">{p.title}</h4>
                                        <label>Review</label>
                                        <h5 className="review">{p.review}</h5>
                                        <label>Activity Level</label>
                                        <h4 className="level">
                                            {Array.from(Array(parseInt(p.rating)),
                                                (_, i) => <Circle key={i}
                                                    className="circle"
                                                    style={{ fontSize: '25px' }} />)}
                                        </h4>
                                        <hr />
                                        <span className="username">
                                            Created by <b>{p.username}</b> <br />
                                            <span className="date" style={{ color: "gray", marginBottom: '4px' }}>{p.date}</span>
                                        </span>


                                    </div>
                                    {currentUser.username === p.username ? (
                                        <>
                                            <PopupAlert
                                                trigger={<Tooltip title="Delete" arrow><DeleteOutline className="deleteIcon" style={{ cursor: "pointer" }} /></Tooltip>}
                                                text={"Are you sure you wish to delete this pin?"}
                                                handle={() => handleDeletePin(p.id) && alert.success('Deleted!')}
                                            />


                                            <Tooltip title="Edit" arrow>
                                                <ModeEdit
                                                    className="editIcon"
                                                    ref={editButtonRef}
                                                    onClick={toggleEditForm}
                                                    style={{ cursor: "pointer", display: "inline-block" }}

                                                /></Tooltip>
                                        </>

                                    ) :
                                        (
                                            <div
                                                style={{ textAlign: 'center' }}>
                                                {favIds?.has(p.id) && currentUser.username ? (
                                                    <Tooltip title="Unfavorite" arrow><Favorite
                                                        style={{ color: "pink", cursor: "pointer" }}
                                                        onClick={() => handleUnFavIcon(p.id)} />
                                                    </Tooltip>)
                                                    : (<Tooltip title="Favorite" arrow><FavoriteBorder
                                                        style={{ color: "pink", cursor: "pointer" }}
                                                        onClick={() => handleFavIcon(p.id)} />
                                                    </Tooltip>
                                                    )}
                                            </div>
                                        )}

                                </Popup>

                            )}

                        </div>
                    ))}

                    {showPop && <MDBModal backdrop={false} tabIndex='-1' show={showPop} setShow={setShowPop}>
                        <EditPinForm
                            className="editForm"
                            filteredPins={filteredPins}
                            pinLocationId={pinLocationId}
                            setUpdate={setUpdate}
                            setShowPop={setShowPop}
                            showPop={showPop}
                            update={update}
                            setFilteredPins={setFilteredPins}
                            pref={pref}
                            currDate={currDate}
                            setCurrDate={setCurrDate} />
                    </MDBModal>}




                    {newLocation && (
                        <>
                            <Marker
                                latitude={newLocation.lat}
                                longitude={newLocation.long}
                            >
                                <AddLocation
                                    style={{
                                        fontSize: `${4 * viewState.zoom}`,
                                        color: "tomato",
                                        cursor: "pointer"
                                    }}
                                />
                            </Marker>
                            <Popup
                                latitude={newLocation.lat}
                                longitude={newLocation.long}
                                closeButton={true}
                                closeOnClick={false}
                                onClose={() => setNewLocation(null)}
                                anchor="left"
                            >
                                <div>
                                    <form onSubmit={handleSubmit}>
                                        <label>Location</label>
                                        <input
                                            placeholder="Enter a location or title"
                                            autoFocus
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        /><br />
                                        <label>Review</label><br />
                                        <textarea
                                            placeholder="Say something about this location."
                                            style={{ width: '175px' }}
                                            onChange={(e) => setReview(e.target.value)}
                                            required
                                        />
                                        <label>Activity Level</label>< br />
                                        <span>(default 1 if not chosen)</span>
                                        <select
                                            onChange={(e) => setCircle(e.target.value)} required
                                        >
                                            <option selected disabled> -- select an option -- </option>
                                            <option value="1">1 (least)</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5 (most)</option>
                                        </select> <br />
                                        <button style={{ marginTop: '3px' }} type="submit" className="btn btn-primary btn-sm submitPinButton">
                                            Add Pin
                                        </button>
                                    </form>
                                </div>
                            </Popup>

                        </>
                    )}


                </Map>


            </div >
        </>

    )


}

export default MapSearch;