import { React, useState } from 'react'
import Popup from 'reactjs-popup'
import './PopupAlert.css'

const PopupAlert = ({ trigger, text, handle}) => {



    return (
        <>
            
            <Popup trigger={trigger} modal >
                {close => (
                    <>
                <button className="close" onClick={close}>
                                &times;
                            </button>
                        <div className="">
                            
                            <div className="header"> Warning! </div>
                            <div className="content">
                                {' '}
                                {text}
                            </div>
                            <button className="cancelButton"
                                onClick={() => {
                                    close()
                                }}> Cancel </button>
                            <button className="okButton"
                                onClick={handle}>
                                    OK
                            </button>
                        </div>
                        </>
                )}
            </Popup>
            
        </>
    )
}

export default PopupAlert;