import mongoose from 'mongoose'
import postMessage from '../models/postMessage.js'



export const getPosts =async (req,res)=>{
    try {
        const postMessages=await postMessage.find()
        // console.log(postMessages)
        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createPost=async (req,res)=>{

    
    const body=req.body
    const newPost=new postMessage(body)
    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updatePost=async (req,res)=>{
    const {id}=req.params;
    const post =req.body
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id')
    const updatedPost= await postMessage.findByIdAndUpdate(id,post,{new: true})

    res.json(updatedPost)

}
export const deletePost=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id')
    await postMessage.findByIdAndRemove(id)
    res.json() 
}

export const likePost=async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('no post with this id')
    const post=await postMessage.findById(id)
    const updatedPost=await postMessage.findByIdAndUpdate(id,{likeCount:post.likeCount==0?post.likeCount+1:post.likeCount-1},{new:true}) //just mock  
    res.json(updatedPost)
}


