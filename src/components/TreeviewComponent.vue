<template>
  <div>
    <div v-for="child in children">
      <div class="row">
        <div class="col-8">
          <h3 @click="toggle(child.label)" style="cursor: pointer"><i :class="child.children.length===0 ? 'fa fa-ban': 'fa fa-arrow-alt-circle-right'"></i> {{ child.label }}
          </h3>
        </div>
        <div class="col-4">
          <a class="btn btn-danger float-right" @click="remove(child.id)"><span><i class="fa fa-trash"></i> </span></a>
          <a class="btn btn-warning float-right" @click="update(child.id)"><span><i class="fa fa-pen"></i> </span></a>
          <a class="btn btn-primary float-right" @click="view(child.id)"><span><i class="fa fa-eye"></i> </span></a>
        </div>
      </div>
      <div v-show="false" :id="child.label">
        <TreeviewComponent :bus="bus" :children="child.children" style="margin-left: 30px"></TreeviewComponent>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TreeviewComponent",
      props: {
        children: Array,
        bus:Object
      },
      data: function() {
        return {

        };
      },
      computed: {

      },
      methods: {
        view: function(id) {
          this.bus.$emit('view', id);
        },
        update: function(id) {
          this.bus.$emit('update', id);
        },
        remove: function(id) {
          this.bus.$emit('delete', id);
        },
        toggle: function(idname) {
          if(document.getElementById(idname).style.display=="none"){
            this.isOpen = true;
            document.getElementById(idname).style.display="inline"
          }else{
            this.isOpen = false;
            document.getElementById(idname).style.display = "none";
          }
        },
      }
    }
</script>

<style scoped>
</style>
