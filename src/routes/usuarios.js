const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// son eventos asincronos 
router.get('/',async(req,  res)=>{
    const usuarios = await Usuario.find();
    res.json(usuarios);
});

router.post('/',async(req, res)=>{
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.json({
        status: 'usuario guardado'
    });
});

router.put('/:id',async(req, res)=>{
    await Usuario.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Usuario actualizado'
    })
});

router.delete('/:id',async(req, res)=>{
    await Usuario.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Usuario eliminado'
    })
});

router.post('/images/upload', (req, res) => {
    uploadImage(req, res, (err) => {
        if (err) {
            err.message = 'The file is so heavy for my service';
            return res.send(err);
        }
        console.log(req.file);
        res.send('uploaded');
    });
});

router.get('/images', (req, res) => {});
module.exports = router;