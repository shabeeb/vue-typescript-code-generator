<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <Generator />
  </div>
</template>

<script>
// @ is an alias to /src
import Generator from '@/components/Generator.vue';

export default {
  name: 'home',
  components: {
    Generator
  }
};
</script>
