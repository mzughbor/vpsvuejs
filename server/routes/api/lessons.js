const express=require('express')
const mongodb=require('mongodb')


const URI = "mongodb+srv://muaz:rfUJfONejac1ZYZS@cluster0.ozmgayj.mongodb.net/?retryWrites=true&w=majority"
const router=express.Router()
const COLLECTION='lessons'


async function loadCollection(){
    const client=await  mongodb.MongoClient.connect(
        URI,
        { useNewUrlParser: true }
    )
    let collection= client.db('typewriting').collection(COLLECTION)
    return collection
}

router.get('/:lessonid',async (req,res)=>{
    const collection=await  loadCollection()

    let query=req.body.query ;
    query = query? query:{};
    query.lessonId=Number.parseInt(req.params.lessonid);
    if(query._id)
    {
        query._id=mongodb.ObjectId(query._id)
       
    }
    if(query.lessonId==0)
    {
        res.send(await collection.find({}).toArray())
        return
    }

    res.send(await collection.find(query).toArray())
})

router.post('/',async (req,res)=>{
    const collection=await loadCollection();
    let newArticale=req.body;

    
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
    if(req.body.id)
    {
       
        res.send(collection.deleteOne({_id:mongodb.ObjectId(req.body.id)}))
    }
    else
        {
            console.log("me " +req.body.id)
            res.status(500).send("error id does not specified")
        }
  
})


module.exports= router