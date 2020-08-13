import Vue from 'vue'
import Router from 'vue-router'
import AdminComponent from "../components/AdminComponent";
import MainComponent from "../components/MainComponent";
import BrandComponent from "../modules/brand/BrandComponent";
import LoginComponent from "../components/LoginComponent";
import CategoryComponent from "../modules/category/CategoryComponent";
import PermissionComponent from "../modules/permission/PermissionComponent";
import RoleComponent from "../modules/role/RoleComponent";
import ProductComponent from "../modules/product/ProductComponent";
import ProductAddComponent from "../modules/product/ProductAddComponent";
import ProductEditComponent from "../modules/product/ProductEditComponent";
import CouponComponent from "../modules/coupon/CouponComponent";
import CouponDeliverComponent from "../modules/coupon/CouponDeliverComponent";
import GlobalService from "../services/global.service";
import ShippingComponent from "../modules/shipping/ShippingComponent";
import PaymentComponent from "../modules/payment/PaymentComponent";
import OrderStatusComponent from "../modules/order_status/OrderStatusComponent";
import CurrencyComponent from "../modules/currency/CurrencyComponent";
import ReviewComponent from "../modules/review/ReviewComponent";
import OrderComponent from "../modules/order/OrderComponent";
import OrderDetailComponent from "../modules/order/OrderDetailComponent";
import BannerComponent from "../modules/banner/BannerComponent";
import BlogComponent from "../modules/blog/BlogComponent";
Vue.use(Router)

export const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'is-active',
  routes: [
    {path: '/',redirect: {name:'dashboard'}},
    {path: '/admin',redirect: {name:'dashboard'}},
    {
      path: '/admin',
      name: 'admin',
      component: AdminComponent,
      children: [
        {path: 'dashboard',component:MainComponent,name: 'dashboard'},
        {path: 'blogs',component:BlogComponent,name: 'blogs'},
        {path: 'brands',component: BrandComponent,name: 'brands'},
        {path: 'banners',component: BannerComponent,name: 'banners'},
        {path: 'categories',component: CategoryComponent,name: 'category'},
        {path: 'permissions',component: PermissionComponent,name: 'permission'},
        {path: 'roles',component: RoleComponent,name: 'roles'},
        {path: 'products',component: ProductComponent,name: 'products'},
        {path: 'products/add',component: ProductAddComponent,name: 'proAdd'},
        {
          path: 'products/edit/:id',
          component: ProductEditComponent,
          name: 'proEdit',
          beforeEnter: (to, from, next) => {
            if(isNaN(parseInt(to.params.id))){
              router.go(-1)
            }else{
              next();
            }
          }
        },
        {path:'coupons',component:CouponComponent,name:'coupon'},
        {path:'currencies',component:CurrencyComponent,name:'currency'},
        {path:'reviews',component:ReviewComponent,name:'review'},
        {
          path:'coupons/deliver',
          component:CouponDeliverComponent,
          name:'coupon_deliver',
          beforeEnter:(to,from,next) =>{
            if(GlobalService.filterApi("CREATE_COUPON")){
              next();
            }else{
              return false;
            }
          }
        },
        {path:'shippings',component:ShippingComponent,name:'shipping'},
        {path:'payments',component:PaymentComponent,name:'payment'},
        {path:'order_status',component:OrderStatusComponent,name:'orderStatus'},
        {path:'orders',component:OrderComponent,name:'order'},
        {
          path:'orders/edit/:id',
          component:OrderDetailComponent,
          name:'orderDetail',
          beforeEnter: (to, from, next) => {
            if(isNaN(parseInt(to.params.id))){
              router.go(-1)
            }else{
              next();
            }
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginComponent,
    },
  ]
});
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
