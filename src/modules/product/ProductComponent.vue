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
              <router-link :to="{name:'proAdd'}" class="btn btn-success"><i class="fa fa-plus"></i>Thêm mới</router-link>
              <div class="card-body table-responsive p-0">
                <table class="table table-hover text-nowrap">
                  <thead>
                  <tr>
                    <th><a class="btn btn-danger"><i class="fa fa-trash-alt"></i></a></th>
                    <th>Ảnh</th>
                    <th>Tên</th>
                    <th>Nhãn hiệu</th>
                    <th>Danh mục</th>
                    <th>Độ ưu tiên</th>
                    <th>Chế độ</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(product,index) in products">
                    <td>
                      <div class="icheck-primary">
                        <input type="checkbox" v-model="ids" :value="product" :id="index">
                        <label :for="index"></label>
                      </div>
                    </td>
                    <td><img width="50px" :src="'http://localhost:8081/SpringMvc/resources/images/pro3/'+product.image"/></td>
                    <td>{{product.name}}</td>
                    <td>{{product.brand}}</td>
                    <td>{{product.category}}</td>
                    <td>
                      <button class="btn btn-outline-primary" v-if="product.priority===1">Mới</button>
                      <button class="btn btn-outline-danger" v-if="product.priority===2">Bán chạy</button>
                      <button class="btn btn-outline-success" v-if="product.priority===3">Nổi bật</button>
                    </td>
                    <td><button :class="{'btn btn-warning':product.vision===1,'btn btn-primary':product.vision===0}">{{product.vision===1?'được mua':'chỉ được xem'}}</button></td>
                    <td><button :class="{'btn btn-success':product.status===1,'btn btn-danger':product.status===0}">{{product.status===1?'Ẩn':'Hiển thị'}}</button></td>
                    <td>
                      <a class="btn btn-primary"><i class="fa fa-eye"></i></a>
                      <router-link :to="{name:'proEdit',params:{id:product.id}}" class="btn btn-warning"><i class="fa fa-pen"/></router-link>
                      <a class="btn btn-danger"><i class="fa fa-trash"/></a>
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
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  export default {
    name: "ProductComponent",
    data(){
      return {
        permissions: ["CREATE_PRODUCT","READ_PRODUCT","UPDATE_PRODUCT","DELETE_PRODUCT"],
        ids:[]
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getProducts();
      };
    },
    methods:{
      getProducts(){
        this.$store.dispatch('product/findAll',0);
      },
      paginate(page){
        this.$store.dispatch('product/findAll',parseInt(page-1));
      }
    },
    computed:{
      ...mapGetters({
        products: 'product/fetch',
        totalPage: 'product/totalPage'
      })
    }
  }
</script>
<style scoped>
</style>
