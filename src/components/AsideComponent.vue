<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="@/assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="@/assets/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ currentUser.username }}</a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li class="nav-item" v-for="(m,index) in menus" :ref="index" :class="{'has-treeview':m.child}">
            <a class="nav-link" v-if="m.child">
              <i class="nav-icon" :class="m.icon"></i>
              <p>
                {{m.name}}
                <i class="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul class="nav nav-treeview" v-if="m.child">
              <li class="nav-item" v-for="n in m.child">
                <router-link :to="{name:n.route}" exact class="nav-link">
                  <i class="nav-icon" :class="n.icon"></i>
                  <p>{{n.name}}</p>
                </router-link>
              </li>
            </ul>
            <router-link :to="{name:m.route}" class="nav-link" exact v-if="!m.child">
              <i class="nav-icon" :class="m.icon"></i>
              <p>
                {{m.name}}
              </p>
            </router-link>
          </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
    export default {
        name: "AsideComponent",
        data(){
          return {
            menus:[
              {
                name:'Dashboard',
                route:'dashboard',
                icon:'fas fa-tachometer-alt'
              }
              ,{
                name:'Quản lý đơn hàng',
                icon:'fa fa-shopping-cart',
                child:[
                  {name:'Quản lý đơn hàng', route:'order', icon:'fa fa-shopping-cart'},
                  {name:'Trạng thái đơn hàng', route:'orderStatus', icon:'far fa-calendar-check'},
                  {name:'Quản lý thanh toán', route:'payment', icon:'fab fa-amazon-pay'},
                  {name:'Quản lý giao hàng', route:'shipping', icon:'fa fa-car'}
                ]
              },
              {
                name:'Quản lý sản phẩm',
                icon:'fa fa-shopping-bag',
                child:[
                  {name:'Quản lý danh mục', route:'category', icon:'fa fa-th-list'},
                  {name:'Quản lý sản phẩm', route:'products', icon:'fa fa-shopping-bag'},
                  {name:'Quản lý mã giảm giá', route:'coupon', icon:'fa fa-address-card'},
                  {name:'Quản lý nhãn hiệu', route:'brands', icon:'fas fa-th'},
                ]
              },
              {
                name:'Quản trị hệ thống',
                icon:'fas fa-user',
                child:[
                  {name:'Quản lý quyền', route:'permission', icon:'fas fa-user'},
                  {name:'Quản lý vai trò', route:'roles', icon:'fas fa-chart-pie'},
                  {name:'Quản lý tiền tệ', route:'currency', icon:'fa fa-dollar'},
                ]
              },
              {
                name:'Quản lý banner',
                route:'banners',
                icon:'far fa-images'
              },
              {
                name:'Quản lý bài viết',
                route:'blogs',
                icon:'fab fa-blogger'
              },
              {
                name:'Quản lý bình luận',
                route:'review',
                icon:'fa fa-notes-medical'
              },
            ]
          }
        },
        computed: {
          currentUser(){
            return this.$store.state.auth.user;
          }
        },
    }
</script>

<style scoped>

</style>
