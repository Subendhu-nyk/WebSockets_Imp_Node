import React, { useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'


const CrudOperation = () => {
    const [formInputs,setFormInputs]=useState({})
    const socket=io('http://localhost:3000/')
    const handleInput=(event)=>{
        const {name,value}=event.target;
        let obj={[name]:value}
        setFormInputs((prev)=>({...prev,...obj}))
    }
    const handleSubmit=()=>{
        console.log(formInputs)
        socket.emit("data",formInputs)
    }
  return (
    <>      
    <h1>Crud Operations</h1> 
    <div className='form-fields'>
      <input className='input-field' onChange={handleInput} name='name' placeholder='Enter your name' /> 
        <input className='input-field' onChange={handleInput} name='age' placeholder='Enter your age' />  
        <input className='input-field' onChange={handleInput} name='phone' placeholder='Enter your phone number' />   
    <button onClick={handleSubmit}>Add data</button>
    </div>
   
  </>
  )
}

export default CrudOperation