<template>
  <div class="container">
    <a style="font-size: 25px;text-align: right" href="#" @click.prevent="check = !check">
      {{check===true ? 'add new variants': 'back'}}
    </a>
    <a class="btn btn-outline-warning float-right" v-if="check" @click.prevent="edit">Save</a>
    <div class="card-body table-responsive p-0 scrollbar table-wrapper-scroll-y" v-if="check">
      <table class="table table-hover text-nowrap">
          <thead>
          <tr>
            <th>Chọn</th>
            <th>Mã kho</th>
            <th>Giá nhập</th>
            <th>Giá bán</th>
            <th>Số lượng</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(s,index) in skus">
            <td>
              <div class="icheck-primary">
                <input type="checkbox" v-model="ids" :value="s" :id="index">
                <label :for="index"></label>
              </div>
            </td>
            <td>
              <h3 style="color: coral">{{s.code}}</h3><br>
              <h5>
              <span v-for="(a,index) in s.option.split(',')"
                    :class="{'text-primary':index===0,'text-warning':index===1,'text-danger':index===2}">{{a}}
                <span v-if="index!==s.option.split(',').length-1">/</span></span>
              </h5>
            </td>
            <td>
              <div class="form-group">
                <input type="number" v-validate="'required|min_value:1'"
                       :name="'importPrice'+index" v-model.number="s.importPrice"
                       class="form-control" placeholder="Giá bán"
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
                <input type="number" v-validate="'required|min_value:1'"
                       :name="'exportPrice'+index" v-model.number="s.exportPrice"
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
              <h4 style="color: #1e2b37">{{s.stock}} <i v-if="s.quantity>0" class="fa fa-arrow-right"> <span style="color: orange">{{ s.status==='1'&&s.quantity>0 ? s.quantity : s.stock+s.quantity}}</span></i> </h4>
            </td>
            <td>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-outline-primary" :class="{'focus active':s.status==='1'}" :for="'set'+index">
                  <input type="radio" name="options" value="1" v-model="s.status" :id="'set'+index"> Set
                </label>
                <label class="btn btn-outline-primary" :class="{'focus active':s.status==='0'}" :for="'add'+index">
                  <input type="radio" name="options" value="0" v-model="s.status" :id="'add'+index"> Add
                </label>
                <number-input v-model="s.quantity" :value="0" rounded :min="0" size="small" inline controls></number-input>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      <span class="text-danger" id="es" v-for="e in es">{{e}}<br></span>
    </div>
    <div class="row" v-else>
      <div class="col-md-5">
        <div class="card">
          <div class="card-body" style="background-color: #337ab7">
            <h5 class="card-title" style="font-weight: bold;font-size: 20px">Variants</h5>
          </div>
          <ul class="list-group list-group-flush my-custom-scrollbar table-wrapper-scroll-y ">
            <li class="list-group-item" v-for="(s,index) in skus">Mã kho :{{s.code}} - variants:
              <span v-for="(a,index) in s.option.split(',')"
                    :class="{'text-primary':index===0,'text-warning':index===1,'text-danger':index===2}">{{a}}
                <span v-if="index!==s.option.split(',').length-1">/</span></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-7">
        <form @submit.prevent="addNew">
          <div class="form-row">
            <div class="form-group" :class="'col-md-'+12/sku.options.length" v-for="(o,index) in sku.options">
              <label :for="index">{{o.name}}</label>
              <input
                :placeholder="o.name"
                v-model="o.value" type="text" v-validate="'required'"
                class="form-control" :name="'option'+index"
                :class="{'text-primary':index===0,
                'text-warning':index===1,'text-danger':index===2}" :id="index">
              <div v-if="errors.has('option'+index)"
                   class="text-danger"
                   role="alert"
              >{{o.name}} không được rỗng
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="sku">Sku</label>
              <input
                v-model="sku.code" v-validate="'required'"
                name="sku" type="text"
                class="form-control" id="sku"
                placeholder="Mã kho">
              <div v-if="errors.has('sku')"
                   class="text-danger"
                   role="alert"
              >Mã kho không được rỗng
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="sln">Số lượng nhập</label>
              <input
                v-model.number="sku.stock"
                type="number" name="sln" v-validate="'required|min_value:1'"
                class="form-control" id="sln"
                placeholder="Số lượng nhập">
              <div v-if="errors.has('sln')"
                   class="text-danger"
                   role="alert"
              >Số lượng nhập không được rỗng
              </div>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="gianhap">Giá nhập</label>
              <input
                v-model.number="sku.importPrice"
                type="number" name="gianhap" v-validate="'required|min_value:1'"
                class="form-control" id="gianhap"
                placeholder="Giá nhập">
              <div v-if="errors.has('gianhap')"
                   class="text-danger"
                   role="alert"
              >Giá nhập lớn hơn 1
              </div>
            </div>
            <div class="form-group col-md-6">
              <label for="giaban">Giá bán</label>
              <input
                v-model.number="sku.exportPrice"
                name="giaban" type="number" v-validate="'required|min_value:1'"
                class="form-control" id="giaban"
                placeholder="Giá bán">
              <div v-if="errors.has('giaban')"
                   class="text-danger"
                   role="alert"
              >Giá bán lớn hơn 1
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <span v-if="error" class="text-danger">{{error}}</span>
        <span id="err" class="text-danger"></span>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import GlobalService from "../../services/global.service";
    import axios from "axios";
    import store from "../../store";
    import authHeader from "../../services/auth-header";
    export default {
      name: "SkuComponent",
      data(){
        return {
          check:true,
          es:[],
          sku:{
            code:"",
            importPrice:"",
            exportPrice:"",
            productId:this.$route.params.id,
            stock:"",
            options:[]
          },
          ids:[],
        }
      },
      created() {
        if(GlobalService.filterApi("UPDATE_PRODUCT")){
          this.getSkus();
          this.getOptions(this.$route.params.id);
        }
      },
      methods:{
        getSkus(){
          this.$store.dispatch('sku/findAll',this.$route.params.id);
        },
        getOptions(id){
          axios
            .get(store.state.API_URL+"/products/"+id+"/options",{headers:authHeader()})
            .then(response=>{
              response.data.forEach(e=>{
                this.sku.options.push({
                  id:e.id,
                  name:e.name,
                  value:""
                })
              })
            })
            .catch(error => {
              console.log(error);
            });
        },
        addNew(){
          if(GlobalService.filterApi("CREATE_PRODUCT")){
            this.$validator.validateAll().then(isValid => {
              if (!isValid) {
                return;
              }else{
                if(parseFloat(this.sku.exportPrice)<=parseFloat(this.sku.importPrice)){
                  $("#err").text("Giá bán phải lớn hơn giá nhập");
                  return false;
                }
                this.$store.dispatch('sku/add', this.sku).then(
                  response => {
                    $("#err").text("");
                    this.sku.code = this.sku.importPrice = this.sku.exportPrice = this.sku.stock = "";
                    this.sku.options.forEach(e=>{
                      e.value = "";
                    })
                    this.getSkus();
                    this.$swal(response.data);
                  },
                );
              }
            });
          }else{
            this.$swal(this.$store.state.message);
          }
        },
        edit() {
          if(this.ids.length===0){
            alert("Chọn ít nhất 1");
          }else{
            this.$validator.validateAll().then(isValid => {
              if (!isValid) {
                return;
              } else {
                this.es = [];
                this.ids.forEach(s=>{
                  if(parseFloat(s.exportPrice)<=parseFloat(s.importPrice)){
                    this.es.push(`Mã ${s.code} giá bán phải lớn hơn giá nhập`);
                  }
                })
                if(this.es.length>0){
                  return false;
                }else{
                  this.ids.forEach(s=>{
                    s.stock = s.status === '1'&&s.quantity >0 ? s.quantity : s.stock +s.quantity;
                  })
                  this.$store.dispatch("sku/update",this.ids).then(response=>{
                    this.ids = [];
                    this.getSkus();
                    setTimeout(()=>{
                      this.$swal(response.data);
                    },0);
                  })
                }
              }
            })
          }
        }
      },
      computed:{
        ...mapGetters({
          skus: 'sku/fetch',
          error:'sku/error'
        })
      }
    }
</script>

<style scoped>
  .my-custom-scrollbar {
    position: relative;
    height: 360px;
    overflow: auto;
  }
  .table-wrapper-scroll-y {
    display: block;
  }
  .scrollbar {
    position: relative;
    height: 450px;
    overflow: auto;
  }
</style>
