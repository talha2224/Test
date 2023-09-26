import React, { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { FaUpload } from 'react-icons/fa';
import { db, storage } from '../firebase/firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ImCross} from 'react-icons/im'

const Popup = ({ title, role, setshowPopup }) => {
  const [file, setfile] = useState(null)
  const [progress, setprogress] = useState(0)
  const handleSubmit = () => {
    const storageRef = ref(storage, `/files/${Date.now()}${file?.name}`)
    const uploadFile = uploadBytesResumable(storageRef, file)
    uploadFile.on("state_changed", (snapshot) => {
      const progressPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setprogress(progressPercent)
      getDownloadURL(uploadFile.snapshot.ref)
        .then((url) => {
          const articleRef = collection(db, 'StudentsDetails')
          addDoc(articleRef, { file: url })
            .then((res) => {
              toast("Data Added Sucessfully")
              setTimeout(() => {
                setshowPopup(false)
              }, 2000);
            })
            .catch((e) => console.log(e))
        })
    })
  };

  const getDetails = (e) => {
    setfile(e?.target?.files[0])
  }

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-Roboto'>
        <div className='bg-white p-3 rounded-[10px] w-[25rem]'>
          <div className='flex justify-between items-center mb-4'>
            <h1 className=''>{title}</h1>
            <ImCross className=' cursor-pointer' onClick={()=>setshowPopup(false)}/>
          </div>
          <label>

            <div className={`flex justify-center items-center w-[100%] cursor-pointer h-[3rem] ${file ? "bg-sky-900" : "bg-sky-600"} text-white mb-5 rounded-[6px]`}>
              <FaUpload className="mr-2" />
              <p>{!file ? "Add File" : "File Added"}</p>
            </div>

            <Input type="file" className="hidden" onChangeFunc={getDetails} />

          </label>


          <Button title='Submit File'
            className={`w-[100%] h-[3rem] ${!file ? 'bg-gray-400 cursor-not-allowed' : 'bg-sky-600 hover:bg-sky-400'} text-white tracking-wider rounded-md`}
            onClick={handleSubmit} />

        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" />
      <ToastContainer />
    </>
  )
}

export default Popup