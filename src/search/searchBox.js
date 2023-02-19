import React, { useState } from "react"
import SearchInput from "./searchInput"
import { Marker, useMap } from "react-map-gl"

import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import './searchBox.css'

//handles result of search box input

const Searchbox = () => {

    const [suggestions, setSuggestions] = useState([])
    const [value, setValue] = useState('')
    const [coord, setCoord] = useState(null)

    const { current: map } = useMap();

    //handles map view when location is searched
    const flyToCoord = (newCoord) => {
        const newLat = newCoord[0]
        const newLong = newCoord[1]
        map.flyTo({
            center: [newLat, newLong],
            zoom: 12
        })

    }

    //handles marker on map when location is searched
    const handleMarker = (markerCoord) => {
        const markerLat = markerCoord[1]
        const markerLong = markerCoord[0]
        setCoord({
            lat: markerLat,
            long: markerLong
        })
    }


    return (
        <div className="search-box">

            <SearchInput setSuggestions={setSuggestions} setValue={setValue} value={value} />

            {coord && (<Marker

                style={{ position: "absolute" }}
                latitude={coord.lat}
                longitude={coord.long}
                zoom={12}
            >
                <TravelExploreIcon
                    style={{
                        fontSize: "50px",
                        color: "navy"
                    }}
                />
            </Marker>)}
            {suggestions?.length > 0 && (
                <div className="search-results">
                    {suggestions.map((suggestion, index) => {
                        return (
                            <>
                                <p
                                    key={index}

                                    onClick={() => {

                                        setValue(suggestion.place_name);
                                        flyToCoord(suggestion.geometry.coordinates)
                                        handleMarker(suggestion.center)
                                        setSuggestions([]);
                                    }}
                                    style={{ cursor: "pointer" }}
                                >
                                    {suggestion.place_name}
                                </p>
                            </>
                        )
                    })}

                </div>
            )}
        </div>
    )
}

export default Searchbox;

