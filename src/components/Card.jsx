import React from 'react'

const Card = ({temp, weather}) => {
  return (
    <div>{temp}, {weather}</div>
  )
}

export default Card