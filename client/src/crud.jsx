import React, { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'


const CrudOperation = () => {
    const [formInputs,setFormInputs]=useState({})
    const[crudData,setCrudData]=useState([])
    const [isEdit,setIsEdit]=useState(false)
    const socket=io('http://localhost:3000/')
    const handleInput=(event)=>{
        const {name,value}=event.target;
        let obj={[name]:value}
        setFormInputs((prev)=>({...prev,...obj}))
    }
    const handleSubmit=()=>{       
        socket.emit("data",formInputs)
        socket.on('crudData',(data)=>{
            setCrudData(data)
            console.log("server sending data",data)
        })
        setFormInputs({name:'',age:'',phone:''})
    }
    const getEditData=(data)=>{
        setFormInputs(data)
        setIsEdit(true)
    }
    useEffect(()=>{
        socket.on('crudData',(data)=>{
            setCrudData(data)            
        })
    },[])
  return (
    <>      
    <h1>Crud Operations</h1> 
    <div className='form-fields'>
      <input className='input-field' value={formInputs.name} onChange={handleInput} name='name' placeholder='Enter your name' /> 
        <input className='input-field' value={formInputs.age} onChange={handleInput} name='age' placeholder='Enter your age' />  
        <input className='input-field' value={formInputs.phone} onChange={handleInput} name='phone' placeholder='Enter your phone number' />   
    <button onClick={handleSubmit}>{isEdit?"Edit":"Add"} data</button>
    </div>
    {crudData.length>0 ? <table>
        <tbody>
  <tr>
    <th>Name</th>
    <th>Age</th>  
    <th>Phone</th>  
  </tr>
  {crudData.map((data,index)=>{
    return(
    <tr key={index}>
    <td>{data?.name}</td>
    <td>{data?.age}</td>    
    <td>{data?.phone}</td>   
    <td><button onClick={()=>getEditData(data)}>Edit</button></td>   
    <td><button>Delete</button></td>  
  </tr>
    )

  })}
  
  </tbody>
</table>
:<></>}
  </>
  )
}

export default CrudOperation