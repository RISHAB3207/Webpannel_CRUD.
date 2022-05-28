var EmpDB=require('../model/model');

//create and save user
 exports.create=(req,res)=>{

    if(!req.body){
        res.status(400).send({message:"content can not be empty"});
        return;
    }
 
 //new user
 
 const user = new EmpDB({
    name : req.body.name,
    email : req.body.email,
    contact: req.body.contact,
    address : req.body.address
})



 //save user in DB
 user
    .save(user)
    .then(data=>{
        res.redirect('/');

    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Not able to create a user" 
        })
    })
}

 //return a single user 
 exports.find=(req,res)=>{
     if(req.query.id){
        const id=req.query.id;
        EmpDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found  with id "+id})
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id"+id})
        })
     }
     else{

     
     EmpDB.find()
     .then(user=>{
         res.send(user)
     })
     .catch(err=>{
         res.status(500).send({message:err.message||"error ocuured"})
     })
    }
}

//update a user
exports.update=(req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data to be update is not available"})
    }

    const id=req.params.id;
    EmpDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
        res.status(404).send({message:`Cannot update employee data with ${id}`})
    }
    else{
        res.send(data)
    }
}
    )
    .catch(err=>{
        res.status(500).send({message:"Error"})
    })
    
     
}

//delete a user
exports.delete = (req, res)=>{
    
 
    const id = req.params.id;

    EmpDB.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}