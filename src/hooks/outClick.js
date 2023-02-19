import { useEffect } from 'react'

const useOutClick = (ref, callback) => {
    const handleClick = e => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback(e.target)
        }
    }

    useEffect(()=> {
        document.addEventListener("click", handleClick)
        
        return () => {
            document.removeEventListener("click", handleClick)
        }
    })

    
}

export default useOutClick;