<template>
  <div class="content-wrapper">
    <div>
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
                <div class="card-body table-responsive p-0">
                  <form @submit.prevent="deliver">
                    <label for="coupon">Chọn mã giảm giá</label>
                    <select class="col-6" style="margin: 0 auto" id="coupon" v-model="coupon_customer.coupon_id">
                      <option v-for="coupon in coupons.filter(c=> c.status ===0)" :value="coupon.id">
                        <span v-if="coupon.type===1">Free shipping</span>
                        <span v-if="coupon.type===2">Flash sale {{coupon.detail}} VNĐ</span>
                        <span v-if="coupon.type===3">Discount percent {{coupon.detail}} %</span>
                      </option>
                    </select>
                    <table class="table table-bordered">
                      <thead>
                      <tr>
                        <th>
                          <button class="btn btn-outline-info" @click.prevent="selected = !selected">
                            <i class="fa fa-check"></i>
                          </button>
                        </th>
                        <th>Stt</th>
                        <th>Tên</th>
                        <th>Địa chỉ email</th>
                        <th>Số điện thoại</th>
                        <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(u,index) in users">
                        <td>
                          <div class="icheck-primary">
                            <input type="checkbox" :id="index" :checked="selected" :value="u.id" v-model="coupon_customer.customer_id">
                            <label :for="index"></label>
                          </div>
                        </td>
                        <td>{{index+1}}</td>
                        <td>{{u.name}}</td>
                        <td>{{u.email}}</td>
                        <td>{{u.phone}}</td>
                        <td>
                          <a class="btn btn-outline-warning" @click="edit(u.id)"><i class="fa fa-eye"></i></a>
                        </td>
                      </tr>
                      </tbody>
                    </table>
                    <button class="btn btn-outline-success" type="submit">Phát coupon</button>
                  </form>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->
            </div>
          </div>
        </div>
      </section>
    </div>
    <b-modal id="modal" size="lg" hide-footer v-if="user">
      <div class="card card-primary">
        <form role="form">
          <div class="card-body">
            <h3 class="text-info">Danh sách coupon</h3>
            <h4>{{user.name}}</h4>
            <span v-for="c in user.coupons">
              <button class="btn btn-outline-primary" v-if="c.type===1">Free shipping</button>
              <button class="btn btn-outline-info" v-if="c.type===2">Flash sale {{c.detail}} VNĐ</button>
              <button class="btn btn-outline-warning" v-if="c.type===3">Discount percent ({{c.detail}} %)</button>
            </span>
          </div>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  import {Coupon} from "./coupon";
  import {Role} from "../role/role";
  export default {
    name: "CouponDeliverComponent",
    data(){
      return {
        selected:false,
        coupon_customer:{
          coupon_id:1,
          customer_id:[]
        }
      }
    },
    created() {
      if(GlobalService.filterApi("CREATE_COUPON")){
        this.getUsers();
      };
    },
    methods:{
      edit(id){
        this.$store.dispatch('coupon/findUser',[id]);
        this.$bvModal.show("modal");
      },
      getUsers(){
        this.$store.dispatch('coupon/findAll');
        this.$store.dispatch('coupon/findUsers');
      },
      deliver(){
        if(this.coupon_customer.customer_id.length===0){
          alert("chọn ít nhất 1 người dùng");
        }else{
          this.$store.dispatch('coupon/deliver', this.coupon_customer).then(
            response => {
              if(response.status==="error"){
                this.$swal(response.data);
              }else {
                this.$data.coupon_customer.customer_id = [];
                this.$swal(response.data);
              }
            },
          );
        }
      },
    },
    computed:{
      ...mapGetters({
        coupons: "coupon/fetch",
        users: "coupon/user",
        user: "coupon/one"
      })
    }
  }
</script>

<style scoped>

</style>
