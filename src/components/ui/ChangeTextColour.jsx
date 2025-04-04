import React from 'react'

const ChangeTextColour = ({children , style}) => {
  return (
    <span className={`${style}`}>
      {" "}{children}{" "}
    </span>
  )
}

export default ChangeTextColour
