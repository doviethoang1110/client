<template>
    <div class="content-wrapper">
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
        </div><!-- /.container-fluid -->
      </section>
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6">
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
                <treeview-component :children="categories" :bus="bus"></treeview-component>
              </div>
              <!-- /.card -->
            </div>
            <div class="col-6">
              <div :class="this.isCreated ? 'card card-primary' : 'card card-warning'">
                <div class="card-header">
                  <h3 class="card-title">{{ this.isCreated ? 'Thêm mới' : 'Cập nhật'}}</h3>
                </div>
                <!-- /.card-header -->
                <!-- form start -->
                <form role="form" @submit.prevent="add" ref="form">
                  <div class="card-body">
                    <div class="form-group">
                      <label for="name">Name</label>
                      <input type="text" v-model="category.name"
                             @keyup="slug(category.name)" class="form-control" id="name" name="name" placeholder="Tên"
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
                             v-model="category.slug" class="form-control" id="slug"
                             placeholder="slug" v-validate="'required'" name="slug">
                      <div
                        v-if="errors.has('slug')"
                        class="text-danger"
                        role="alert"
                      >Đường dẫn không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="parentId">Danh mục cha</label>
                      <treeselect id="parentId" @select="change"
                                  v-model="category.parentId"
                        :options="categories"
                        :show-count="true" name="parentId"
                        placeholder="Danh mục cha mặc định"
                      />
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
            </div>
          </div>
        </div>
      </section>
      <b-modal id="bv-modal-example" hide-footer>
        <template v-slot:modal-title>
          Chi tiết danh mục
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
              <th>Trạng thái</th>
              <td><button :class="one.status===0 ? 'btn btn-success' : 'btn btn-danger'">{{one.status===0 ? 'Hiển thị' : 'Ẩn'}}</button></td>
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
  import GlobalService from "../../services/global.service";
  import {mapGetters} from "vuex";
  import TreeviewComponent from "../../components/TreeviewComponent";
  import Treeselect from '@riophae/vue-treeselect';
  import Vue from 'vue'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import Category from "./category";
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  export default {
    name: "CategoryComponent",
    components:{Treeselect,TreeviewComponent},
    data(){
      return {
        category: new Category(null,"","",undefined,1),
        permissions: ["CREATE_CATEGORY","READ_CATEGORY","UPDATE_CATEGORY","DELETE_CATEGORY"],
        bus:new Vue(),
        isCreated:true,
        options: {
          checkbox: true
        },
        loading:false
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getCategories();
      };
      this.bus.$on('view', (id) => {
        this.$store.dispatch('category/findOne',[id]);
        this.$bvModal.show('bv-modal-example');
      });
      this.bus.$on('update',(id) =>{
        this.isCreated = false;
        axios.
        get(store.state.API_URL+"/categories/"+id,{headers:authHeader()})
          .then(response =>{
            this.category = response.data;
            this.$refs.status .checked = this.category.status === 0 ? true : false;
            return response.data;
          })
          .catch(error =>{
            return error;
          });
      });
      this.bus.$on('delete', (id) => {
        if(!confirm('Bạn có chắc không ?')) return false;
        this.$store.dispatch('category/delete', id).then(
          response => {
            this.$swal(response.data);
          },
        );
      });
    },
    methods:{
      change(){
        return this.category.parentId;
      },
      slug(name){
        this.category.slug = GlobalService.slug(name);
      },
      add:function(){
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }else{
            this.category.parentId===undefined ? this.category.parentId = 0 : this.category.parentId;
            this.category.status = this.$refs.status.checked ? 0 : 1;
            if(this.category.id == null){
              if(GlobalService.filterApi("CREATE_CATEGORY")){
                this.$store.dispatch('category/add', this.category).then(
                  response => {
                    this.loading = false;
                    this.category = new Category(null,"","",undefined,1)
                    this.$swal(response.data);
                  },
                );
              }else{
                this.loading = false;
                this.$swal("Bạn không có quyền");
              }
            }else{
              if(GlobalService.filterApi("UPDATE_CATEGORY")){
                this.$store.dispatch('category/update', this.category).then(
                  response => {
                    this.loading = false;
                    this.$swal(response.data);
                  },
                );
              }else{
                this.loading = false;
                this.$swal("Bạn không có quyền");
              }
            }
          }
        });
      },
      getCategories(){
        this.$store.dispatch('category/findAll');
      },
      change1(){
        this.isCreated = true;
        this.category = new Category(null,"","",undefined,1);
        this.$refs.status.checked = this.category.status === 0 ? true : false;
      },
    },
    computed:{
      selected:function () {
        return this.change()!=0 ? this.category.parentId = this.change() : 0;
      },
      ...mapGetters({
        categories: 'category/fetch',
        err: 'category/errors',
        one: 'category/fetchOne',
        edit: 'category/edit'
      })
    }
  }
</script>

<style scoped>

</style>
