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
          <h2>Order #{{order.id}}</h2>
          <div class="row">
            <div class="col-md-6">
              <table class="table table-bordered">
                <tr>
                  <th>Tên người mua</th>
                  <td>{{order.customer.name}}</td>
                </tr>
                <tr>
                  <th>Email người mua</th>
                  <td>{{order.customer.email}}</td>
                </tr>
                <tr>
                  <th>Số điện thoại người mua</th>
                  <td>{{order.customer.phone}}</td>
                </tr>
                <tr>
                  <th>Địa chỉ người mua</th>
                  <td>{{order.customer.address}}</td>
                </tr>
                <tr>
                  <th>Tên người nhận</th>
                  <td>{{order.name}}</td>
                </tr>
                <tr>
                  <th>Email người nhận</th>
                  <td>{{order.email}}</td>
                </tr>
                <tr>
                  <th>Số điện thoại người nhận</th>
                  <td>{{order.phone}}</td>
                </tr>
                <tr>
                  <th>Địa chỉ người nhận</th>
                  <td>{{order.address}}</td>
                </tr>
              </table>
            </div>
            <div class="col-md-6">
              <table class="table table-bordered">
                <tr>
                  <th>Order status</th>
                  <td>
                    <select class="form-control" @change.prevent="editStatus" v-model="order.orderStatus.id">
                      <option :disabled="o.id<order.orderStatus.id||order.orderStatus.id===3" v-for="(o,index) in orderStatus" :value="o.id" :selected="order.orderStatus.id===o.id">{{o.name}}</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>Shipping status</th>
                  <td><span :class="order.deliveryStatus.id ===4 ? 'text-danger' : 'text-primary'">{{order.deliveryStatus.name}}</span></td>
                </tr>
                <tr>
                  <th>Payment status</th>
                  <td><span :class="order.paymentStatus.id === 4 ? 'text-danger': 'text-primary'">{{order.paymentStatus.name}}</span></td>
                </tr>
                <tr>
                  <th>Payment method</th>
                  <td>{{order.paymentMethod}}</td>
                </tr>
                <tr>
                  <th>Shipping method</th>
                  <td>{{order.shippingMethod}}</td>
                </tr>
              </table>
              <table class="table-bordered table">
                <tr>
                  <th>Currency</th>
                  <td>{{order.currency}}</td>
                </tr>
                <tr>
                  <th>Exchange rate</th>
                  <td>{{order.rate}}</td>
                </tr>
              </table>
            </div>
          </div>
          <hr>
          <div class="row">
            <table class="table table-bordered">
              <thead>
                <th>Name</th>
                <th>Sku</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </thead>
              <tbody>
                <tr v-for="(o,index) in order.orderDetails">
                  <td>{{o.product.name}}</td>
                  <td>{{o.sku}}</td>
                  <td>{{o.price |formatCurrency(order.currency)}}</td>
                  <td>{{o.quantity}}</td>
                  <td>{{o.quantity*o.price | formatCurrency(order.currency)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <hr>
          <div class="row">
            <div class="col-md-6">
              <table class="table table-bordered">
                <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>{{order.subtotal | formatCurrency(order.currency)}}</td>
                </tr>
                <tr>
                  <th>Shipping</th>
                  <td>{{order.shipping | formatCurrency(order.currency)}}</td>
                </tr>
                <tr>
                  <th>Coupon</th>
                  <td>{{order.coupon === '' ? 'Không' : order.coupon}}</td>
                </tr>
                <tr style="background-color: darkgrey">
                  <th>Total</th>
                  <td>{{order.total | formatCurrency(order.currency)}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-6">
              <table class="table-bordered table">
                <tr>
                  <th>Note</th>
                  <td>{{order.note === '' ? 'Không' : order.note }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  import axios from "axios";
  import store from "../../store";
  import authHeader from "../../services/auth-header";
  export default {
    name: "OrderDetailComponent",
    data(){
      return {
        orderDetails:[],
      }
    },
    created() {
      if(GlobalService.filterApi("UPDATE_ORDER")){
        this.getOrderDetail(this.$route.params.id);
      }
    },
    methods:{
      getOrderDetail(id){
        this.$store.dispatch("order/findOne",id);
        this.$store.dispatch("order/findOrderStatus");
      },
      editStatus(){
        this.$store.dispatch("order/update",{id:this.$route.params.id,orderStatus:this.order.orderStatus.id}).then(response=>{
          console.log(response)
        }).catch(error =>{
          console.log(error);
        });
      }
    },
    computed:{
      ...mapGetters({
        order: "order/one",
        orderStatus: "order/orderStatus",
      }),
    }
  }
</script>

<style scoped>

</style>
