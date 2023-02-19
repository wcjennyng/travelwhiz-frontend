import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../auth/UserContext'
import Alert from '../general/Alert'
import TravelWhizApi from '../Api'
import moment from 'moment'

import { Cancel } from '@material-ui/icons'
import './EditSaved.css'

//Pin edit form 
//Displays pin pop-up form and handles changes to local form state
//On submit, calls API to save data

const EditSaved = ({ setShowPop, pinId, setCurrDate, currDate }) => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false)

    //auto populates current form data 
    let pId = currentUser.uPinList.findIndex(i => i.id === pinId)
    const [formData, setFormData] = useState({
        title: currentUser.uPinList[pId].title,
        review: currentUser.uPinList[pId].review,
        rating: currentUser.uPinList[pId].rating
    })

    //formats date and time when updated
    useEffect(() => {
        setCurrDate(moment().format("MM-DD-YYYY hh:mm:ss"))
    }, [])

    //if current user, set to username
    let username = currentUser?.username

    //handles edit form submit 
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
            editPin = await TravelWhizApi.patchPin(pinId, pinData)
            setFormErrors([])
            setSaveConfirmed(true)
        } catch (err) {
            setFormErrors(err)
            console.log(err)
            return;
        }
            setFormData(data => ({ ...data }))
            let user = await TravelWhizApi.getCurrentUser(username)
            setCurrentUser(user)
            
            
    }

    //handles data change
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(f => ({
            ...f, [name]: value
        }))
        setFormErrors([])
    }

    return (
        <div className="editSaved">
            <h5>Edit Pin</h5>
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
                    : (saveConfirmed && 
                    <Alert type="success" messages={["Updated successfully."]} />)}

                
                <button
                    className="edit-btn btn btn-primary btn-sm"
                    onClick={handleSubmit}>
                    Save
                </button>
            </form>
            <Cancel className='loginCancel' onClick={() => setShowPop(false)} />
        </div>
    )
}

export default EditSaved;