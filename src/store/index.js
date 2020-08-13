import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.module';
import {brand} from '../modules/brand/brands.module';
import {category} from '../modules/category/category.module';
import {permission} from "../modules/permission/permission.module";
import {role} from "../modules/role/roles.module";
import {product} from "../modules/product/product.module";
import {option} from "../modules/option/option.module";
import {option_value} from "../modules/option_value/option_value.module";
import {coupon} from "../modules/coupon/coupon.module";
import {ship} from "../modules/shipping/shipping.module";
import {payment} from "../modules/payment/payment.module";
import {status} from "../modules/order_status/order_status.module";
import {sku} from '../modules/sku/sku.module';
import {currency} from '../modules/currency/currency.module';
import {review} from '../modules/review/review.module';
import {order} from '../modules/order/order.module';
import {banner} from '../modules/banner/banner.module';
import {blog} from '../modules/blog/blog.module';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_URL: 'http://multikart.j.layershift.co.uk/api/v1',
    resources_url : 'http://multikart.j.layershift.co.uk/resources/images/',
    checkPermission: true,
    errors:[],
    inlineErr:"",
    success:"",
    message: ""
  },
  modules: {
    auth,
    brand,
    category,
    permission,
    role,
    product,
    option,
    option_value,
    coupon,
    ship,
    payment,
    status,
    sku,
    currency,
    review,
    order,
    banner,
    blog
  }
});
