import { useState, useEffect } from 'react'

// Custom hook for Local Storage
// This creates a certain value (item) as state and looks into local storage for 
// current value. If not found, defaults to firstValue.

// When that certain value (item) changes, the effect runs again
// if new state is null, remove from local storage. Otherwise, update LS

// When used in the components, it acts like state that is also linked to LS
// For example - const [state, setState] = useLS("state")

const useLS = (key, firstVal = null) => {
    const initialVal = localStorage.getItem(key) || firstVal

    const [item, setItem] = useState(initialVal)

    useEffect(function setKeyInLS() {
        if(item===null) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, item)
        }
    }, [key, item])
    return [item, setItem]
}

export default useLS