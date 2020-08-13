<template>
  <div class="content-wrapper">
    <div v-if="!this.$store.state.checkPermission" class="jumbotron">
      <h2>{{ this.$store.state.message }}</h2>
    </div>
    <section v-if="this.$store.state.checkPermission" class="content-header">
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
    <section v-if="this.$store.state.checkPermission" class="content">
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
              <a @click="change1()" class="btn btn-success"><i class="fa fa-plus"></i>Thêm mới</a>
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                  <tr>
                    <th>Stt</th>
                    <th>Tên</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(brand,index) in brands">
                      <td>{{index+1}}</td>
                      <td>{{brand.name}}</td>
                      <td>
                        <a @click="show(brand.id)" class="btn btn-primary"><i class="fa fa-eye"></i></a>
                        <a class="btn btn-warning" @click="change2(brand.id)"><i class="fa fa-pen"/></a>
                        <a class="btn btn-danger" @click="remove(brand.id)"><i class="fa fa-trash"/></a>
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
            <div :class="isCreated ? 'card card-primary' : 'card card-warning'">
              <div class="card-header">
                <h3 class="card-title">{{ isCreated ? 'Thêm mới' : 'Cập nhật'}}</h3>
              </div>
              <!-- /.card-header -->
              <!-- form start -->
              <form role="form" @submit.prevent="add" ref="form">
                <div class="card-body">
                  <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" v-model="brand.name"
                           @keyup="slug(brand.name)" class="form-control" id="name" name="name" placeholder="Tên"
                           v-validate="'required'">
                    <div
                      v-if="errors.has('name')"
                      class="text-danger"
                      role="alert"
                    >Tên không được rỗng
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="slug">Slug</label>
                    <input type="text"
                           v-model="brand.slug" class="form-control" id="slug"
                           placeholder="slug" v-validate="'required'" name="slug">
                    <div
                      v-if="errors.has('slug')"
                      class="text-danger"
                      role="alert"
                    >Đường dẫn không được rỗng
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="image">Ảnh</label>
                    <div class="input-group">
                      <div class="custom-file">
                        <input name="image" v-validate="isCreated === true ? 'required' : ''" @change="onFileChange"  type="file" class="custom-file-input" id="image">
                        <label class="custom-file-label" for="image">Choose file</label>
                      </div>
                    </div>
                    <div
                      v-if="errors.has('image')"
                      class="text-danger"
                      role="alert"
                    >Ảnh không được rỗng
                    </div>
                    <div v-if="url">
                      <img :src="url" width="200px"/>
                    </div>
                    <div v-if="imgView!=null">
                      <img :src="$store.state.resources_url+'logos/'+imgView" width="200px"/>
                    </div>
                  </div>
                  <div class="icheck-primary">
                    <input type="checkbox" id="status" ref="status">
                    <label for="status">Actived</label>
                  </div>
                  <span class="text-danger" v-if="err.length>0">{{ err }}</span>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary" :disabled="loading" :class="isCreated ? 'btn btn-success' : 'btn btn-warning'">
                    <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                    <span>{{ isCreated ? 'Thêm mới' : 'Cập nhật' }}</span>
                  </button>
                  <button type="reset" class="btn btn-primary">
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div v-if="errors.length>0">
              <div class="alert alert-danger"><span v-for="e in errors">{{e}}<br></span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <b-modal id="bv-modal-example" hide-footer>
      <template v-slot:modal-title>
        Chi tiết nhãn dán
      </template>
      <div class="d-block text-center">
          <table class="table table-striped" v-if="one">
            <tr>
              <th>Id</th>
              <td>{{one.id}}</td>
            </tr>
            <tr>
              <th>Tên</th>
              <td>{{one.name}}</td>
            </tr>
            <tr>
              <th>Đường dẫn</th>
              <td>{{one.slug}}</td>
            </tr>
            <tr>
              <th>Ảnh</th>
              <td><img width="50px" :src="this.$store.state.resources_url+'logos/'+one.image"/></td>
            </tr>
            <tr>
              <th>Trạng thái</th>
              <td><button :class="one.status===1 ? 'btn btn-success' : 'btn btn-danger'">{{one.status===1 ? 'Hiển thị' : 'Ẩn'}}</button></td>
            </tr>
            <tr>
              <th>Người tạo</th>
              <td>{{ one.createBy }}</td>
            </tr>
            <tr>
              <th>Ngày tạo</th>
              <td>{{ one.createAt }}</td>
            </tr>
            <tr>
              <th>Người cập nhật</th>
              <td>{{ one.updatedBy}}</td>
            </tr>
            <tr>
              <th>Ngày cập nhật</th>
              <td>{{ one.updatedAt  }}</td>
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
  import Brand from "./brand";
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  import Banner from "../banner/banner";
  export default {
    name: "BrandComponent",
    data(){
      return {
        permissions: ["CREATE_BRAND","READ_BRAND","UPDATE_BRAND","DELETE_BRAND"],
        brand: new Brand(0,"","",null,0),
        isCreated:true,
        url: null,
        imgView:null,
        loading:false,
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getBrands();
      };
    },
    methods:{
      onFileChange(e) {
        const file = e.target.files[0];
        this.imgView = null;
        this.brand.image = file;
        this.url = URL.createObjectURL(file);
      },
      paginate(page){
        this.$store.dispatch("brand/findAll",parseInt(page-1));
      },
      getBrands(){
        this.$store.dispatch('brand/findAll',0);
      },
      remove(id){
        if(confirm("Bạn có chắc không ?")){
          if(GlobalService.filterApi("DELETE_BRAND")){
            this.$store.dispatch('brand/delete',id,).then(
              response => {
                this.$swal(response.data);
              },
            )
          }else{
            this.$swal(this.$store.state.message);
          }
        }else{
          return false;
        }
      },

      slug(name){
        this.brand.slug = GlobalService.slug(name);
      },
      change1(){
        this.isCreated = true;
        this.brand = new Brand(0,"","",null,0);
        this.$refs.status.checked = this.brand.status === 0 ? false : true;
        this.url = null;
        this.imgView = null;
      },
      change2(slug){
        this.isCreated = false;
        axios.
        get(store.state.API_URL+"/brands/"+slug,{headers:authHeader()})
          .then(response =>{
            this.brand = response.data;
            this.$refs.status.checked = this.brand.status === 0 ? false : true;
            this.imgView = this.brand.image;
            this.brand.image = null;
            this.url = null;
          })
          .catch(error =>{
            console.log(error);
          });
      },
      show(id){
        this.$store.dispatch('brand/findOne',[id]);
        this.$bvModal.show('bv-modal-example');
      },
      add(){
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }else{
            this.brand.status = this.$refs.status.checked === true ? 1 : 0;
            let data = new FormData();
            data.append("id",this.brand.id);
            data.append("name",this.brand.name);
            data.append("slug",this.brand.slug);
            data.append("status",this.brand.status);
            if(this.brand.image!=null){
              data.append("image",this.brand.image);
            }
            if(this.brand.id===0){
              if(GlobalService.filterApi("CREATE_BRAND")){
                this.$store.dispatch('brand/add', data).then(
                  response => {
                    this.loading = false;
                    this.url = null;
                    this.brand = new Brand(0,"","",null,0);
                    this.$swal(response.data);
                  },
                ).catch(error => {
                  this.loading = false;
                });
              }else{
                this.loading = false;
                this.$swal("Bạn không có quyền");
              }
            }else{
              if(GlobalService.filterApi("UPDATE_BRAND")){
                this.$store.dispatch('brand/update', data).then(
                  response => {
                    this.loading = false;
                    this.$swal(response.data);
                  },
                ).catch(error =>{
                  this.loading = false;
                });
              }else{
                this.loading = false;
                this.$swal("Bạn không có quyền");
              }
            }
          }
        });
      },
    },
    computed:{
      ...mapGetters({
        brands: 'brand/fetch',
        totalPage: 'brand/totalPage',
        err: 'brand/error',
        errors: 'brand/errors',
        one: 'brand/fetchOne',
        edit: 'brand/edit'
      })
    }
  }
</script>
<style scoped>
</style>
