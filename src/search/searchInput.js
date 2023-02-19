import React from "react";
import styled from 'styled-components'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoid2NqZW5ueW5nIiwiYSI6ImNsMDQ4YjI2eTE3dGczam9kdmo5cTZoYzMifQ.0OarcZH_ocP258XKrZ2Xvg'

//handles user input into search box

const SearchInput = ({ setSuggestions, setValue, value }) => {

    //handles search input as user enters in location
    const handleChange = async (e) => {
        setValue(e.target.value)
        try {
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true`
            const resp = await fetch(endpoint);
            const res = await resp.json();
            setSuggestions(res?.features);
        } catch (err) {
            console.log(err)
        }
    };


    return (
        <>
            <h6 style={{ color: "navy" }}><b>Type in an address:</b></h6>
            <Input placeholder="Search"
                value={value}
                onChange={handleChange}
                setValue={setValue}

            />
        </>)

}

export default SearchInput;

const Input = styled.input`
    width: 230px;
    background: white;
    border: solid;
    border-color: black;
    padding: 10px 20px;
    border-radius: 30px;
    position: relative;
    display: flex;
    &:focus {
      outline: none;
      border-radius: 30px;
    }
  `;