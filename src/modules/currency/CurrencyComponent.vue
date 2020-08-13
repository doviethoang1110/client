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
              <div class="card-body table-responsive p-0">
                <table class="table table-bordered">
                  <thead>
                  <tr>
                    <th>Stt</th>
                    <th>Tên</th>
                    <th>Mã</th>
                    <th>Tỷ lệ</th>
                    <th>Action</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(s,index) in currencies">
                    <td>{{index+1}}</td>
                    <td>{{s.name}}</td>
                    <td>{{s.code}}</td>
                    <td>1 x {{s.code}} = {{s.rate*1000}} VND</td>
                    <td>
                      <a @click.prevent="edit(s.id)" class="btn btn-outline-warning"><i class="fa fa-pen"></i></a>
                      <a class="btn btn-outline-danger"><i class="fa fa-trash"></i></a>
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
                    <label for="name">Tên</label>
                    <input type="text"
                           v-model="currency.name" class="form-control" name="name" id="name"
                           placeholder="Nhập tên"
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
                    <label for="name">Mã</label>
                    <input type="text"
                           v-model="currency.code" class="form-control" name="code" id="code"
                           placeholder="Nhập mã" @input="currency.code=$event.target.value.toUpperCase()"
                           v-validate="'required'"
                    >
                    <div
                      v-if="errors.has('code')"
                      class="text-danger"
                      role="alert"
                    >Mã không được rỗng
                    </div>
                  </div>
                  <div class="form-group">
                    <label for="rate">Tỷ lệ</label>
                    <input type="number"
                           v-model="currency.rate" class="form-control" name="rate" id="rate"
                           placeholder="Nhập tỷ lệ"
                           v-validate="'required'"
                    >
                    <div
                      v-if="errors.has('rate')"
                      class="text-danger"
                      role="alert"
                    >Tỷ lệ phải lớn hơn 0
                    </div>
                  </div>
                  <span class="text-danger" v-if="error">{{error}}</span>
                </div>
                <!-- /.card-body -->
                <div class="card-footer">
                  <button type="submit" class="btn btn-primary">Submit</button>
                </div>
                <span id="error" class="text-danger"></span>
              </form>
            </div>
          </b-modal>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import store from "../../store";
    import {Currency} from "./currency";
    import axios from "axios";
    import authHeader from "../../services/auth-header";
    import {Shipping} from "../shipping/shipping";
    export default {
      name: "CurrencyComponent",
      data() {
        return {
          isCreated: true,
          currency: new Currency(null, "", "", 1)
        }
      },
      created() {
        this.getCurrencies();
      },
      methods:{
        getCurrencies(){
          this.$store.dispatch("currency/findAll");
        },
        add(){
          this.isCreated = true;
          this.currency = new Currency(null,"","",1);
          this.$bvModal.show("modal");
        },
        createNew(){
          this.$validator.validateAll().then(isValid => {
            if (!isValid) {
              return;
            }else{
              if(this.currency.id==null){
                this.$store.dispatch('currency/add', this.currency).then(
                  response => {
                    this.$data.currency = new Currency(null,"","",1);
                    this.$swal(response.data);
                  },
                );
              }else{
                this.$store.dispatch('currency/update', this.currency).then(
                  response => {
                    this.$swal(response.data);
                  },
                );
              }
            }
          });
        },
        edit(id){
          this.isCreated = false;
          axios
            .get(store.state.API_URL+"/currencies/"+id,{headers:authHeader()})
            .then(response=>{
              this.currency = response.data;
            })
            .catch(error => {
              console.log(error);
            });
          this.$bvModal.show("modal");
        },
      },
      computed:{
        ...mapGetters({
          currencies: "currency/fetch",
          error: "currency/error"
        })
      }
    }
</script>

<style scoped>

</style>
