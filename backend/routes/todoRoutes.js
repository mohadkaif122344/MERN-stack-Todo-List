import express from "express";
import Todo from "../models/todo.js";


 export const router = express.Router();

// post message
router.post("/add-task", async (req, res)=>{
    try {
        const {title, description} = req.body;

        const todo = await Todo.create({
            title,
            description
        })
        res.json({success:true, data:todo});
    } catch (error) {
        res.json({success:false, message:error.message});
        
    }
})

// get message
router.get("/task", async(_, res)=>{
try {
    const todolist = await Todo.find();

    res.json({success:true, data: todolist}) 

} catch (error) {
   res.json({success:false, message: error.message}) 
}
})

// get message with id
router.get("/task/:id", async(req, res)=>{
try {
    const todoId = await Todo.findById(req.params.id);

    res.json({success:true, data: todoId}) 

} catch (error) {
   res.json({success:false, message: error.message}) 
}
})



// update message
router.put("/update-task/:id", async(req, res)=>{
try {
    const updatetodo = await Todo.findByIdAndUpdate(req.params.id, req.body);

    res.json({success:true, data: updatetodo}) 

} catch (error) {
   res.json({success:false, message: error.message}) 
}
})

// delete one message 
router.delete("/delete/:id", async(req, res)=>{
try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({ success: true, message:'deleted successfully'}) 

} catch (error) {
   res.json({success:false, message: error.message}) 
}
})

// delete multiple message
router.delete("/delete-multiple", async(req, res)=>{
try {
    await Todo.deleteMany({ _id: { $in: req.body.ids } });

    res.json({ success: true, message:'deleted successfully'}) 

} catch (error) {
   res.json({success:false, message: error.message}) 
}
})



