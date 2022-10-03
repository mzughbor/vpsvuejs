const express=require('express')
const mongodb=require('mongodb')


const URI = "mongodb+srv://muaz:rfUJfONejac1ZYZS@cluster0.ozmgayj.mongodb.net/?retryWrites=true&w=majority"
const router=express.Router()
async function loadCollection(){
    const client=await  mongodb.MongoClient.connect(
        URI,
        { useNewUrlParser: true }
    )
    let collection= client.db('typewriting').collection('articales')
    return collection
}

router.get('/',async (req,res)=>{
    const collection=await  loadCollection()
    if(req.body.id==undefined)
        res.send(await collection.find({}).toArray())
    else
        res.send(await collection.find({_id:mongodb.ObjectId(req.body.id)}).toArray())
})

router.post('/',async (req,res)=>{
    const collection=await loadCollection();
    const newArticale=req.body;
    console.log(newArticale)
    res.send(collection.insertOne(newArticale));
})

router.put('/',async (req,res)=>{
    const collection= await loadCollection();
    let query=req.body.query;
    if(query._id)
    {
        query._id=mongodb.ObjectId(query._id)
    }
   
    const newValues={$set: req.body.data};
    res.send(collection.updateMany(query,newValues))
})

router.delete("/",async (req,res)=>{
    const collection=await loadCollection();
    res.send(collection.deleteOne({_id:mongodb.ObjectId(req.body.id)}))
})


module.exports= router