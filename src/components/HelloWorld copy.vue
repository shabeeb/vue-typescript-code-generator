<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="title" placeholder="Component Name" />
    <textarea name="jsonvalue" v-model="jsonvalue" rows="15" cols="200"></textarea>
    <button color="success" class="mr-4" @click="addAuthor">get</button>

    <div>
      <div>component</div>
      <div>{{componentFile}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { componentGen } from '../helpers';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private jsonvalue: string = '';
  private title: string = '';
  private componentFile: string = '';

  private addAuthor() {
    console.log('jsonvalue', this.jsonvalue);
    const parseJson = JSON.parse(this.jsonvalue);
    console.log('parseJson', parseJson);
    console.log('title', this.title);
    this.componentFile = componentGen(this.title, parseJson);
    // console.log('first', this.firstName);
    // const author = {
    //   first_name: this.jsonvalue,
    //   middle_name: this.middleName,
    //   last_name: this.lastName
    // };
    // console.log('author', author);
    // this.$store.dispatch('AuthorModule/addAuthor', author);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
