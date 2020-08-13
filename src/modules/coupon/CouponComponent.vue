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
                <router-link :to="{name:'coupon_deliver'}" class="btn btn-outline-warning"><i class="far fa-address-book"></i> Phát coupon</router-link>
                <div class="card-body table-responsive p-0">
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th>Stt</th>
                      <th>Mã giảm giá</th>
                      <th>Tiêu đề</th>
                      <th>Thời gian</th>
                      <th>Loại coupon</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(c,index) in coupons">
                      <td>{{index+1}}</td>
                      <td>{{c.code}}</td>
                      <td>{{c.title}}</td>
                      <td>
                        <span class="text-blue">{{c.startDate |formatDate}} -> {{c.endDate |formatDate }}</span>
                        <span class="text-success"><vue-countdown-timer
                          @end_callback="end(c.id)"
                          :start-time="c.startDate"
                          :end-time="c.endDate"
                          :interval="1000"
                          :start-label="'Start'"
                          :end-label="'Còn'"
                          label-position="begin"
                          :end-text="'Đã kết thúc'"
                          :day-txt="'d'"
                          :hour-txt="'h'"
                          :minutes-txt="'m'"
                          :seconds-txt="'s'">
                        </vue-countdown-timer></span>
                      </td>
                      <td>
                        <button class="btn btn-outline-primary" v-if="c.type===1">Free shipping</button>
                        <button class="btn btn-outline-info" v-if="c.type===2">Flash sale {{c.detail}} VNĐ</button>
                        <button class="btn btn-outline-warning" v-if="c.type===3">Discount percent ({{c.detail}} %)</button>
                      </td>
                      <td>
                        <button :class="{'btn btn-outline-success':c.status===0,'btn btn-outline-danger':c.status===1}">
                          {{c.status===0 ? 'Actived' : 'Inactived'}}
                        </button>
                      </td>
                      <td>
                        <a @click="edit(c.id)" class="btn btn-outline-warning"><i class="fa fa-pen"></i></a>
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
                      <label for="title">Tiêu đề</label>
                      <input type="text"
                             v-model="coupon.title" class="form-control" name="title" id="title"
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
                      <label for="code">Mã giảm giá</label>
                      <input type="text" v-model="coupon.code" class="form-control" id="code" @input="genName($event)"
                             placeholder="Nhập mã giảm giá thay thế" v-validate="'required'" name="code"
                      >
                      <div
                        v-if="errors.has('code')"
                        class="text-danger"
                        role="alert"
                      >Mã giảm không được rỗng
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="startDate">Từ ngày</label>
                      <input type="datetime-local"
                             v-model="coupon.startDate" class="form-control" name="startDate" id="startDate"
                             placeholder="Nhập thời gian bắt đầu"
                      >
                    </div>
                    <div class="form-group">
                      <label for="endDate">Đến ngày</label>
                      <input type="datetime-local"
                             v-model="coupon.endDate" class="form-control" name="endDate" id="endDate"
                             placeholder="Nhập thời gian bắt đầu"
                      >
                    </div>
                    <div class="form-group">
                      <label for="type">Loại giảm giá</label>
                      <select class="form-control"
                              id="type" v-model="coupon.type">
                        <option value="1">Free shipping</option>
                        <option value="2">Flash sale</option>
                        <option value="3">Discount percent (%)</option>
                      </select>
                    </div>
                    <div class="form-group" v-if="coupon.type>1">
                      <label for="detail">Mô tả chi tiết</label>
                      <input type="number"
                             v-model="coupon.detail" class="form-control" name="detail" id="detail"
                             placeholder="Nhập mô tả chi tiết"
                             v-validate="'required'"
                      >
                      <div
                        v-if="errors.has('detail')"
                        class="text-danger"
                        role="alert"
                      >Mô tả không được rỗng
                      </div>
                    </div>
                    <span class="text-danger" v-if="error">{{error}}</span>
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <button type="submit" class="btn btn-primary" :disabled="loading" :class="isCreated ? 'btn btn-success' : 'btn btn-warning'">
                      <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                      <span>{{ isCreated ? 'Thêm mới' : 'Cập nhật' }}</span>
                    </button>
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
  import GlobalService from "../../services/global.service";
  import {Coupon} from "./coupon";
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  import moment from "moment";
  export default {
    name: "CouponComponent",
    data(){
      return {
        permissions: ["CREATE_COUPON","READ_COUPON","UPDATE_COUPON","DELETE_COUPON"],
        isCreated:true,
        loading:false,
        coupon: new Coupon(null,"","",null,null,null,1,0)
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getCoupons();
      };
    },
    methods:{
      edit(id){
        this.isCreated = false;
        axios
          .get(store.state.API_URL+"/coupons/"+id,{headers:authHeader()})
          .then(response=>{
            this.coupon = response.data;
            this.coupon.startDate = moment(new Date(this.coupon.startDate)).format('YYYY-MM-DDTHH:mm');
            this.coupon.endDate = moment(new Date(this.coupon.endDate)).format('YYYY-MM-DDTHH:mm');
          })
          .catch(error => {
            console.log(error);
          });
        this.$bvModal.show("modal");
      },
      end(id){
        axios
          .get(store.state.API_URL+"/coupons/change/"+id,{headers:authHeader()})
          .then(response=>{
            this.$store.dispatch('coupon/findAll');
          })
          .catch(error => {
            console.log(error);
          });
      },
      genName(e){
        this.coupon.code=e.target.value.toUpperCase();
      },
      getCoupons(){
        this.$store.dispatch('coupon/findAll');
      },
      add(){
        this.isCreated = true;
        this.coupon = new Coupon(null,"","",null,null,1,1,0)
        this.$bvModal.show("modal");
      },
      createNew(){
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }else{
            if(this.coupon.startDate > this.coupon.endDate){
              this.loading = false;
              $("#error").text('ngày hết hạn phải lớn hơn ngày bắt đầu');
            }else{
              $("#error").text('');
              if(this.coupon.id==null){
                if(GlobalService.filterApi("CREATE_COUPON")){
                  this.coupon.detail = this.coupon.type > 1 ? this.coupon.detail : null;
                  this.$store.dispatch('coupon/add', this.coupon).then(
                    response => {
                      this.loading = false;
                      this.$data.coupon = new Coupon(null,"","",null,null,1,1,0);
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
                if(GlobalService.filterApi("UPDATE_COUPON")){
                  this.coupon.detail = this.coupon.type > 1 ? this.coupon.detail : null;
                  this.$store.dispatch('coupon/update', this.coupon).then(
                    response => {
                      this.loading = false;
                      this.$swal(response.data);
                    },
                  ).catch(error => {
                    this.loading = false;
                  });
                }else{
                  this.loading = false;
                  this.$swal("Bạn không có quyền");
                }
              }
            }
          }
        });
      },
    },
    computed:{
      ...mapGetters({
        coupons: "coupon/fetch",
        error: "coupon/error"
      })
    }
  }
</script>

<style scoped>

</style>
