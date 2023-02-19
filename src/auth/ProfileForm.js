import React, { useState, useContext } from 'react'
import TravelWhizApi from '../Api'
import UserContext from '../auth/UserContext'
import Alert from '../general/Alert'
import './ProfileForm.css'

//Profile updating form
//Displays profile form and handles changes to local form state
//On submit, calls API to save data. 
//Routes as /profile

const ProfileForm = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: ""
    })

    const [ formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false)
  
    //handles form submit
    async function handleSubmit(e) {
        e.preventDefault()

        let profileData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        }

        let username = formData.username
        let updatedUser

        try {
            updatedUser = await TravelWhizApi.saveProfile(username, profileData)
        } catch (e) {
            setFormErrors(e)
            return;
        } 
        
        setFormData(data => ({ ...data, password: ""}))
        setFormErrors([])
        setSaveConfirmed(true)
        //reloads user information throughout the site
        setCurrentUser(updatedUser)

    }

    //handles data change
    function handleChange(e) {
        const {name, value} = e.target
        setFormData(f=> ({
            ...f, [name]: value
        }))
        setFormErrors([])
    }

    

    return (
      <div className='profilePage'>
        <div className="profileContainer">
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4 ProfileForm">
        <h3 className="mt-3 mb-3 heading" style={{fontFamily: "Pacifico", fontSize: "40px", color: "white", textShadow: "2px 2px navy"}}>Profile</h3>
        <div className="card" style={{ paddingLeft: '10px', paddingRight: '10px', borderRadius: '10px'}}>
          <div className="card-body">
            <form>
              <div className="form-group mt-2">
                <label>Username: </label>
                <span className="form-control-plaintext">{formData.username}</span>
              </div>
              <div className="form-group">
                <label>First Name </label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>Last Name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>Email </label>
                <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group mt-2">
                <label>Confirm password to make changes</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <Alert type="danger" messages={formErrors[0].includes('instance.') ? formErrors.map(x=> x.slice(9)) : formErrors} />
                  : null}

              {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
    )
    
}

export default ProfileForm;