import React, { useEffect, useState } from 'react'

//alerts for errors when submitting forms in site 
//LoginForm, SignupForm

const Alert = ({ type = 'danger', messages = [] }) => {


    return (
        <div className={`mb-2 p-1 alert-${type}`} role="alert">
            {messages.map(error => (
                <p className="mb-0 small" key={error}>{error}</p>
            ))}
        </div>
    )
}

export default Alert;