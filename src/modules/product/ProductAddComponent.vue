<template>
  <div class="content-wrapper">
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
    <section class="content">
      <div class="card-header">
        <h3 class="card-title">Quick Example</h3>
      </div>
      <h2 style="color: coral">Product</h2>
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
            </div>
          </div>
          <hr>
          <h2 style="color: coral">Options</h2>
          <div class="row" style="width: 600px;margin: 0 auto">
            <div class="row" style="margin-bottom: 10px" v-for="(f,index) in array">
              <div class="col-md-5">
                <input
                  type="text"
                  class="form-control"
                  v-model="f.option"
                  v-validate="'required'"
                  :name="'option'+index"
                >
                <div
                  v-if="errors.has('option'+index)"
                  class="text-danger"
                  role="alert"
                >Không được rỗng
                </div>
              </div>
              <div class="col-md-6">
                <input-tag v-validate="'required'" :name="'value'+index" v-model="f.values" @input="generate"></input-tag>
                <div
                  v-if="errors.has('value'+index)"
                  class="text-danger"
                  role="alert"
                >Không được rỗng
                </div>
              </div>
              <div class="col-md-1">
                <button v-if="index>0" class="btn btn-outline-danger" @click.prevent="remove(index)"><i class="fa fa-trash"></i></button>
              </div>
            </div>
          </div>
          <button v-if="count<3" class="btn btn-outline-warning" @click.prevent="addFormElement">Add more</button>
          <hr>
          <h2 style="color: coral" v-if="this.array[0].values.length>0">Sku</h2>
          <div v-if="this.array[0].values.length>0" class="table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table" >
              <thead>
              <th>
                Chọn
              </th>
              <th>Variants</th>
              <th>Sku</th>
              <th>Giá nhập</th>
              <th>Giá bán</th>
              <th>Số lượng nhập</th>
              </thead>
              <tbody>
              <tr v-for="(s,index) in skus">
                <td>
                  <button class="btn btn-outline-danger" @click.prevent="unCheck(index)"><i class="fa fa-times"></i></button>
                </td>
                <td>
                  <ul style="list-style: none">
                    <li v-for="(e,i) in s.values">
                      <span style="font-size: 18px;font-weight: bold" :class="{'text-success':i===0,'text-primary':i===1,'text-danger':i===2}">{{e.value}}</span>
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" v-validate="'required'"
                           :name="'code'+index" v-model="s.code" @input="s.code=$event.target.value.toUpperCase()"
                           class="form-control" placeholder="Mã kho"
                    >
                    <div v-if="errors.has('code'+index)"
                         class="text-danger"
                         role="alert"
                    >Mã kho không được rỗng
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="number" v-validate="'required|min_value:1'"
                           :name="'importPrice'+index" v-model="s.importPrice"
                           class="form-control" placeholder="Giá nhập"
                    >
                    <div v-if="errors.has('importPrice'+index)"
                         class="text-danger"
                         role="alert"
                    >Giá nhập không được rỗng
                    </div>
                  </div>
                </td>
                <td>
                  <div class="form-group">
                    <input type="text" v-validate="'required|min_value:1'"
                           :name="'exportPrice'+index" v-model="s.exportPrice"
                           class="form-control" placeholder="Giá bán"
                    >
                    <div v-if="errors.has('exportPrice'+index)"
                         class="text-danger"
                         role="alert"
                    >Giá bán không được rỗng
                    </div>
                  </div>
                </td>
                <td>
                  <number-input v-model="s.stock" :name="'stock'+index" :value="1" rounded :min="1" inline controls></number-input>
                  <div v-if="errors.has('stock'+index)"
                       class="text-danger"
                       role="alert"
                  >Số lượng nhập không được rỗng
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
          <span class="text-danger" v-if="this.$store.state.errors.length>0">{{this.$store.state.errors}}</span><br>
          <div id="error">
            <span class="text-danger" v-for="error in es">{{error}}</span><br>
          </div>
          <div class="row">
            <button type="submit" class="btn btn-primary" :disabled="loading">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              <span>Submit</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
  import Treeselect from '@riophae/vue-treeselect';
  import {mapGetters} from "vuex";
  import GlobalService from "../../services/global.service";
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';
  import Product from "./product";
  import SelectComponent from "../../components/SelectComponent";
  import { VueEditor } from "vue2-editor";
  import {Options} from "../option/options";
  import {Sku} from "../sku/sku";
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  export default {
    name: "ProductAddComponent",
    components:{
      Treeselect,SelectComponent,VueEditor
    },
    data(){
      return {
        es:[],
        loading:false,
        array: [
          new Options(null,"",[]),
        ],
        count: 1,
        skus:[],

        product: new
        Product(
          null,"","",0,1,
          1,1,0,"",0, [],[])
      }
    },
    created() {
      if(GlobalService.filterApi("CREATE_PRODUCT")){
        this.getCategories();
      };
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
      unCheck(e){
        if(this.skus.length<2){
          alert("Tối thiểu 1 mã sku")
        }else{
          confirm("Bạn chắc không") ? this.skus.splice(this.skus.indexOf(this.skus[e]),1) :false;
        }
      },
      generate(){
        this.skus = [];
        var a = [];
        var b = [];
        var c = [];
        if(this.array.length===1){
          a = this.array[0].values;
          a.forEach(e=>{
            let value = [{key:this.array[0].option,value:e}];
            this.skus.push(new Sku(null,"",10,100000,200000,value));
          })
        }
        if(this.array.length===2){
          a = this.array[0].values;
          b = this.array[1].values;
          a.forEach(e=>{
            b.forEach(f=>{
              let value = [{key:this.array[0].option,value:e},{key:this.array[1].option,value:f}];
              this.skus.push(new Sku(null,"",10,100000,200000,value));
            })
          })
        }
        if(this.array.length===3) {
          a = this.array[0].values;
          b = this.array[1].values;
          c = this.array[2].values;
          a.forEach(e=>{
            b.forEach(f=>{
              c.forEach(g=>{
                let value = [{key:this.array[0].option,value:e},{key:this.array[1].option,value:f},{key:this.array[2].option,value:g}];
                this.skus.push(new Sku(null,"",10,100000,200000,value));
              });
            });
          });
        }
      },
      remove(e){
        if(this.count===1){
          return false;
        }else{
          this.count--;
          this.array.splice(this.array.indexOf(this.array[e]),1);
          if(this.count===1){
            this.skus = [];
            var a = this.array[0].values;
            a.forEach(e=>{
              let value = [{key:this.array[0].option,value:e}];
              this.skus.push(new Sku(null,"",10,100000,200000,value));
            });
          }else {
            this.skus = [];
            var a = this.array[0].values;
            var b = this.array[1].values;
            a.forEach(e => {
              b.forEach(f => {
                let value = [{key:this.array[0].option,value:e},{key:this.array[1].option,value:f}];
                this.skus.push(new Sku(null,"",10,100000,200000,value));
              });
            });
          }
        }
      },
      addFormElement: function() {
        if(this.count>2){
          return false;
        }else{
          this.count++;
          this.array.push(
            new Options(null,"",[])
          );
        }
      },
      slug(name){
        this.product.slug = GlobalService.slug(name);
      },
      add(){
        this.loading = true;
        this.product.option = this.array;
        this.product.sku = this.skus;
        if(GlobalService.filterApi("CREATE_PRODUCT")){
          this.$validator.validateAll().then(isValid => {
            if (!isValid) {
              this.loading = false;
              return;
            }else{
              this.skus.forEach(s=>{
                if(parseFloat(s.exportPrice)<parseFloat(s.importPrice)){
                  this.es.push(`Mã ${s.code} giá bán phải lớn hơn giá nhập`);
                }
              })
              this.$store.dispatch('product/add', this.product).then(
                response => {
                  this.loading = false;
                  this.$router.push({ name: 'products'});
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
        this.$store.dispatch('category/findAll');
        this.$store.dispatch('brand/getAll');
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
  .my-custom-scrollbar {
    position: relative;
    height: 400px;
    overflow: auto;
  }
  .table-wrapper-scroll-y {
    display: block;
  }
</style>
