const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// son eventos asincronos hay que usar callbacks
router.get('/',async(req,  res)=>{
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/:id',async(req,  res)=>{
    const task = await Task.findById(req.params.id);
    res.json(task);
});

router.post('/',async(req, res)=>{
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: 'task saved successfully'
    });
});

router.put('/:id',async(req, res)=>{
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'task updated successfully'
    })
});

router.delete('/:id',async(req, res)=>{
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'task delete successfully'
    })
});

module.exports = router;