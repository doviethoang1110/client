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
                <a @click.prevent="add" class="btn btn-outline-success"><i class="fa fa-plus"></i> Thêm mới</a>
                <div class="card-body table-responsive p-0">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Stt</th>
                      <th>Image</th>
                      <th>Tiêu đề</th>
                      <th>Nội dung</th>
                      <th>Loại banner</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(b,index) in banners">
                      <td>{{index+1}}</td>
                      <td><img width="150px" :src="$store.state.resources_url+'home-banner/'+b.image"/></td>
                      <td>{{b.title}}</td>
                      <td>{{b.content}}</td>
                      <td>
                        <div v-switch="b.type">
                          <span class="badge badge-primary" v-case="1">Ảnh chạy</span>
                          <span class="badge badge-info" v-case="2">Ảnh quảng cáo</span>
                          <span class="badge badge-warning" v-case="3">Ảnh SEO</span>
                        </div>
                      </td>
                      <td><span :class="b.status === true ? 'badge badge-success' : 'badge badge-danger'">{{b.status === true ? 'Hiển thị' : 'Ẩn'}}</span></td>
                      <td>
                        <a @click.prevent="edit(b.id)" class="btn btn-outline-warning"><i class="fa fa-pen"></i></a>
                        <a @click.prevent="remove(b.id)" class="btn btn-outline-danger"><i class="fa fa-trash"></i></a>
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
            <b-modal id="modal" size="lg" :title="isCreated ? 'Thêm mới':'Cập nhật'" hide-footer>
              <div class="card card-primary">
                <div v-if="errs.length>0">
                  <div class="alert alert-danger"><span v-for="e in errs">{{e}}<br></span></div>
                </div>
                <form role="form" @submit.prevent="createNew">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="title">Tiêu đề</label>
                      <input type="text"
                             v-model="banner.title" class="form-control" name="title" id="title"
                             placeholder="Nhập tiêu đề"
                             v-validate="'required'"
                      >
                      <div
                        v-if="errors.has('title')"
                        class="text-danger"
                        role="alert"
                      >Tiêu đề không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="content">Nội dung</label>
                      <input type="text"
                             v-model="banner.content" class="form-control" name="content" id="content"
                             placeholder="Nhập nội dung"
                             v-validate="'required'"
                      >
                      <div
                        v-if="errors.has('content')"
                        class="text-danger"
                        role="alert"
                      >Nội dung không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="links">Liên kết</label>
                      <input type="text"
                             v-model="banner.links" class="form-control" name="links" id="links"
                             placeholder="Nhập liên kết"
                             v-validate="'required'"
                      >
                      <div
                        v-if="errors.has('links')"
                        class="text-danger"
                        role="alert"
                      >Liên kết không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="type">Loại ảnh</label>
                      <select class="form-control" id="type" v-model="banner.type" name="type" v-validate="'required'">
                        <option value="1">Ảnh chạy</option>
                        <option value="2">Ảnh quảng cáo</option>
                        <option value="3">Ảnh SEO</option>
                      </select>
                      <div
                        v-if="errors.has('type')"
                        class="text-danger"
                        role="alert"
                      >Loại ảnh không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="image">Chọn ảnh</label>
                      <input v-validate="isCreated === true ? 'required' : ''" @change="onFileChange" type="file" name="image" class="form-control-file" id="image">
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
                        <img :src="$store.state.resources_url+'home-banner'+imgView" width="200px"/>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="status">Trạng thái</label>
                      <toggle-button id="status" v-model="banner.status" :labels="{checked:'Hiện',unchecked:'Ẩn'}" :height="30" :width="100"/>
                    </div>
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary" :disabled="loading">
                      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                      <span>Submit</span>
                    </button>
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
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  import Banner from "./banner";
  import axios from 'axios';
  import store from '../../store';
  import authHeader from "../../services/auth-header";
  export default {
    name: "BannerComponent",
    data(){
      return {
        permissions: ["CREATE_BANNER","READ_BANNER","UPDATE_BANNER","DELETE_BANNER"],
        isCreated:true,
        banner:new Banner(0,"","",1,null,"",false),
        url: null,
        imgView:null,
        loading:false,
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getBanners();
      };
    },
    methods:{
      paginate(page){
        this.$store.dispatch('banner/findAll',parseInt(page-1));
      },
      remove(id){
        if(confirm("Bạn có chắc không")){
          if(GlobalService.filterApi("DELETE_BANNER")){
            this.$store.dispatch("banner/delete",id).then(response =>{
              this.$swal(response.data);
            }).catch(error =>{
              console.log(error);
            })
          }else{
            this.$swal("Bạn không có quyền");
          }
        }else{
          return false;
        }
      },
      edit(id){
        this.isCreated = false;
        axios
          .get(store.state.API_URL+"/banners/"+id,{headers:authHeader()})
          .then(response=>{
            this.banner = response.data;
            this.imgView = this.banner.image;
            this.banner.image = null;
            this.url = null;
          })
          .catch(error => {
            console.log(error);
          });
        this.$bvModal.show("modal");
      },
      getBanners(){
        this.$store.dispatch('banner/findAll',0);
      },
      add(){
        this.isCreated = true;
        this.banner = new Banner(0,"","",1,null,"",false);
        this.url = null;
        this.imgView = null;
        this.$bvModal.show("modal");
      },
      onFileChange(e) {
        const file = e.target.files[0];
        this.imgView = null;
        this.banner.image = file;
        this.url = URL.createObjectURL(file);
      },
      createNew(){
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }else{
            let data = new FormData();
            data.append("id",this.banner.id);
            data.append("title",this.banner.title);
            data.append("content",this.banner.content);
            data.append("type",this.banner.type);
            data.append("status",this.banner.status);
            data.append("links",this.banner.links);
            if(this.banner.image!=null){
              data.append("image",this.banner.image);
            }
            if(this.banner.id===0){
              if(GlobalService.filterApi("CREATE_BANNER")){
                this.$store.dispatch('banner/add', data).then(
                  response => {
                    this.loading = false;
                    this.url = null;
                    this.banner = new Banner(0,"","",1,null,"",false);
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
              if(GlobalService.filterApi("UPDATE_BANNER")){
                this.$store.dispatch('banner/update', data).then(
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
        banners: "banner/fetch",
        totalPage: "banner/totalPage",
        errs: "banner/errors"
      }),
      rows(){
        return this.banners.length;
      }
    }
  }
</script>

<style scoped>
</style>
