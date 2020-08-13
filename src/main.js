// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import VeeValidate from 'vee-validate'
import "./assets/plugins/jquery/jquery.min.js";
import store from './store';
import "./assets/dist/js/adminlte";
import "./assets/dist/js/pages/dashboard";
import "./assets/dist/js/demo";
import moment from 'moment';
import InputTag from 'vue-input-tag'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
Vue.use(VeeValidate);
import {Multiselect} from 'vue-multiselect';
Vue.use(Multiselect);
import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)
import Paginate from 'vuejs-paginate';
Vue.component('paginate', Paginate);
Vue.component('input-tag', InputTag);
import VueNumberInput from '@chenfengyuan/vue-number-input';
Vue.use(VueNumberInput);
import VueCountdownTimer from 'vuejs-countdown-timer'
Vue.use(VueCountdownTimer);
Vue.component('v-select', VueSelect.VueSelect);
Vue.config.productionTip = false;
Vue.filter('formatDate', function(value) {
  if (value) {
    return  moment(new Date(value)).format('DD/MM/YYYY-hh:mm a')
  }
});
Vue.filter('formatCurrency',function (value,currency) {
  return new Intl.NumberFormat('en-US', {style: 'currency', currency: currency}).format(parseFloat(value))
});
import VSwitch from 'v-switch-case'

Vue.use(VSwitch)
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {mapGetters} from 'vuex';
Vue.use(VueSweetalert2);
new Vue({
  el: '#app',
  router,
  store,
  data: {
    treeData: store.s
  },
  methods: {
    addItem: function(item) {
      item.children.push({
        name: "new stuff"
      });
    }
  },
  computed: {
    ...mapGetters({
      categories: 'categories/fetch'
    })
  },
  components: { App },
  template: '<App/>'
})
