<template>
  <div>
      111
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
export default {
    name:"editDetail",
    setup(props,{root}){
        let id = root.$route.params.id ||root.$store.getters["editDetail/infoId"];
        let title = root.$route.params.title || root.$store.getters["editDetail/infoTitle"];
        
        console.log(id,title);
    }
}
</script>

<style>

</style>