<template>
    <div class="login-box">
      <div class="login-logo">
        <a href="../../index2.html"><b>Admin</b>LTE</a>
      </div>
      <!-- /.login-logo -->
      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>

          <form action="#" method="post" @submit.prevent="handleLogin">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Email"
                     v-model="user.email"
                     v-validate="'required'"
                     name="email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div
              v-if="errors.has('email')"
              class="text-danger"
              role="alert"
            >Email không được rỗng
            </div>
            <div class="input-group mb-3">
              <input type="password" name="password" class="form-control" placeholder="Password"
                     v-model="user.password"
                     v-validate="'required'">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div
              v-if="errors.has('password')"
              class="text-danger"
              role="alert"
            >Password không được rỗng!</div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember">
                  <label for="remember">
                    Remember Me
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Sign In</span>
                </button>
              </div>
              <span class="text-danger">{{this.message}}</span>
              <!-- /.col -->
            </div>
          </form>
        </div>
        <!-- /.login-card-body -->
      </div>
    </div>
</template>

<script>
  import User from '../models/user';
  export default {
    name: 'app-login',
    data() {
      return {
        user: new User('', ''),
        loading: false,
        message: ''
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/admin/dashboard');
      }
    },
    methods: {
      handleLogin() {
        this.loading = true;
        this.$validator.validateAll().then(isValid => {
          if (!isValid) {
            this.loading = false;
            return;
          }
          if (this.user.email && this.user.password) {
            this.$store.dispatch('auth/login', this.user).then(
              () => {
                this.$router.push('/admin/dashboard');
              },
              error => {
                this.loading = false;
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                if(error.response.status==401){
                    this.message = "Tên hoặc mật khẩu không chính xác"
                }
              }
            );
          }
        });
      }
    }
  };
</script>

<style scoped>

</style>
