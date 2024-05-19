import React, { useEffect, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import {v4 as uuidv4} from "uuid"

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
        socket.emit("data",{...formInputs,id:uuidv4()})
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
    const handleEditData=()=>{
        console.log(formInputs)
        socket.emit("editData",formInputs)
        setIsEdit(false)
        setFormInputs({name:'',age:'',phone:''})
    }


    const handleDelete=(id)=>{

socket.emit('deleteData',id)
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
    <button onClick={isEdit? handleEditData:handleSubmit}>{isEdit?"Edit":"Add"} data</button>
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
    <td><button onClick={()=>handleDelete(data?.id)}>Delete</button></td>  
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