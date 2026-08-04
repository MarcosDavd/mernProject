import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {
  const {token}= useParams();
  const [status,setStatus] = useState("Verifing");
  const navigate = useNavigate();
  useEffect(()=>{
    const VerifyEmail = async()=>{
      try {
        const res=await axios.post(`http://localhost:5000/user/verify`,{},
          {
            headers:{
              Authorization: `Bearer ${token}`
            }
          })
          if(res.data.success){
            setStatus("✅ Email verified Successfully")
            setTimeout(()=>{
              navigate('/login');
            },2000)
          }else{
            setStatus("❌ Invalid or expired token")
          } 
      } catch (error) {
        console.error(error);
        setStatus("❌ Verification Failed. Please try again")
      }
    } 
    VerifyEmail();
  },[token,navigate])// esto dice -> Volve a ejecutar el UseEffect cuando token o navigate cambien
  return (
    <div className='relative w-full h-[760px] bg-green-100 overflow-hidden'>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-white p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>
          <h2 className='text-x1 font-semibold text-gray-800'>{status}</h2>
        </div>
      </div>
    </div>
  )
}

export default Verify
