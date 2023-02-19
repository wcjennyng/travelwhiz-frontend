import React, { useState } from 'react'
import { Cancel, ContactsOutlined } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import Alert from '../general/Alert'
import './SignupForm.css'

//Sign Up Form
//displays form and updates state on changes
//when form is submitted, it calls signup function prop and redirects to /homepage
//routed as /signup

function SignupForm ({ signup, setShowSignup }) {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })

    const [formErrors, setFormErrors] = useState([])

    //handles form submit
    async function handleSubmit(e) {
        e.preventDefault();
        const result = await signup(formData)
        if(result.success) {
            navigate("/") //redirects to homepage
        } else {
            setFormErrors(result.e)
        }
    }

    //updates form data field
    function handleChange(e) {
        const { name, value } = e.target
        setFormData(data => ({...data, [name]: value}))
    }

    return (
        <div className="SignupForm">
            <h3 className="title">Sign Up</h3>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username</label>
                    <input
                        name="username"
                        className='form-control'
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input
                        type='password'
                        name="password"
                        className='form-control'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>First Name</label>
                    <input
                        name="firstName"
                        className='form-control'
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Last Name</label>
                    <input
                        name="lastName"
                        className='form-control'
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        name="email"
                        className='form-control'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {formErrors.length  
                    ? <Alert type='danger' messages={formErrors.map(x=> x.slice(9))} />
                    : null
                }

                <button type="submit" className='btn btn-primary'>Submit</button>
            
            <Cancel className='signupCancel' onClick={() => setShowSignup(false)} /> 
        </form>
    </div>
    )

}

export default SignupForm;