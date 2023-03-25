import React, { useState, useContext, useEffect } from 'react'
import TravelWhizApi from '../Api'
import UserContext from '../auth/UserContext'
import Alert from '../general/Alert'
import { Cancel } from '@material-ui/icons'
import axios from 'axios';
import moment from 'moment';
import './EditPinForm.css'
import {
    MDBModalDialog,
    MDBModalContent,
    MDBModalBody,
  } from 'mdb-react-ui-kit';

//Pin updating form
//Displays pin pop-up form and handles changes to local form state
//On submit, calls API to save data

const EditPinForm = ({ filteredPins,
    pinLocationId,
    setUpdate,
    setShowPop,
    pref,
    setFilteredPins,
    setCurrDate,
    currDate }) => {
    const { currentUser } = useContext(UserContext)


    const [formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false)

    //setting default for form state 
    //auto populates user data per field 
    let pinId = filteredPins.findIndex(i => i.id === pinLocationId)
    const [formData, setFormData] = useState({
        title: filteredPins[pinId].title,
        review: filteredPins[pinId].review,
        rating: filteredPins[pinId].rating,
        username: currentUser.username
    })

    //formats date when pin is updated
    useEffect(() => {
        setCurrDate(moment().format("MM-DD-YYYY hh:mm:ss"))
    }, [])


    //handles edit submit
    //calls patch from api 
    const handleSubmit = async (e) => {
        e.preventDefault()

        let pinData = {
            title: formData.title,
            review: formData.review,
            rating: formData.rating,
            date: currDate
        }

        let editPin
        try {
            editPin = await TravelWhizApi.patchPin(pinLocationId, pinData)
        } catch (err) {
            setFormErrors(err)
            console.log(err)
            return;
        }

        setFormData(data => ({ ...data }))
        setFormErrors([])
        setSaveConfirmed(true)

        const allPinsRes = await TravelWhizApi.allPins()
        if (pref.length === 0) {
            setFilteredPins(allPinsRes)
        } else {
            setFilteredPins(allPinsRes.filter(pin =>
                pref.some(val => [pin.rating].flat().includes(val))))

        }

        setUpdate(editPin)
    }

    //handles data change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(f => ({
            ...f, [name]: value
        }))
        setFormErrors([])
    }

    //fades out alert message after 4 seconds of display 
    useEffect (()=> {
        const timer = setTimeout(()=> {
            setSaveConfirmed(false)
        }, 4000)
        return () => clearTimeout(timer)
    }, [saveConfirmed])

    return (
            <MDBModalDialog centered size="sm">
                <MDBModalContent>
                    <MDBModalBody>
                        <h5> Edit Pin</h5>
                            <form>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Review</label>
                                <textarea
                                    name="review"
                                    className="form-control"
                                    value={formData.review}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Activity Level</label>
                                <select
                                    name="rating"
                                    onChange={handleChange}
                                    className="form-control"
                                    defaultValue={formData.rating}
                                >
                                    <option value="1">1 (least)</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5 (most)</option>
                                </select>
                            </div>
                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors.map(x => x.slice(9))} />
                                : null}

                            {saveConfirmed
                                ?
                                <Alert type="success" messages={["Updated successfully."]} />
                                : null}
                            <button
                                className="edit-btn btn btn-primary btn-sm"
                                onClick={handleSubmit}>
                                Save
                            </button>
                        </form>
                        <Cancel className='loginCancel' onClick={() => setShowPop(false)} />
                    </MDBModalBody>
                </MDBModalContent>
               
            </MDBModalDialog> 
        
    )
}

export default EditPinForm;