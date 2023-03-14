<script>
    class Task{
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    }

    export default {
        data() {
            return{
                task: new Task(),
                tasks : [],
                edit : false,
                taskToUpdate : ''
            }
        },
        created() {
            //mostrara las tareas apenas cargue el la web
            this.getTasks();
        },
        methods: {
            getTasks(){
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data =>{
                        this.tasks = data;
                        // console.log(this.tasks)
                        })
            },
            sendTask() {
                // direccion de la api y el metodo 
                // fetch permite hacer peticiones al servidor y esta integrado al navegador
                //por metodo POST se enviaran datos y a su ves se espera una respuesta del servidor 
                if (this.edit === false) {
                    fetch('/api/tasks', {
                        method : 'POST',
                        // necesito enviar por el body en formato string por eso se usa stringify
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => this.getTasks())
                    this.task = new Task()
                }else{
                    fetch('/api/tasks/'+ this.taskToUpdate, {
                        method : 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept' : 'application/json',
                            'Content-type' : 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data =>{
                        this.getTasks();
                    } )
                    this.task = new Task()
                    this.edit = false
                    
                }
            },
            deleteTask(id) {
                console.log(id +' estoy eliminado')
                fetch('/api/tasks/' + id,{
                    method : 'DELETE',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-type' : 'application/json'
                    }
                })
                .then(res => console.log(res))
                .then(data => this.getTasks())
                
            },
            updateTask(id) {
                console.log(id +' estoy actualizando')
                fetch('/api/tasks/' + id)
                    .then(res => res.json())
                    .then(data => {
                    this.task = new Task(data.title, data.description);
                    this.taskToUpdate = data._id
                    this.edit = true
                })
                // .then(data => this.getTasks())
            }
        }
    }
</script>


<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">Inicio</a>
        </nav>
        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent = "sendTask ">
                                <div class="form-group">
                                    <input type="text" v-model="task.title" placeholder="insertame una tarea" class="form-control">
                                </div>
                                <div class="form-group ">
                                    <textarea v-model="task.description" cols="30" rows="10" class="form-control" placeholder="descripcion de la tarea"></textarea>
                                </div>
                                <template v-if="edit == false">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 pt-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>descripcion</th>
                                <th colspan="2">options</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task in this.tasks">
                                <td>{{ task.title }}</td>
                                <td>{{ task.description }}</td>
                                <td><button @click="deleteTask(task._id)" class="btn btn-danger">Delete</button></td>
                                <td><button @click="updateTask(task._id)" class="btn btn-primary">Update</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


