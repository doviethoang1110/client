<template>
  <div class="wrapper">
    <nav-bar-component></nav-bar-component>
    <aside-component></aside-component>
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>

    import NavBarComponent from "./NavbarComponent";
    import AsideComponent from "./AsideComponent";
    import FooterComponent from "./FooterComponent";
    import MainComponent from "./MainComponent";
    export default {
        name: "Admin",
      components: { FooterComponent, AsideComponent, NavBarComponent},
    }
</script>

<style scoped>

</style>
