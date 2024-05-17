const {createServer}=require('http')
const {Server}=require('socket.io')

const httpServer=createServer()
const io=new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173'
    }
})
let playerScores=[]
io.on('connection',(socket)=>{
    // console.log(socket);
    // sending message from server to client by using emit method in socket,message is the event key
    socket.on('scores',(scores)=>{
        // console.log("scores>>",scores)
        playerScores.push({...scores,id:socket.id})
        // console.log("scores>>",playerScores)
        // console.log("socket id", socket.id)
        socket.emit('playerscore',playerScores)
    })
    
})

httpServer.listen(3000,()=>{
    console.log("server is connected")
})