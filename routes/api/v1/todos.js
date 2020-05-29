const express = require('express');
const router = express.Router();
const todo = require('../../../models/todo');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true});
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'Connection error:'));

/**
 * API to post single todo
 * 
 * POST /api/v1/todos
 * 
 * Sample Request body
 *  {
 *      "title": "first todo",
 *      "status": "new",
 *      "dueDate": "2020-05-29",
 *  	"labels": ["Work","Personal"]
 *  }
 **/
router.post('/', (req,res) => {
    const {title, status, dueDate, labels} = req.body;
    
    // if any one parameter is not present in the api
    if(!title || !status || !dueDate || !labels){
        res.status(404).json({message: "Please all the required parameters"});
    }else if(typeof title!=='string'){
        res.status(404).json({message: "Todo title passed should be a string"})
    }else if(status!=="new" && status!=='inprogress' && status!=='complete'){
        res.status(404).json({message: "Please send the valid status i.e new, inprogress or complete"});
    }else if(typeof dueDate!=='string'){
        res.status(404).json({message: "dueDate passed should be in string format"});
    }else if(!Array.isArray(labels)){
        res.status(404).json({message: "Labels passed should be an array"})
    }else{
        const newTodo = new todo({title,status,dueDate,labels});
        newTodo.save()
        .then((savedTodo) => {
            res.json({...savedTodo, message: "Todo added Successfully"});
        })
        .catch(err => {
            res.status(404).json({message:"Todo title should be unique"})
        })
    }
})

/**
 * API to get all todos  
 * 
 * GET /api/v1/todos?limit=3
 **/
router.get('/', (req,res) => {
    let limit = req.query.limit;
    if(!limit || parseInt(limit)<=0 || isNaN(limit)){
        limit=100;
    }else{
        limit = parseInt(limit);
    }
    todo.find(null,null,{skip:0, limit: limit},(err,result)=>{
        if(err){
            console.log("Error in GET API: "+err);
        }else{
            res.header("Access-Control-Allow-Origin","*")
            res.json(result);
        }
    })
})

/**
 * API to update single todo
 * 
 * PUT /api/v1/todos/:id
 * 
 * Sample Request body
 *  {
 *      "title": "first todo",
 *      "status": "new",
 *  	"labels": ["Work","Personal"]
 *  }
 **/
router.put('/:id', (req,res) => {
    const {title, status, labels} = req.body;

    if(req.params.id==null || req.params.id===''){
        res.status(404).json({message: "Please send id for updating the doc"});
    }else if(title || status || labels){
        if(status!==undefined && status!=='new' && status!=='inprogress' && status!=='complete'){
            res.status(404).json({message: "Please send valid status to update"});
        }else if(labels !== undefined && !Array.isArray(labels)){
            res.status(404).json({message: "Please send a valid labels array"});
        }else{
            const putTodo = {};
            if(title){putTodo.title=title}
            if(status)(putTodo.status=status)
            if(labels)(putTodo.labels=labels)
            
            todo.findOneAndUpdate({_id: req.params.id},putTodo,function(err){
                if(err){
                    console.log(err);
                    res.status(404).json({message: "Problem while updating todo"})
                }else{
                    res.json({message:"Todo updated successfully"});
                }
            });
        }
    }else{
        res.status(404).json({message: "Please send the valid parameters to update"})
    }
})

/**
 * API to delete single todo
 * 
 * DELETE /api/v1/todos/:id
 **/
router.delete('/:id',(req,res) => {
    if(req.params.id==null || req.params.id===''){
        res.status(404).json({message: "Please send id for deleting the doc"});
    }else{
        todo.findOneAndDelete({ _id: req.params.id }, function (err) {
            if(err){
                console.log(err);
                res.status(404).json({message: "Unable to delete the document"});
            } else{
                res.json({message: "Todo deleted successfully"});
            }              
        });
    }
})

module.exports = router;