const express = require ('express');
const morgan = require ('morgan');
const mongoose = require ('mongoose');
// const bodyParser = require("body-parser");
const app = express();

//File System --> __dirname
const fs = require("fs");
// cargar archivos
const multer = require ('multer');
const upload = multer({ dest: __dirname + '/upload'})

// DB --> hay que instalar mongo => npm install mongoose
mongoose.connect('mongodb://localhost/Login-DB')
.then(db=>console.log('DB is connected'))
.catch(db=>console.error(err))

// settings
app.set('port', process.env.PORT || 3000);

//middleware -> funciones que ayudan aprocesar antes que llegen datos a la url
// npm install morgan
app.use(morgan('dev'));
// ya viene con express, solo se llama
app.use(express.json());

//routes
app.use('/api/usuarios', require('./routes/usuarios'));//<--

//static files
app.use(express.static(__dirname + '/public'));

//server is listening
app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'));
});

app.post('/stats', upload.single('uploaded_file'), function (req, res) {
    // req.file es el nombre de tu archivo en el formulario anterior, en este caso 'uploaded_file'
    // req.body contendrá los campos de texto, si los hubiera.
    console.log(req.file)
 });






// const express = require ('express');
// const morgan = require ('morgan');
// const mongoose = require ('mongoose');
// const app = express();
// // hay que instalar mongo => npm install mongoose
// mongoose.connect('mongodb://localhost/prueba-database')
// .then(db=>console.log('DB is connected'))
// .catch(db=>console.error(err))


// // settings
// app.set('port', process.env.PORT || 3000);

// //middleware -> funciones que ayudan aprocesar antes que llegen datos a la url
// // npom install morgan
// app.use(morgan('dev'));
// // ya viene con express, solo se llama
// app.use(express.json());

// //routes
// app.use('/api/tasks', require('./routes/tasks'));

// //static files
// app.use(express.static(__dirname + '/public'));
// //server is listening
// app.listen(app.get('port'), ()=> {
//     console.log('server on port', app.get('port'));
// });