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
                <a class="btn btn-outline-success" @click="add"><i class="fa fa-plus"></i> Thêm mới</a>
                <div class="card-body table-responsive p-0">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Stt</th>
                      <th>Tên</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(s,index) in shippings">
                      <td>{{index+1}}</td>
                      <td>{{s.name}}</td>
                      <td>
                        <button :class="{'btn btn-outline-success':s.status===0,'btn btn-outline-danger':s.status===1}">
                          {{s.status===0 ? 'Actived' : 'Inactived'}}
                        </button>
                      </td>
                      <td>
                        <a @click.prevent="edit(s.id)" class="btn btn-outline-warning"><i class="fa fa-pen"></i></a>
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
                      <label for="name">Tên</label>
                      <input type="text"
                             v-model="shipping.name" class="form-control" name="name" id="name"
                             placeholder="Nhập tên"
                             v-validate="'required'"
                      >
                      <div
                        v-if="errors.has('name')"
                        class="text-danger"
                        role="alert"
                      >Tên không được rỗng
                      </div>
                    </div>
                    <div class="icheck-primary">
                      <input type="checkbox" id="status" ref="shipping">
                      <label for="status">Actived</label>
                    </div>
                    <span class="text-danger" v-if="error">{{error}}</span>
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </div>
                  <span id="error" class="text-danger"></span>
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
  import {mapGetters} from 'vuex';
  import store from "../../store";
  import GlobalService from "../../services/global.service";
  import {Shipping} from "./shipping";
  import axios from "axios";
  import authHeader from "../../services/auth-header";
  export default {
    name: "ShippingComponent",
    data(){
      return {
        permissions: ["CREATE_SHIPPING","READ_SHIPPING","UPDATE_SHIPPING","DELETE_SHIPPING"],
        isCreated:true,
        shipping: new Shipping(null,"",0)
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getShipping();
      };
    },
    methods:{
      edit(id){
        this.isCreated = false;
        axios
          .get(store.state.API_URL+"/shippings/"+id,{headers:authHeader()})
          .then(response=>{
            this.shipping = response.data;
            this.$refs.shipping.checked = this.shipping.status==0 ? true : false;
          })
          .catch(error => {
            console.log(error);
          });
        this.$bvModal.show("modal");
      },
      getShipping(){
        this.$store.dispatch('ship/findAll');
      },
      add(){
        this.isCreated = true;
        this.shipping = new Shipping(null,"",0)
        this.$bvModal.show("modal");
      },
      createNew(){
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            return;
          }else{
            this.shipping.status = this.$refs.shipping.checked ? 0 :1;
            if(this.shipping.id==null){
              if(GlobalService.filterApi("CREATE_SHIPPING")){
                this.$store.dispatch('ship/add', this.shipping).then(
                  response => {
                    this.$data.shipping = new Shipping(null,"",0);
                    this.$swal(response.data);
                  },
                );
              }else{
                this.$swal("Bạn không có quyền");
              }
            }else{
              if(GlobalService.filterApi("UPDATE_SHIPPING")){
                this.$store.dispatch('ship/update', this.shipping).then(
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
    },
    computed:{
      ...mapGetters({
        shippings: "ship/fetch",
        error: "ship/error"
      })
    }
  }
</script>

<style scoped>

</style>
