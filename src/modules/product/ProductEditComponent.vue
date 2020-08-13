<template>
  <div class="content-wrapper">
    <section v-if="this.$store.state.checkPermission" class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Cập nhật sản phẩm</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Edit product</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <section class="content">
      <div>
        <b-tabs content-class="mt-2" fill>
          <b-tab title="Product">
            <form @submit.prevent="add" type="post">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-8" ref="addRow">
                    <div class="form-group">
                      <label for="name">Tên sản phẩm</label>
                      <input type="text" name="name" @input="slug(product.name)"
                             v-model="product.name"
                             class="form-control"
                             id="name" placeholder="Tên sản phẩm"
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
                      <label for="slug">Đường dẫn seo</label>
                      <input type="text" name="slug"
                             v-model="product.slug"
                             class="form-control" id="slug"
                             placeholder="Đường dẫn seo"
                             v-validate="'required'"
                      >
                      <div
                        v-if="errors.has('slug')"
                        class="text-danger"
                        role="alert"
                      >Đường dẫn không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="discount">Giảm giá</label>
                      <input type="number" v-validate="'min_value:0|required|max_value:100'"
                             v-model="product.discount" name="discount"
                             class="form-control" id="discount" placeholder="% giảm giá"
                      >
                      <div v-if="errors.has('discount')"
                           class="text-danger"
                           role="alert"
                      >Không được rỗng và > 0
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="description">Mô tả</label>
                      <vue-editor useCustomImageHandler @image-added="handleImageAdded" id="description" name="content" v-validate="'required'" v-model="product.description"></vue-editor>
                      <div
                        v-if="errors.has('description')"
                        class="text-danger"
                        role="alert"
                      >Mô tả không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="image_list">Ảnh mô tả</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file" ref="image_list" multiple class="custom-file-input" id="image_list" @change="multifile">
                          <label class="custom-file-label" for="image_list">Choose file</label>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div v-for="(image, key) in images" :key="key">
                        <div :class="'col-md-'+images.length">
                          <button @click.prevent="removeImageList(key)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                          <img class="preview" style="position: relative;" :ref="'image'" width="200px"/>
                        </div>
                      </div>
                    </div>
                    <div class="row" v-if="this.imgViews.length>0">
                      <div v-for="(image, key) in imgViews" :key="key">
                        <div :class="'col-md-'+images.length">
                          <img :src="'http://localhost:8081/SpringMvc/resources/images/pro3/'+image" class="preview" style="position: relative;" width="200px"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="category">Danh mục</label>
                      <treeselect id="category"
                                  v-model="product.category"
                                  :options="categories" name="category"
                                  :show-count="true" v-validate="'required'"
                                  placeholder="Mời chọn danh mục"
                      />
                      <div
                        v-if="errors.has('category')"
                        class="text-danger"
                        role="alert"
                      >Danh mục không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="brand">Nhãn hiệu</label>
                      <select v-model="product.brand" id="brand" class="form-control">
                        <option v-for="brand in brands" :value="brand.id">{{brand.name}}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="priority">Độ ưu tiên</label>
                      <select v-model="product.priority" id="priority" class="form-control">
                        <option value="1">Mới</option>
                        <option value="2">Bán chạy</option>
                        <option value="3">Nổi bật</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="vision">Chế độ</label>
                      <select v-model="product.vision" id="vision" class="form-control">
                        <option value="1">Được mua</option>
                        <option value="0">Chỉ được xem</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="status">Trạng thái</label>
                      <select v-model="product.status" id="status" class="form-control">
                        <option value="0">Hiển thị</option>
                        <option value="1">Ẩn</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="image">Ảnh đại diện</label>
                      <div class="input-group">
                        <div class="custom-file">
                          <input type="file"
                                 ref="image" name="image" class="custom-file-input" id="image" @change="onFileChange">
                          <label class="custom-file-label" for="image">Choose file</label>
                        </div>
                        <div class="input-group-append">
                          <span class="input-group-text" id="">Upload</span>
                        </div>
                      </div>
                    </div>
                    <div id="preview" v-if="imgView!=null">
                      <img id="img_preview" :src="this.$store.state.resources_url+'pro3/'+imgView" width="300px"/>
                    </div>
                    <div v-if="url">
                      <img :src="url" width="200px"/>
                    </div>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Submit</span>
                </button>
                <span class="text-danger" v-if="this.$store.state.errors.length>0">{{this.$store.state.errors}}</span>
              </div>
            </form>
          </b-tab>
          <b-tab title="Variants" active>
            <sku-component></sku-component>
          </b-tab>
        </b-tabs>
      </div>
    </section>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect';
  import Multiselect from 'vue-multiselect';
  import SkuComponent from "../sku/SkuComponent";
  import {mapGetters} from "vuex";
  import GlobalService from "../../services/global.service";
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  import Edit from "./edit";
  import {VueEditor} from "vue2-editor";
  export default {
    name: "ProductEditComponent",
    components:{Treeselect,Multiselect,SkuComponent,VueEditor},
    data(){
      return {
        category:{id:null},
        url: null,
        images: [],
        imgViews:[],
        imgView:null,
        loading:false,
        product: new
        Edit(null,"","",0,1,1,1,0,"",0,"",[])
      }
    },
    created() {
      if(GlobalService.filterApi("UPDATE_PRODUCT")){
        this.getCategories();
      }
    },
    methods:{
      handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
        let formData = new FormData();
        formData.append("image", file);
        axios({
          url: store.state.API_URL+"/editor/file",
          method: "POST",
          data: formData,
          headers:authHeader()
        })
          .then(result => {
            let url = result.data.data;
            Editor.insertEmbed(cursorLocation, "image",url);
            resetUploader();
          })
          .catch(err => {
            console.log(err);
          });
      },
      slug(name){
        this.product.slug = GlobalService.slug(name);
      },
      add(){
        this.loading = true;
        if(GlobalService.filterApi("UPDATE_PRODUCT")){
          this.$validator.validateAll().then(isValid => {
            if (!isValid) {
              this.loading = false;
              return;
            }else{
              let data = new FormData();
              data.append("id",this.product.id);
              data.append("name",this.product.name);
              data.append("slug",this.product.slug);
              data.append("category",this.product.category);
              data.append("brand",this.product.brand);
              data.append("discount",this.product.discount);
              data.append("vision",this.product.vision);
              data.append("status",this.product.status);
              data.append("priority",this.product.priority);
              data.append("description",this.product.description);
              if(this.product.image!=null){
                data.append("image",this.product.image);
              }
              if(this.product.image_list.length>0){
                for(let i = 0; i< this.product.image_list.length; i++) {
                  data.append('image_list', this.product.image_list[i])
                }
              }
              this.$store.dispatch('product/update', data).then(
                response => {
                  this.loading = false;
                  this.$swal(response.data);
                },
              );
            }
          });
        }else{
          this.loading = false;
          this.$swal(this.$store.state.message);
        }
      },
      getCategories(){
        axios.
        get(store.state.API_URL+"/products/"+this.$route.params.id,{headers:authHeader()})
          .then(response =>{
            this.product =  response.data;
            this.imgViews = this.product.image_list.trim().split(",");
            this.imgViews.pop();
            this.imgView = this.product.image;
            this.product.image_list = [];
            this.product.image = null;
          })
          .catch(error =>{
            console.log(error);
          });
        this.$store.dispatch('category/findAll');
        this.$store.dispatch('brand/getAll');
      },
      onFileChange(e) {
        const file = e.target.files[0];
        this.imgView = null;
        this.product.image = file;
        this.url = URL.createObjectURL(file);
      },
      removeImageList(key){
        this.images.splice(this.images[key],1);
      },
      multifile(e) {
        let vm = this;
        var selectedFiles = e.target.files;
        this.imgViews = [];
        for (let i = 0; i < selectedFiles.length; i++) {
          this.images.push(selectedFiles[i]);
          this.product.image_list.push(selectedFiles[i]);
        }
        for (let i = 0; i < this.images.length; i++) {
          let reader = new FileReader();
          reader.onload = (e) => {
            this.$refs.image[i].src = reader.result;
          };
          reader.readAsDataURL(this.images[i]);
        }
      },
    },
    computed:{
      ...mapGetters({
        categories: 'category/fetch',
        brands: 'brand/fetchAll',
      })
    }
  }
</script>

<style scoped>
  body {
    background-color: #e2e2e2;
  }

  #preview {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #preview img {
    max-width: 100%;
    max-height: 500px;
  }
</style>
