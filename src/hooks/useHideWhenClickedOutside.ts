import React, { useEffect } from 'react'

function useHideWhenClickedOutside(
  ref: React.RefObject<HTMLDivElement>,
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
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
