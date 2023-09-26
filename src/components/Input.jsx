import React from 'react'

const Input = ({className,onChangeFunc,name,type}) => {
  return (
    <div>
        <input className={className} name={name} type={type} onChange={(e)=>onChangeFunc(e)}/>
    </div>
  )
}

export default Input