const {createServer}=require('http')
const {Server}=require('socket.io')

const httpServer=createServer()
const socket=new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173/'
    }
})
socket.on('connection',(socket)=>{
    console.log(socket);
    // sending message from server to client by using emit method in socket,message is the event key
})

httpServer.listen(3000,()=>{
    console.log("server is connected")
})