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
        socket.emit('crudData',crudData)
    })
    socket.on('editData',(res)=>{
        console.log(res)
        let currentIndex=crudData.findIndex((data)=>data.id===res.id)
        if(currentIndex!==-1){
            crudData[currentIndex]={...crudData[currentIndex],...res}
        }
    })
    setInterval(()=>{
        socket.emit('crudData',crudData)
    },1000)
    
})

httpServer.listen(3000,()=>{
    console.log("server is connected")
})