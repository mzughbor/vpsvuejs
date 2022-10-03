const express=require('express')
const mongodb=require('mongodb')


const router=express.Router();
const URI = "mongodb+srv://muaz:rfUJfONejac1ZYZS@cluster0.ozmgayj.mongodb.net/?retryWrites=true&w=majority";
//GET USERS

router.get('/',async (req,res)=>{
    const results= await loadCollection();

   
    res.send(await results.find({}).toArray())

})


//add post
router.post('/',async (req,res)=>{
    const results=await loadCollection();
    await results.insertOne({
        userId:req.body.userId,
        result:{},
        speed:0
    })
    res.status(201).send();
})
//updata 
router.put('/',async (req,res)=>{
    const results=await loadCollection();
    let student= await results.find({userId:req.body.userId}).toArray();
  
    let result=student[0].result;
    if(result===null)
        result={}
    result[req.body.lesson]=req.body.mark;
 

   res.send( await results.updateOne({'userId':req.body.userId}, {$set: { result:result,speed:req.body.speed}}))
   
})

router.delete("/",async (req,res)=>{
    const collection=await loadCollection();
    res.send(collection.deleteOne({_id:mongodb.ObjectId(req.body.id)}))
})


 async function loadCollection(){
  

    const client= await mongodb.MongoClient.connect(
        URI,
        { useNewUrlParser: true }
    )
    let collection=client.db('typewriting').collection('results')
    return collection

}
module.exports=router;