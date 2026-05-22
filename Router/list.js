const Router=require('express').Router();
const User=require('../Models/user');
const Lists=require('../Models/list');

// create

Router.post("/addtask", async (req, res) => {
  try {
    const { id, body, title } = req.body;
    const existinguser = await User.findById(id);
    if (!existinguser) {
      return res.status(404).json({ message: "User not found" });
    }
    const list = new Lists({ title, body, user: id });
    await list.save();
    existinguser.list.push(list._id);
    await existinguser.save();
    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "error in pushing" });
  }
});

// update
Router.put("/updatetask/:id",async(req,res)=>{
  try {
    const{id,body,title}=req.body;

    const  existinguser=await User.findById(id);
    if(existinguser){
     const list=await Lists.findByIdAndUpdate(req.params.id, {title,body,id});
   
      list.save().then(()=> res.status(200).json({message:"Updated succesfully"}))
    }
  } catch (error) { 
    console.log(error)
    res.status(400).json({message:"error in Updating"});
  }

});

// delete
Router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const {id} = req.body;
const existinguser = await User.findByIdAndUpdate(
  id,
  {$pull : {Lists:req.params.id}}
);
if(existinguser){
  await Lists.findByIdAndDelete(req.params.id).then(()=>
    res.status(200).json({message:"Task Deleted"})
  )
}
   
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Error in deleting task" });
  }
});



// gettask
Router.get("/gettask/:id", async (req, res) => {
  try {
    const list = await Lists.find({ user: new mongoose.Types.ObjectId(req.params.id) });
    res.status(200).json(list);
  } catch (error) {
    console.error("Error getting task:", error);
    res.status(400).json({ message: "Error in getting task" });
  }
});

module.exports=Router;