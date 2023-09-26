import React, { useState } from 'react'
import Button from '../components/Button'
import Popup from '../components/Popup'
import Details from './Details'
const Student = () => {
    const [showPopup, setshowPopup] = useState(false)
    return (
        <>
            <div className='m-5 font-Roboto'>
                <div className='flex justify-end items-end'>
                    <Button title="Upload File" onClick={() => setshowPopup(true)} className='w-[8rem] h-[2.5rem] bg-sky-600 text-white tracking-wider rounded-md hover:bg-sky-400' />
                </div>
                <Details/>
            </div>

            {
                showPopup ? <Popup title={"Upload Data"} setshowPopup={setshowPopup}/> :null
            }
        </>
    )
}

export default Student