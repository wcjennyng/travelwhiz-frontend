import {useState} from 'react'

//toggle feature 

const useToggle = (initialVal=false) => {
    const [state, setState] = useState(initialVal);
    const toggleState = () => {
        setState(state => !state)

    }

    return [state, toggleState]
}

export default useToggle;