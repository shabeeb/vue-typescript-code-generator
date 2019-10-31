<template>
  <v-app>
    <Header />
    <v-content>
      <div style="padding:100px">
        <router-view />
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';

@Component({
  components: {
    HelloWorld
    // Header
  }
})
// App goes here
export default class App extends Vue {}
</script>
