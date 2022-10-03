const  express = require('express')
const bodyparser=require('body-parser')
const cors=require("cors")
// const data=requrire('./db.js')
// const jsonServer=require('./json-server')
// const server=jsonServer.create();
// const router=jsonServer.router(data);
// const middleWare=jsonServer.defaults();
// const portjson=process.env.PORT || 3000
// server.use(middleWare);
// server.use(router)
// server.listen(portjson)


const app=express()

app.use(bodyparser.json())

app.use(cors())

const users=require('./routes/api/users')
const results=require('./routes/api/results')
const articales=require('./routes/api/articales')
const lessons=require('./routes/api/lessons')
app.use('/api/users',users)
app.use('/api/articales',articales)
app.use('/api/results',results)
app.use('/api/lessons',lessons)

//Handle production
if(process.env.NODE_ENV==='production' )
{
    //handle folder
    app.use(express.static(__dirname+'/public/'))
    //handle spa
    app.get(/.*/,(req,res)=>{
        res.sendfile(__dirname+'/public/index.html')
    });
}
const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log('Listen on port '+port)
})
