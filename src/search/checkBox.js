import React from 'react'
import './searchBox.css'
import { HelpOutline } from '@mui/icons-material';

//check box in filter panel

const Checkbox = ({ pref, setPref }) => {

    //value per checkbox
    const checkVal = [
        { checkNum: "1" },
        { checkNum: "2" },
        { checkNum: "3" },
        { checkNum: "4" },
        { checkNum: "5" }
    ]

    //if option checked, filter display of pins on map
    const handleCheck = (e) => {
        if (e.target.checked) {
            setPref([...pref, e.target.value])
        } else {
            setPref(pref.filter(id => id !== e.target.value))
        }

    }

    return (
        <div className="checkbox">
            <b style={{ paddingBottom: "5px" }}>Filter by Activity Level:</b>
            <br />
            {checkVal.map((checkVal, idx) => (
                <div key={idx}>

                    <input

                        type="checkbox"
                        value={checkVal.checkNum}
                        onChange={handleCheck}
                    /><span style={{ paddingRight: "3px", paddingLeft: "5px" }}>{checkVal.checkNum}</span>
                </div>
            ))}
        </div>
    )

}

export default Checkbox;