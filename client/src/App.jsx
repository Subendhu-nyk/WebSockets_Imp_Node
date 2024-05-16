import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import './App.css'
import Input from './components/Input';

function App() {
  const [score,setScore]=useState({})
 const socket= io("http://localhost:3000/");

 function connectSocket(){
  socket.on('connection',(socket)=>{
    console.log("socket",socket)
  })
 }

 const handleInput=(event)=>{
  const {name,value}=event.target
  // console.log({[name]:value})  
  let currentObject={[name]:value}
  setScore((prev)=>({...prev,...currentObject}))  
 }

function sendScores(){
  console.log(score)
  socket.emit('scores',score)
  
}

 useEffect(()=>{connectSocket()},[])
  return (
    <>      
      <h1>React Multiplayer Dashboard</h1> 
      <Input name='name' placeholder='Enter Your Name' handleInput={handleInput}/>    
      <Input name='score' placeholder='Enter Your Score' handleInput={handleInput}/>   
      <button className='send-scores' onClick={sendScores}>Publish Score</button>
    </>
  )
}

export default App
