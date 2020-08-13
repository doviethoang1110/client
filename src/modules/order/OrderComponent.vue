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
                <div class="card-body table-responsive p-0">
                  <table class="table table-hover">
                    <thead>
                    <tr>
                      <th>Id</th>
                      <th>Email</th>
                      <th>Total</th>
                      <th>Payment method</th>
                      <th>Currency</th>
                      <th>Trạng thái</th>
                      <th>Ngày đặt</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(o,index) in orders">
                      <td>{{o.id}}</td>
                      <td>{{o.email}}</td>
                      <td>{{o.total |formatCurrency(o.currency)}}</td>
                      <td>{{o.paymentMethod}}</td>
                      <td>{{o.currency}}/{{o.rate}}</td>
                      <td>
                        <div v-switch="o.orderStatus">
                          <span class="badge badge-primary" v-case="'New'">{{o.orderStatus}}</span>
                          <span class="badge badge-success" v-case="'Done'">{{o.orderStatus}}</span>
                          <span class="badge badge-warning" v-case="'Canceled'">{{o.orderStatus}}</span>
                          <span class="badge badge-info" v-case="'Processing'">{{o.orderStatus}}</span>
                        </div>
                      </td>
                      <td>{{o.created | formatDate}}</td>
                      <td>
                        <router-link :to="{name:'orderDetail',params:{id:o.id}}" class="btn btn-outline-warning"><i class="fa fa-pen"></i></router-link>
                        <a @click.prevent="remove(o.id,o.orderStatus)" class="btn btn-outline-danger"><i class="fa fa-trash"></i></a>
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import GlobalService from "../../services/global.service";
  export default {
    name: "OrderComponent",
    data(){
      return {
        permissions: ["CREATE_ORDER","READ_ORDER","UPDATE_ORDER","DELETE_ORDER"],

      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getOrders();
      };
    },
    methods:{
      paginate(page){
        this.$store.dispatch("order/findAll",parseInt(page-1));
      },
      getOrders(){
        this.$store.dispatch('order/findAll',0);
      },
      remove(id,status){
        if(confirm("Bạn có chắc không ?")){
          if(status!=='Canceled'){
            alert("Chỉ những đơn hàng đã hủy mới được xóa")
          }else{
            if(GlobalService.filterApi('DELETE_ORDER')){
              this.$store.dispatch("order/delete",id).then(
                response => {
                  this.$swal(response.data);
                },
              );
            }else{
              this.$swal("Bạn không có quyền");
            }
          }
        }else{
          return false;
        }
      }
    },
    computed:{
      ...mapGetters({
        orders: "order/fetch",
        totalPage: "order/totalPage"
      })
    }
  }
</script>

<style scoped>

</style>
