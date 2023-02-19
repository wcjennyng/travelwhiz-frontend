import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from '../general/Alert'
import './LoginForm.css'
import { Cancel } from '@material-ui/icons'

//Login Form
//displays form and updates state on changes
//When submitted, calls login function prop and redirects to /homepage
//routed as /login

function LoginForm({login, setShowLogin }){
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [formErrors, setFormErrors] = useState([])

    //handles form submit
    //calls login function prop and if logged in, redirects to /homepage

    async function handleSubmit(e) {
        e.preventDefault()
        let result = await login(formData)
        if (result.success) {
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
        <div className="loginForm">
            <h3 style={{paddingBottom: '15px', paddingTop: '5px'}}>Log In</h3>

            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{paddingBottom: '5px'}}>
                    <label>Username</label>
                    <input
                        name="username"
                        className='form-control'
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="username"
                        required
                    />
                </div>
                <div className="form-group" style={{paddingBottom: '15px'}}>
                    <label>Password</label>
                    <input
                        type='password'
                        name="password"
                        className='form-control'
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                    />
                </div>

                {formErrors.length
                    ? <Alert type='danger' messages={formErrors} />
                    : null}

                <button className='btn btn-primary' onSubmit={handleSubmit}> Submit </button>
            </form>
            <Cancel className='loginCancel' onClick={() => setShowLogin(false)} />
        </div>
    )
}

export default LoginForm;