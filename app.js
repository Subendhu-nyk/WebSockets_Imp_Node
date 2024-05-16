const {createServer}=require('http')
const {Server}=require('socket.io')

const httpServer=createServer()
const socket=new Server(httpServer,{
    cors:{
        origin:'http://127.0.0.1:5500'
    }
})
socket.on('connection',(socket)=>{
    console.log(socket);
    // sending message from server to client by using emit method in socket,message is the event key
    socket.emit("message","hello this is message")
})

httpServer.listen(3000,()=>{
    console.log("server is connected")
})