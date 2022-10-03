import express from 'express'
import serveStatic from 'serve-static'
import { join } from 'path'

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


app.use('/',serveStatic(join(__dirname,'/dist')))

const port=process.env.PORT || 8080
app.listen(port)
console.log('Listen on port'+port)