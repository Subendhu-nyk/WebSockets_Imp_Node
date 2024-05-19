const {createServer}=require('http')
const {Server}=require('socket.io')

const httpServer=createServer()
const io=new Server(httpServer,{
    cors:{
        origin:'http://localhost:5173'
    }
})
let crudData=[]
io.on('connection',(socket)=>{    
    // CRUD Operations
    socket.on('data',(data)=>{       
        crudData.push(data)
        console.log(crudData)
    })
})

httpServer.listen(3000,()=>{
    console.log("server is connected")
})