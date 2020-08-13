<template>
  <div id="my-container">
    <b-popover
      :target="target"
      triggers="click"
      :show.sync="popoverShow"
      placement="auto"
      container="my-container"
      ref="popover"
      @show="onShow"
    >
      <template v-slot:title>
        <b-button @click="onClose" class="close" aria-label="Close">
          <span class="d-inline-block" aria-hidden="true">&times;</span>
        </b-button>
        {{header}}
      </template>

      <div>
        <b-form-group
          :label="header"
          :label-for="target"
          label-cols="3"
          :state="state"
          class="mb-1"
          :invalid-feedback="header+' không được rỗng'"
        >
          <b-form-input @input="checkUp($event)"
            ref="input1"
            :id="target"
            v-model="input1"
            :state="state"
            size="sm"
          ></b-form-input>
        </b-form-group>

        <b-button @click="onClose" size="sm" variant="danger">Cancel</b-button>
        <b-button @click="onOk" size="sm" variant="primary">Ok</b-button>
        <span class="text-danger" v-if="inlineErr!=''">{{ inlineErr }}</span>
      </div>
    </b-popover>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  export default {
    props:{
      target:"",
      header:"",
      model:null,
      check:null
    },
    data() {
      return {
        input1: "",
        state: null,
        popoverShow: false
      }
    },
    watch: {
      input1(val) {
        if (val) {
          this.state = true
        }
      },
    },
    methods: {
      checkUp(e){
        if(this.check){
          this.input1 = e.toUpperCase();
        }
      },
      onClose() {
        this.popoverShow = false
      },
      onOk() {
        if (!this.input1) {
          this.state = false
        }
        if (this.input1) {
          if(this.input1===this.model){
            if(this.inlineErr==""){
              this.onClose()
            }
          }else{
            this.$emit('edit',this.input1);
          }
        }
      },
      onShow() {
        this.input1 = this.model;
        this.state = null
      },
    },
    computed:{
      ...mapGetters({
        inlineErr: 'permission/inlineErr'
      })
    }
  }
</script>
