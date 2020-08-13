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
                  <table class="table table-bordered">
                    <thead>
                    <tr>
                      <th><a @click.prevent="multidelete(ids)" class="btn btn-danger"><i class="fa fa-trash-alt"></i></a></th>
                      <th>Stt</th>
                      <th>Tên</th>
                      <th>Email</th>
                      <th>Star</th>
                      <th>Content</th>
                      <th>Trạng thái</th>
                      <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(r,index) in reviews">
                      <td>
                        <div class="icheck-primary">
                          <input type="checkbox" v-model="ids" :value="r.id" :id="index">
                          <label :for="index"></label>
                        </div>
                      </td>
                      <td>{{index+1}}</td>
                      <td>{{r.name}}</td>
                      <td>{{r.email}}</td>
                      <td>
<!--                        {{r.rating}}-->
                        <i class="fa fa-star" :class="a<=r.rating ? 'checked' :''" aria-hidden="true" v-for="a of 5"></i>
                      </td>
                      <td>{{r.content}}</td>
                      <td>
                        <toggle-button @change="edit({id:r.id,status:r.status})" v-model="r.status" :labels="{checked:'Hiện',unchecked:'Ẩn'}" :height="30" :width="100"/>
                      </td>
                      <td>
                        <a @click.prevent="remove(r.id)" class="btn btn-outline-danger"><i class="fa fa-trash"></i></a>
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
  import store from "../../store";
  import GlobalService from "../../services/global.service";
  import {Shipping} from "../shipping/shipping";
  import axios from "axios";
  import authHeader from "../../services/auth-header";
  export default {
    name: "ReviewComponent",
    data(){
      return {
        permissions: ["READ_REVIEW","UPDATE_REVIEW","DELETE_REVIEW"],
        ids:[],
      }
    },
    created() {
      if(GlobalService.checkPermission(this.permissions)){
        this.getReviews();
      };
    },
    methods:{
      edit(review){
        if(GlobalService.filterApi("UPDATE_REVIEW")){
          this.$store.dispatch('review/update',review).then(response=>{
            this.$swal(response.data);
          });
        }else{
          this.$swal("Bạn không có quyền");
        }
      },
      paginate(page){
        this.$store.dispatch("review/findAll",parseInt(page-1));
      },
      getReviews(){
        this.$store.dispatch('review/findAll',0);
      },
      remove(id){
        if(GlobalService.filterApi("DELETE_REVIEW")){
          if(confirm("Bạn có chắc không ?")){
            this.$store.dispatch("review/delete",id).then(response=>{
              this.$swal(response.data);
            });
          }else{
            return false;
          }
        }else{
          this.$swal("Bạn không có quyền");
        }
      },
      multidelete(ids){
        if(ids.length!==0){
          if(GlobalService.filterApi("DELETE_REVIEW")){
            if(confirm("Bạn có chắc không ?")){
              this.$store.dispatch("review/multidelete",ids).then(response=>{
                this.$swal(response.data);
              });
            }else{
              return false;
            }
          }else{
            this.$swal("Bạn không có quyền");
          }
        }else{
          alert("Chọn ít nhất 1");
        }
      }
    },
    computed:{
      ...mapGetters({
        reviews: "review/fetch",
        totalPage:"review/totalPage"
      })
    }
  }
</script>

<style scoped>
  .checked{
    color: orange;
  }
</style>
