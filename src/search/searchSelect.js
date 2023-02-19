import React from 'react'
import usStateList from './usStateList'
import './searchBox.css'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2NqZW5ueW5nIiwiYSI6ImNsMDQ4YjI2eTE3dGczam9kdmo5cTZoYzMifQ.0OarcZH_ocP258XKrZ2Xvg'

//handles 50 U.S states dropdown in filter panel 

const SearchSelect = ({setCoord, setVal, states = usStateList}) => {

    //handles selected option in dropdown 
    const handleChange = async (e) => {
        setVal(e.target.value)
    
        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?limit=1&access_token=${MAPBOX_TOKEN}`
            const resp = await fetch(endpoint);
            const res = await resp.json();
            setCoord(res?.features[0].geometry.coordinates)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="search-select" >
            <b className="select-label">Search from 50 US States: </b>
            
            <select onChange={handleChange} >
                {states.map((s, idx) => (
                    <option key={idx} value={s} >
                        {s}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SearchSelect;