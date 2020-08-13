<template>
    <div class="content-wrapper">
      <div v-if="!this.$store.state.checkPermission" class="jumbotron">
        <h2>{{ this.$store.state.message }}</h2>
      </div>
      <div v-else>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1>Simple Tables</h1>
              </div>
              <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                  <li class="breadcrumb-item"><a href="#">Home</a></li>
                  <li class="breadcrumb-item active">Simple Tables</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title">Responsive Hover Table</h3>
                    <div class="card-tools">
                      <div class="input-group input-group-sm" style="width: 150px;">
                        <input type="text" name="table_search" class="form-control float-right" placeholder="Search">

                        <div class="input-group-append">
                          <button type="submit" class="btn btn-default"><i class="fas fa-search"></i></button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <a class="btn btn-success" @click="add"><i class="fa fa-plus"></i> Thêm mới</a>
                  <div class="card-body table-responsive p-0">
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th>Stt</th>
                        <th>Tên vai trò</th>
                        <th>Mô tả</th>
                        <th>Quyền</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(role,index) in roles">
                        <td>{{index+1}}</td>
                        <td>{{role.name}}</td>
                        <td>{{role.displayName}}</td>
                        <td width="600px">
                          <span class="btn btn-outline-info" v-for="p in role.list" style="margin-left: 3px;margin-bottom: 3px">{{p}}</span>
                        </td>
                        <td>
                          <a @click="edit(role.id)" class="btn btn-warning"><i class="fa fa-pen"></i></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card -->
              </div>
              <b-modal id="modal" size="lg" :title="isCreated ? 'Thêm mới':'Cập nhật'" hide-footer>
                <div class="card card-primary" @submit.prevent="createNew">
                  <form role="form">
                    <div class="card-body">
                      <div class="form-group">
                        <label for="name">Tên quyền</label>
                        <input type="text"
                               v-model="role.name" class="form-control" name="name" id="name"
                               placeholder="Nhập tên" @input="genName($event)"
                               v-validate="'required'"
                        >
                        <div
                          v-if="errors.has('name')"
                          class="text-danger"
                          role="alert"
                        >Tên không được rỗng
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="displayName">Tên thay thế</label>
                        <input type="text" v-model="role.displayName" class="form-control" id="displayName"
                               placeholder="Nhập tên thay thế" v-validate="'required'" name="displayName"
                        >
                        <div
                          v-if="errors.has('displayName')"
                          class="text-danger"
                          role="alert"
                        >Tên thay thế không được rỗng
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="permissions">Chọn quyền</label>
                        <multiselect v-model="role.permission" id="permissions" name="permissions"
                                     placeholder="Mời bạn chọn quyền" label="displayName"
                                     track-by="id" :options="permiss" :multiple="true"
                                     :taggable="true" v-validate="'required'"
                        ></multiselect>
                        <div
                          v-if="errors.has('permissions')"
                          class="text-danger"
                          role="alert"
                        >Chọn ít nhất 1 quyền
                        </div>
                      </div>
                      <span class="text-danger" v-if="error">{{error}}</span>
                    </div>
                    <!-- /.card-body -->
                    <div class="card-footer">
                      <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                  </form>
                </div>
              </b-modal>
            </div>
          </div>
        </section>
      </div>
    </div>
</template>

<script>
  import Multiselect from 'vue-multiselect';
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  import {Role} from "./role";
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  export default {
    components:{Multiselect},
    name: "RoleComponent",
    data(){
      return {
        permissions: ["CREATE_ROLE","READ_ROLE","UPDATE_ROLE","DELETE_ROLE"],
        isCreated:true,
        role: new Role(null,"","",[])
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getRoles();
      };
    },
    methods:{
      genName(e){
        this.role.name=e.target.value.toUpperCase();
      },
      getRoles(){
        this.$store.dispatch('role/findAll');
        this.$store.dispatch('role/findPermission');
      },
      add(){
        this.isCreated = true;
        this.role = new Role(null,"","",[])
        this.$bvModal.show("modal");
      },
      createNew(){
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            return;
          }else{
            if(this.role.id==null){
              if(GlobalService.filterApi("CREATE_ROLE")){
                this.$store.dispatch('role/add', this.role).then(
                  response => {
                    this.$data.role = new Role(null,"","",[]);
                    this.$swal(response.data);
                  },
                );
              }else{
                this.$swal("Bạn không có quyền");
              }
            }else{
              if(GlobalService.filterApi("UPDATE_ROLE")){
                this.$store.dispatch('role/update', this.role).then(
                  response => {
                    this.$swal(response.data);
                  },
                );
              }else{
                this.$swal("Bạn không có quyền");
              }
            }
          }
        });
      },
      edit(id){
        this.isCreated = false;
        axios.
        get(store.state.API_URL+"/roles/"+id,{headers:authHeader()})
          .then(response =>{
            this.role.id = response.data.id;
            this.role.displayName = response.data.displayName;
            this.role.name = response.data.name;
            this.role.permission = response.data.permissions;
          })
          .catch(error =>{
            this.$swal(error);
          });
        this.$bvModal.show("modal");
      },
    },
    computed:{
      ...mapGetters({
        roles: "role/fetch",
        permiss: "role/getPermissions",
        error: "role/error"
      })
    }
  }
</script>

<style scoped>

</style>
