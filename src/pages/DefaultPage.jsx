import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
const DefaultPage = () => {
  const nav = useNavigate()
  return (
    <div className='flex justify-center items-center h-screen font-Roboto'>
      <Button className='w-[12rem] h-[3rem] bg-sky-600 text-white tracking-wider rounded-md hover:bg-sky-400' title="Click To Continue" onClick={()=>nav("/students/details")}/>
    </div>
  )
}

export default DefaultPage