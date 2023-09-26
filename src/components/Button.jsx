import React from 'react'

const Button = ({title,className,onClick}) => {
  return (
    <div>
        <button className={className} onClick={onClick} >{title}</button>
    </div>
  )
}

export default Button