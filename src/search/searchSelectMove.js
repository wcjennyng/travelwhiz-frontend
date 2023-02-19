import React, { useState } from 'react'
import SearchSelect from './searchSelect'
import { useMap } from 'react-map-gl'

//handles map view of selected dropdown state

const SearchSelectMove = () => {
    const [val, setVal] = useState(null)
    const [coord, setCoord] = useState(null)

    const { current: map } = useMap();

    //flies to selected state
    const flyToSelected = (newSelect) => {
        const newLat = newSelect[0]
        const newLng = newSelect[1]
        map.flyTo({
            center: [newLat, newLng],
            zoom: 8
        })
        setCoord(null)

    }

    return (
        <div>
            <SearchSelect coord={coord} setVal={setVal} val={val} setCoord={setCoord} />
            {coord && (
                flyToSelected(coord)

            )}

        </div>
    )

}

export default SearchSelectMove;