import { useEffect } from 'react'

function useHideWhenClickedOutside(ref, setVisibility) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisibility(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, setVisibility])
}

export default useHideWhenClickedOutside
