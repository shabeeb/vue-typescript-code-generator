<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="title" placeholder="Component Name" />
    <textarea name="jsonvalue" v-model="jsonvalue" rows="15" cols="200"></textarea>
    <button color="success" class="mr-4" @click="addAuthor">get</button>

    <div>
      <div>component</div>
      <div>{{componentFile}}</div>
    </div>
  </div>-->
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="title" :counter="10" label="Component Name" required></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            solo
            name="input-7-1"
            label="Default style"
            hint="Hint text"
            v-model="jsonvalue"
          ></v-textarea>
        </v-col>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addAuthor">Generate Code</v-btn>
        <!-- <v-col cols="12" md="4">
          <v-text-field v-model="lastname" :counter="10" label="Last name" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-col>-->

        <v-card class="mx-auto" max-width="600" v-if="showCode">
          <v-card-title>Component</v-card-title>

          <v-card-subtitle class="pb-0">views/Add{{title}}.vue</v-card-subtitle>
          <div>
            <code>{{addComponentVueList}}</code>
          </div>
          <v-card-subtitle
            class="pb-0"
          >component/{{capitalizeTitle}}Component/{{capitalizeTitle}}Component.vue</v-card-subtitle>

          <v-card-text class="text--primary">
            <!-- <div>Whitehaven Beach</div> -->

            <div>
              <code>{{componentFile}}</code>
            </div>
          </v-card-text>
          <!-- 
          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>-->
        </v-card>

        <v-card class="mx-auto" max-width="900" v-if="showCode">
          <v-card-title>Store</v-card-title>

          <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/types.ts</v-card-subtitle>

          <v-card-text class="text--primary">
            <!-- <div>Whitehaven Beach</div> -->

            <div>
              <code>{{componentTypeList}}</code>
            </div>
            <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/actions.ts</v-card-subtitle>
            <div>
              <code>{{componentActionsList}}</code>
            </div>

            <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/mutations.ts</v-card-subtitle>
            <div>
              <code>{{componentMutationList}}</code>
            </div>

            <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/getters.ts</v-card-subtitle>
            <div>
              <code>{{componentGettsList}}</code>
            </div>
            <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/index.ts</v-card-subtitle>
            <div>
              <code>{{componentIndexList}}</code>
            </div>
          </v-card-text>
          <!-- 
          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
          </v-card-actions>-->
        </v-card>
        <v-card class="mx-auto" max-width="400" v-if="showCode">
          <v-card-title>List page</v-card-title>

          <v-card-subtitle class="pb-0">Component/List{{capitalizeTitle}}Component.vue</v-card-subtitle>

          <v-card-text class="text--primary">
            <div>
              <code>{{listComponentVueList}}</code>
            </div>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  componentGen,
  componentTypes,
  componentActions,
  componentMutation,
  componentGetters,
  componentStoreIndex,
  addComponentVue,
  listComponent
} from '../helpers';
import { capitalize } from '../helpers/common';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private valid: boolean = false;
  private jsonvalue: string = `{
    "created": "2019-10-10T05:59:56.999852",
    "first_name": "author1 ",
    "id": 1,
    "last_name": "last",
    "middle_name": "",
    "modified": "2019-10-10T05:59:56.999881"
  }`;
  private title: string = 'Author';
  private componentFile: string = '';
  private componentTypeList: string = '';
  private componentActionsList: string = '';
  private componentMutationList: string = '';
  private componentGettsList: string = '';
  private componentIndexList: string = '';
  private addComponentVueList: string = '';
  private capitalizeTitle: string = '';
  private listComponentVueList: string = '';
  private showCode: boolean = false;

  public addAuthor() {
    this.capitalizeTitle = capitalize(this.title);
    const parseJson = JSON.parse(this.jsonvalue);
    this.componentFile = componentGen(this.title, parseJson);
    this.componentTypeList = componentTypes(this.title, parseJson);
    this.componentActionsList = componentActions(this.title, parseJson);
    this.componentMutationList = componentMutation(this.title, parseJson);
    this.componentGettsList = componentGetters(this.title, parseJson);
    this.componentIndexList = componentStoreIndex(this.title, parseJson);
    //vue page
    this.addComponentVueList = addComponentVue(this.title, parseJson);
    this.listComponentVueList = listComponent(this.title, parseJson);
    this.showCode = true;
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
code {
  width: 100%;
}
</style>
