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
              <div class="col-5">
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
                  <div class="card-body table-responsive p-0">
                    <table class="table table-hover text-nowrap">
                      <thead>
                      <tr>
                        <th><a class="btn btn-danger" @click="multidelete"><i class="fa fa-trash-alt"></i></a></th>
                        <th>Stt</th>
                        <th>Tên</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(permission,index) in permissions">
                        <td>
                          <div class="icheck-primary">
                            <input type="checkbox" :id="index" v-model="ids" :value="permission.id">
                            <label :for="index"></label>
                          </div>
                        </td>
                        <td>{{index+1}}</td>
                        <td>{{permission.name}}</td>
                        <td>
                          <a @click="show(permission.id)" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                          <a class="btn btn-danger" @click="remove(permission.id)"><i class="fa fa-trash"/></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- /.card-body -->
                </div>
                <div style="margin-top: 20px">
                  <paginate
                    :pageCount="totalPage"
                    :page-link-class="'page-link'"
                    :page-range="3"
                    :margin-pages="1"
                    :page-class="'page-item paginate_button'"
                    :prev-class="'page-item paginate_button'"
                    :containerClass="'pagination justify-content-center'"
                    :prev-link-class="'page-link'"
                    :next-link-class="'page-link'"
                    :next-class="'page-item paginate_button'"
                    :clickHandler="paginate">
                  </paginate>
                </div>
                <!-- /.card -->
              </div>
              <div class="col-7">
                <div class="card card-primary">
                  <div class="card-header">
                    <h3 class="card-title">Thêm mới</h3>
                  </div>
                  <!-- /.card-header -->
                  <!-- form start -->
                  <form role="form" @submit.prevent="submit" ref="form">
                    <div class="card-body">
                      <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" v-model="add.name" @input="genName($event)"
                               class="form-control" id="name" name="name" placeholder="Tên"
                               v-validate="'required'">
                        <div
                          v-if="errors.has('name')"
                          class="text-danger"
                          role="alert"
                        >Tên không được rỗng
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="slug">Tên thay thế</label>
                        <input type="text"
                               v-model="add.slug" class="form-control" id="slug"
                               placeholder="tên thay thế" v-validate="'required'" name="slug">
                        <div
                          v-if="errors.has('slug')"
                          class="text-danger"
                          role="alert"
                        >Tên thay thế dẫn không được rỗng
                        </div>
                      </div>
                      <div class="form-check" v-for="(a,index) in arr">
                        <input type="checkbox" class="form-check-input" :id="index" :value="{name:a.name+add.name,displayName:a.slug+add.slug}"
                               v-model="addPermission" :disabled="add.name==''||add.slug==''">
                        <label class="form-check-label" :for="index">{{a.name}}{{add.name}}<span>   / : {{a.slug+add.slug}}</span></label>
                      </div>


                      <span class="text-danger" v-if="err.length>0">{{ err }}</span>
                    </div>
                    <!-- /.card-body -->

                    <div class="card-footer">
                      <button type="submit" class="btn btn-success">
                        Thêm mới
                      </button>
                      <button type="reset" class="btn btn-primary">
                        Reset
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <b-modal id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
          Chi tiết quyền
        </template>
        <div class="d-block text-center">
          <table class="table table-striped" v-if="one">
            <tr>
              <th>Id</th>
              <td>{{one.id}}</td>
            </tr>
            <tr>
              <th>Tên</th>
              <td><a href="javascript:void(0);" id="e-name">{{one.name}}</a></td>
              <popover-component :check="true" :header="'Tên quyền'" :target="'e-name'" :model="edit.name"
                                 @edit="updateobj(edit.name=$event)"></popover-component>
            </tr>
            <tr>
              <th>Tên thay thế</th>
              <td><a href="javascript:void(0);" id="e-displayName">{{one.displayName}}</a></td>
              <popover-component :check="false" :header="'Tên thay thế'" :target="'e-displayName'" :model="edit.displayName"
                                 @edit="updateobj(edit.displayName=$event)"></popover-component>
            </tr>
            <tr>
              <th>Ngày tạo</th>
              <td>{{ one.createdAt |formatDate}}</td>
            </tr>
            <tr>
              <th>Ngày cập nhật</th>
              <td>{{ one.updatedAt |formatDate }}</td>
            </tr>
          </table>
        </div>
        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Close Me</b-button>
      </b-modal>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  import axios from 'axios';
  import PopoverComponent from "../../components/PopoverComponent";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  export default {
    components:{PopoverComponent},
    name: "PermissionComponent",
    data(){
      return {
        permiss: ["CREATE_PERMISSION","READ_PERMISSION","UPDATE_PERMISSION","DELETE_PERMISSION"],
        arr: [
          {name:"READ_",slug:"xem "},
          {name:"CREATE_",slug:"thêm mới "},
          {name:"UPDATE_",slug:"cập nhật "},
          {name:"DELETE_",slug:"xóa "}
        ],
        add: {name:"",slug:""},
        addPermission: [],
        ids: [],
        edit:{id:null,name:"",displayName:""},
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permiss)){
        this.getPermissions();
      };
    },
    methods:{
      getPermissions(){
        this.$store.dispatch('permission/findAll',0);
      },
      paginate(page){
        this.$store.dispatch('permission/findAll',parseInt(page-1));
      },
      show(id){
        if(GlobalService.checkPermission(this.permiss)){
          axios.
          get(store.state.API_URL+"/permissions/"+id,{headers:authHeader()})
            .then(response =>{
              this.edit.id = response.data.id;
              this.edit.name = response.data.name;
              this.edit.displayName = response.data.displayName;
            })
            .catch(error =>{
              return error;
            });
          this.$store.dispatch('permission/findOne',id);
          this.$bvModal.show('bv-modal-example');
        };
      },
      genName(e){
        this.add.name=e.target.value.toUpperCase();
      },
      submit(){
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            return;
          }else{
            if(this.addPermission.length===0){
              alert("Bạn phải chọn ít nhất 1 quyền");
            }else{
              this.$store.dispatch('permission/add', this.addPermission).then(
                response => {
                  this.$swal(response.data);
                },
              ).catch(error=>{
                this.addPermission = [];
              });
            }
          }
        });
      },
      updateobj(){
        if(GlobalService.filterApi("UPDATE_PERMISSION")){
          this.$store.dispatch('permission/update',this.edit).then(
            response => {
              this.$swal(response.data);
            },
          );
        }else{
          this.$swal(this.$store.state.message);
        }
      },
      remove(id){
        if(GlobalService.filterApi("DELETE_PERMISSION")){
          if(!confirm('Bạn có chắc không ?')) return false;
          this.$store.dispatch('permission/delete',id,).then(
            response => {
              this.$swal(response.data);
            },
          );
        }else{
          this.$swal(this.$store.state.message);
        }
      },
      multidelete(){
        if(GlobalService.filterApi("DELETE_PERMISSION")){
          if(this.ids.length>0){
            if(!confirm('Bạn có chắc không ?')) return false;
            this.$store.dispatch('permission/multidelete',this.ids).then(
              response => {
                this.$swal(response.data);
              },
            );
            this.ids = [];
          }else{
            alert("Chọn ít nhất 1 bản ghi");
          }
        }else{
          this.$swal(this.$store.state.message);
        }
      },
    },
    computed:{
      ...mapGetters({
        permissions: "permission/fetch",
        totalPage: "permission/totalPage",
        one: 'permission/fetchOne',
        err: 'permission/errors',inlineErr: 'permission/inlineErr'
      })
    }
  }
</script>

<style scoped>

</style>
