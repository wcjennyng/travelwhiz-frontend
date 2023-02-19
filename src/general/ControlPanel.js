import * as React from 'react'
import './ControlPanel.css'

//Blurb for Homepage before user is logged in

function ControlPanel() {

    return (
        <div className="control-panel">
            <h3>Welcome to TravelWhiz</h3>
            <p>The site where you can view others travel experiences
                and share your own!</p>
            <h5>Click on a pin for information about the marked location.</h5>
        </div>)
}

export default ControlPanel;