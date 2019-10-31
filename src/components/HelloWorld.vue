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
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
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
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mx-auto fixed-height" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Code Snippets</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle class="pb-0">
              In router
              <!-- <button
                type="button"
                v-clipboard:copy="`Add${title}.vue`"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                <span class="mdi mdi-content-copy"></span>
              </button>-->
            </v-card-subtitle>
            <div>
              <code @click="docopy(routerSnippetCode)">{{routerSnippetCode}}</code>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mx-auto fixed-height" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Code Snippets</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle class="pb-0">
              In Store/index.ts
              import code
            </v-card-subtitle>
            <div>
              <code @click="docopy(storeImportSnippet)">{{storeImportSnippet}}</code>
            </div>

            <v-card-subtitle class="pb-0">
              In Store/index.ts
              inside module add below code to access module
            </v-card-subtitle>
            <div>
              <code @click="docopy(moduleNameSnippet)">{{moduleNameSnippet}}</code>
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Vue Page</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle class="pb-0 pointer" @click="docopy(`${capitalizeTitle}.vue`)">
              views/{{capitalizeTitle}}.vue
              <!-- <button
                type="button"
                v-clipboard:copy="`Add${title}.vue`"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                <span class="mdi mdi-content-copy"></span>
              </button>-->
            </v-card-subtitle>
            <div>
              <code @click="docopy(vuePageComponent)">{{vuePageComponent}}</code>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Add Component</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`${capitalizeTitle}Component.vue`)"
            >component/{{capitalizeTitle}}Component/{{capitalizeTitle}}Component.vue</v-card-subtitle>

            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <div>
                <code @click="docopy(componentFile)">{{componentFile}}</code>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Component / List Page</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`List${capitalizeTitle}Component.vue`)"
            >component/{{capitalizeTitle}}Component/List{{capitalizeTitle}}Component.vue</v-card-subtitle>

            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <div>
                <code @click="docopy(listComponentVueList)">{{listComponentVueList}}</code>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / types</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`types.ts`)"
            >store/Modules/{{capitalizeTitle}}Module/types.ts</v-card-subtitle>
            <div>
              <code @click="docopy(componentTypeList)">{{componentTypeList}}</code>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Action</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`actions.ts`)"
            >store/Modules/{{capitalizeTitle}}Module/actions.ts</v-card-subtitle>

            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <div>
                <code @click="docopy(componentActionsList)">{{componentActionsList}}</code>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Mutations</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`mutations.ts`)"
            >store/Modules/{{capitalizeTitle}}Module/mutations.ts</v-card-subtitle>

            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <div>
                <code @click="docopy(componentMutationList)">{{componentMutationList}}</code>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Getters</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`getters.ts`)"
            >store/Modules/{{capitalizeTitle}}Module/getters.ts</v-card-subtitle>

            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <div>
                <code @click="docopy(componentGettsList)">{{componentGettsList}}</code>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Index</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle
              class="pb-0 pointer"
              @click="docopy(`index.ts`)"
            >store/Modules/{{capitalizeTitle}}Module/index.ts</v-card-subtitle>

            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <div>
                <code @click="docopy(componentIndexList)">{{componentIndexList}}</code>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- <v-row>
        <v-col cols="12" md="6">
      <v-card class="mx-auto" max-width="900" v-if="showCode">-->
      <!-- <v-card-title>Store</v-card-title>

            <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/types.ts</v-card-subtitle>

            <v-card-text class="text--primary">
              

              <div>
                <button
                  type="button"
                  v-clipboard:copy="componentTypeList"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <span class="mdi mdi-content-copy"></span>
                </button>
                <code @click="docopy(componentTypeList)">{{componentTypeList}}</code>
              </div>
              <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/actions.ts</v-card-subtitle>
              <div>
                <button
                  type="button"
                  v-clipboard:copy="componentActionsList"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                >
                  <span class="mdi mdi-content-copy"></span>
                </button>
                <code @click="docopy(componentActionsList)">{{componentActionsList}}</code>
      </div>-->
      <!-- <v-card-text class="text--primary"> -->
      <!-- <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/mutations.ts</v-card-subtitle>
              <div>
                <code @click="docopy(componentMutationList)">{{componentMutationList}}</code>
      </div>-->

      <!-- <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/getters.ts</v-card-subtitle>
              <div>
                <code @click="docopy(componentGettsList)">{{componentGettsList}}</code>
      </div>-->
      <!-- <v-card-subtitle class="pb-0">store/Modules/{{title}}Module/index.ts</v-card-subtitle>
              <div>
                <code @click="docopy(componentIndexList)">{{componentIndexList}}</code>
      </div>-->
      <!-- </v-card-text> -->
      <!-- 
          <v-card-actions>
            <v-btn color="orange" text>Share</v-btn>

            <v-btn color="orange" text>Explore</v-btn>
      </v-card-actions>-->
      <!-- </v-card> -->
      <!-- <v-card class="mx-auto" max-width="400" v-if="showCode">
            <v-card-title>List page</v-card-title>

            <v-card-subtitle class="pb-0">Component/List{{capitalizeTitle}}Component.vue</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>
                <code @click="docopy(listComponentVueList)">{{listComponentVueList}}</code>
              </div>
            </v-card-text>
      </v-card>-->
      <!-- </v-col>
      </v-row>-->
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
  vuePage,
  listComponent,
  routerSnippet,
  storeImportSnippet,
  storeModuleNameSnippet
} from '../helpers';
import { capitalize } from '../helpers/common';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  private valid: boolean = false;
  private snackbar: boolean = false;
  private text: string = 'Copied';
  private timeout: number = 2000;
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
  private vuePageComponent: string = '';
  private capitalizeTitle: string = '';
  private listComponentVueList: string = '';
  private routerSnippetCode: string = '';
  private showCode: boolean = false;
  private moduleNameSnippet: string = '';
  private storeImportSnippet: string = '';

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
    this.vuePageComponent = vuePage(this.title, parseJson);
    this.listComponentVueList = listComponent(this.title, parseJson);

    //code snippets
    this.routerSnippetCode = routerSnippet(this.title);
    this.moduleNameSnippet = storeModuleNameSnippet(this.title);
    this.storeImportSnippet = storeImportSnippet(this.title);
    this.showCode = true;
  }

  public onCopy() {
    // alert('copied');
  }
  public onError() {
    alert('not copied');
  }
  public docopy(message: any) {
    this.$copyText(message);
    this.snackbar = true;
    // alert('copied');
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
  width: 96%;
  cursor: pointer;
  margin: 10px;
  padding: 0px 15px;
}
.fixed-height {
  height: 400px;
  overflow: auto;
}
.pointer {
  cursor: pointer;
}
</style>
