const express=require('express')
const mongodb=require('mongodb')
const router=express.Router();
const uri = "mongodb+srv://muaz:rfUJfONejac1ZYZS@cluster0.ozmgayj.mongodb.net/?retryWrites=true&w=majority";

//GET USERS

router.get('/',async (req,res)=>{
    const users= await loadusersCollection();
    res.send(await users.find({}).toArray())

})
router.get('/:id/j/:uu',async (req,res)=>{
    //const users= await loadusersCollection();
    res.send(req.params)

})

//add user 
router.post('/',async (req,res)=>{
    const users=await loadusersCollection();
   let user= await users.insertOne({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        createAt:new Date()
    });

    res.send(user);
})

router.put('/',async (req,res)=>{
    const collection= await loadusersCollection();
    let query=req.body.query;
    if(query._id)
    {
        query._id=mongodb.ObjectId(query._id)
    }
   
    const newValues={$set: req.body.data};
    res.send(collection.updateOne(query,newValues))
})

router.delete("/",async (req,res)=>{
    const collection=await loadusersCollection();
    res.send(collection.deleteOne({_id:mongodb.ObjectId(req.body.id)}))
})

 async function loadusersCollection(){
  

    const client= await mongodb.MongoClient.connect(
        uri,
        { useNewUrlParser: true }
    )
    return client.db('typewriting').collection('users')
}
module.exports=router;