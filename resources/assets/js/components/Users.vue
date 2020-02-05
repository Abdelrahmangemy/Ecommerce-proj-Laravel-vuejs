<template>
    <div class="container">
        <div class="row mt-5" v-if="!$gate.isUser()">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header" id="abId0.4115316098924573">
                <h3 class="card-title">Users Management</h3>

                <div class="card-tools" id="abId0.6762115190120066">
                  <button class="btn btn-success" @click="newModal">Add New </button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">

                <table class="table table-hover">
                <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered_At</th>
                      <th>Modify</th>
                    </tr>
                  
                    <tr  v-for="user in users.data" :key="user.id">
                      
                      <td>{{user.id}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type | upText }}</td>
                      <td>{{user.created_at | myDate}}</td>
                      <td>
                          <a href="#" @click="editModal(user)" >Edit
                              <i class="fa fa-edit blue"></i>
                          </a>
                          /
                          <a href="#" @click="deleteUser(user.id)">Delete
                              <i class="fa fa-trash red"></i>
                          </a>
                      </td>
                    </tr>              
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        </div>

        <div v-if="$gate.isUser()">
          <Not-Found></Not-Found>
        </div>  

        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New User</h5>
                <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <form @submit.prevent="editmode ? updateUser() : createUser()" >
            <div class="modal-body">
                <div class="form-group">
                <input v-model="form.name" type="text" name="name"
                placeholder="Name"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                <has-error :form="form" field="name"></has-error>
                </div>


                <div class="form-group">
                <input v-model="form.email" type="text" name="email"
                placeholder="E-mail Address"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                <has-error :form="form" field="email"></has-error>
                </div>


                <div class="form-group">
                <input v-model="form.password" type="password" name="password"
                placeholder="password"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                <has-error :form="form" field="password"></has-error>
                </div>


                <div class="form-group">
                <select v-model="form.type" type="text" name="type" id="type" 
                class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                <has-error :form="form" field="type"></has-error>
                  <option value="">Select User Role </option>
                  <option value="admin">Admin </option>
                  <option value="user">Standard User </option>
                  <option value="author">Author</option>
                </select>
                <has-error :form="form" field="type"></has-error>
                </div>


                <div class="form-group">
                <textarea v-model="form.bio" type="text" name="bio"
                placeholder="short bio for user(Optional)"
                    class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                <has-error :form="form" field="bio"></has-error>
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                <button v-show="editmode" type="submit" class="btn btn-success">Update</button>
                <button v-show="!editmode" type="submit" class="btn btn-primary">Create</button>
            </div>
            </form>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                editmode: false,
                users : {},
                form : new Form({
                    id : '',
                    name : '',
                    email : '',
                    password : '',
                    type : '',
                    bio : '',
                    photo : ''
                })
            }
        },
        methods: {
          updateUser(){
            this.$Progress.start();
            this.form.put('api/user/'+this.form.id)
            
            .then(()=>{
              $('#addNew').modal('hide');
              swal.fire(
                        'Updated',
                        'Information has been Updated.',
                        'success'
                      )

              this.$Progress.finish();
              Fire.$emit('AfterCreated');

            })
            .catch(()=>{
              this.$Progress.fail();
            })
          },
          editModal(user){
            this.editmode = true;
            this.form.reset();
            $('#addNew').modal('show');
            this.form.fill(user);
          },
          newModal(){
            this.editmode = false;
            this.form.reset();
            $('#addNew').modal('show');
          },
          deleteUser(id){
            swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {

                //send request to the server
                if (result.value) {
                this.form.delete('api/user/'+id).then(()=>{
                      swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                    Fire.$emit('AfterCreated');
                }).catch(() => {
                  swal("Failed!","There was something wrong.","warning");
                });
                }   
            })
          },

          loadUsers(){
           // if (this.$gate.isAdminOrAuthor()) {
           if (!this.$gate.isUser()) {  
             axios.get("api/user").then(({ data }) => (this.users = data)); 
            }
            
          },

          createUser(){
            this.$Progress.start();
            // Submit the form via a POST request
            this.form.post('api/user')
            .then(()=>{
                        Fire.$emit('AfterCreated');
                        $('#addNew').modal('hide');

                        Toast.fire({
                                    icon: 'success',
                                    title: 'User Created in successfully'
                                  });

                        this.$Progress.finish();
            })
            .catch(()=>{

            })
            
          }
        },
        created() {
            this.loadUsers();
            Fire.$on('AfterCreated',() => {
              this.loadUsers();
            });
            //setInterval(() => this.loadUsers(),3000); 
        }
    }
</script>
