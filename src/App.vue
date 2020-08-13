<template>
  <div id="app">
    <body
      :class="{'login-page':!this.$store.state.auth.status.loggedIn,'sidebar-mini layout-fixed':this.$store.state.auth.status.loggedIn}">
    <router-view/>
    </body>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  @import "assets/plugins/fontawesome-free/css/all.min.css";
  @import "https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css";
  @import "assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
  @import "assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
  @import "assets/plugins/jqvmap/jqvmap.min.css";
  @import "assets/dist/css/adminlte.min.css";
  @import "assets/plugins/overlayScrollbars/css/OverlayScrollbars.min.css";
  @import "assets/plugins/daterangepicker/daterangepicker.css";
  @import "assets/plugins/summernote/summernote-bs4.css";
  @import "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700";
  @import "assets/style.css";
  @import "https://cdn.jsdelivr.net/gh/gitbrent/bootstrap4-toggle@3.6.1/css/bootstrap4-toggle.min.css";
</style>

