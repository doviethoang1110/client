<template>
  <select @change="change" v-model="value" class="form-control" :id="index" :name="'option'+index">
    <option :value="{option:op,value:v}" v-for="(v,index) in options">{{v}}</option>
  </select>
</template>

<script>
    export default {
      name: "SelectComponent",
      data(){
        return {
          value:{},
        }
      },
      props:{
        index:"",
        options:"",
        op:"",
      },
      methods:{
        change(){
          this.$emit('getValue',this.value);
        }
      },
    }
</script>

<style scoped>

</style>
