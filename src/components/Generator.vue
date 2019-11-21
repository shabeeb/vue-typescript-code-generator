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
      <v-alert type="error" v-if="wrongJson">Looks like not a valid JSON, Please check again</v-alert>
      <v-row>
        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="title"
            :counter="10"
            label="Component Name"
            required
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            v-model="endURL"
            :counter="10"
            label="End URL"
            required
            :rules="[rules.required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-textarea
            solo
            name="input-7-1"
            label="Paste your JSON structure to generate vue component / store"
            hint="JSON value "
            v-model="jsonvalue"
            :rules="[rules.required]"
            required
          ></v-textarea>
        </v-col>

        <v-btn :disabled="!valid" color="success" class="mr-4" @click="addAuthor">Generate Code</v-btn>
      </v-row>
    </v-container>
    <v-container v-if="showCode">
      <v-row>
        <v-card-text v-if="showCode">Click to copy code / file names</v-card-text>
        <v-col cols="12" md="6">
          <v-card class="mx-auto fixed-height" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Code Snippets</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle class="pb-0">In router</v-card-subtitle>
            <div>
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(routerSnippetCode)">
                  {{ routerSnippetCode }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card class="mx-auto fixed-height" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Code Snippets</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-subtitle class="pb-0">In Store/index.ts import code</v-card-subtitle>
            <div>
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(storeImportSnippet)">
                  {{ storeImportSnippet }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </div>

            <v-card-subtitle
              class="pb-0"
            >In Store/index.ts inside module add below code to access module</v-card-subtitle>

            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <code @click="docopy(moduleNameSnippet)">
                {{ moduleNameSnippet }}
                <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
              </code>
            </v-hover>
            <v-card-subtitle
              class="pb-0"
            >In config/urlList.ts inside module add below code to access module</v-card-subtitle>
            <div>
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(configURLSnippet)">
                  {{ configURLSnippet }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </div>

            <v-card-subtitle class="pb-0">Folder names to copy</v-card-subtitle>
            <div>
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(capitalizeTitle)">
                  {{ capitalizeTitle }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </div>

            <v-card-subtitle class="pb-0">locales/en.ts</v-card-subtitle>
            <div>
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(messageSnippetCode)">
                  {{ messageSnippetCode }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
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
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`${capitalizeTitle}.vue`)">
                views/{{ capitalizeTitle }}.vue
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <div>
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(vuePageComponent)">
                  {{ vuePageComponent }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Add Component</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`Add${capitalizeTitle}.vue`)">
                component/{{ capitalizeTitle }}/Add{{ capitalizeTitle }}.vue
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(addEditComponentFile)">
                  {{ addEditComponentFile }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Component / List Page</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`List${capitalizeTitle}.vue`)">
                component/{{ capitalizeTitle }}/List{{ capitalizeTitle }}.vue
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(listComponentVueList)">
                  {{ listComponentVueList }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
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
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`types.ts`)">
                store/modules/{{ capitalizeTitle }}/types.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <code @click="docopy(componentTypeList)">
                {{ componentTypeList }}
                <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
              </code>
            </v-hover>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Action</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`actions.ts`)">
                store/modules/{{ capitalizeTitle }}/actions.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(componentActionsList)">
                  {{ componentActionsList }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Mutations</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`mutations.ts`)">
                store/modules/{{ capitalizeTitle }}/mutations.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(componentMutationList)">
                  {{ componentMutationList }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Getters</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>

            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`getters.ts`)">
                store/modules/{{ capitalizeTitle }}/getters.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(componentGettsList)">
                  {{ componentGettsList }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Store / Index</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`index.ts`)">
                store/modules/{{ capitalizeTitle }}/index.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(componentIndexList)">
                  {{ componentIndexList }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>services / component</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`${capitalizeTitle}Service.ts`)">
                services/{{ capitalizeTitle }}/Service.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(serviceComponent)">
                  {{ serviceComponent }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>services / component</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`${capitalizeTitle}Model.ts`)">
                models/{{ capitalizeTitle }}Model.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(componentModalsGen)">
                  {{ componentModalsGen }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">Test Cases</v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Test / Vue Page</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle class="pb-0 pointer" @click="docopy(`${capitalizeTitle}.spec.ts`)">
                tests/unit/views/{{ capitalizeTitle }}.spec.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(vueTestFile)">
                  {{ vueTestFile }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Test / Add Component</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle
                class="pb-0 pointer"
                @click="docopy(`Add${capitalizeTitle}.spec.ts`)"
              >
                tests/unit/component/{{ capitalizeTitle }}/Add{{
                capitalizeTitle
                }}.spec.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <code @click="docopy(addComponentTestFile)">
                {{ addComponentTestFile }}
                <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
              </code>
            </v-hover>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto fixed-height" max-width="600" v-if="showCode">
            <v-toolbar color="gray accent-4" dark>
              <v-toolbar-title>Test / List Component</v-toolbar-title>

              <v-spacer></v-spacer>
            </v-toolbar>
            <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
              <v-card-subtitle
                class="pb-0 pointer"
                @click="docopy(`List${capitalizeTitle}.spec.ts`)"
              >
                tests/unit/component/List{{ capitalizeTitle }}.spec.ts
                <v-icon right v-show="hover">mdi-content-copy</v-icon>
              </v-card-subtitle>
            </v-hover>
            <v-card-text class="text--primary">
              <!-- <div>Whitehaven Beach</div> -->

              <v-hover v-slot:default="{ hover }" open-delay="0" close-delay="0">
                <code @click="docopy(listComponentTestFile)">
                  {{ listComponentTestFile }}
                  <v-icon right class="copystyle" v-show="hover">mdi-content-copy</v-icon>
                </code>
              </v-hover>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  addEditComponent,
  componentTypes,
  componentActions,
  componentMutation,
  componentGetters,
  componentStoreIndex,
  vuePage,
  listComponent,
  routerSnippet,
  storeImportSnippet,
  storeModuleNameSnippet,
  configURLSnippet,
  vueTestGen,
  TestAddComponentGen,
  TestListComponent,
  messageSnippet,
  service,
  componentModals
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
      "name": "asf",
      "description": "sad",
      "completed": "s",
      "id": "4423392"
    }`;
  private wrongJson: boolean = false;
  // {
  //   "created": "2019-10-10T05:59:56.999852",
  //   "first_name": "author1 ",
  //   "id": 1,
  //   "last_name": "last",
  //   "middle_name": "",
  //   "modified": "2019-10-10T05:59:56.999881"
  // }

  private title: string = 'todo';
  private endURL: string = 'todo';
  private addEditComponentFile: string = '';
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
  private configURLSnippet: string = '';
  private vueTestFile: string = '';
  private addComponentTestFile: string = '';
  private listComponentTestFile: string = '';
  private messageSnippetCode: string = '';
  private serviceComponent: string = '';
  private componentModalsGen: string = '';

  private rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= len || `Invalid character length, required ${len}`,

    required: (v: any) => !!v || 'This field is required'
  };

  public addAuthor() {
    this.capitalizeTitle = capitalize(this.title);
    if (this.IsJsonString(this.jsonvalue)) {
      const parseJson = JSON.parse(this.jsonvalue);
      // components code
      this.addEditComponentFile = addEditComponent(this.title, parseJson);
      this.componentTypeList = componentTypes(this.title, parseJson);
      this.componentActionsList = componentActions(this.title, parseJson);
      this.componentMutationList = componentMutation(this.title, parseJson);
      this.componentGettsList = componentGetters(this.title, parseJson);
      this.componentIndexList = componentStoreIndex(this.title, parseJson);
      // vue page
      this.vuePageComponent = vuePage(this.title);
      this.listComponentVueList = listComponent(this.title, parseJson);

      // code snippets
      this.routerSnippetCode = routerSnippet(this.title);
      this.moduleNameSnippet = storeModuleNameSnippet(this.title);
      this.storeImportSnippet = storeImportSnippet(this.title);
      this.configURLSnippet = configURLSnippet(this.title, this.endURL);

      // test snippets
      this.vueTestFile = vueTestGen(this.title);
      this.addComponentTestFile = TestAddComponentGen(this.title);
      this.listComponentTestFile = TestListComponent(this.title, parseJson);

      this.messageSnippetCode = messageSnippet(this.title);
      this.serviceComponent = service(this.title);
      this.componentModalsGen = componentModals(this.title, parseJson);

      this.showCode = true;
      this.wrongJson = false;
    } else {
      this.wrongJson = true;
      this.showCode = false;
    }
  }

  public docopy(message: any) {
    this.$copyText(message);
    this.snackbar = true;
    // alert('copied');
  }
  public IsJsonString(data: any) {
    try {
      const json = JSON.parse(data);
      return typeof json === 'object';
    } catch (e) {
      return false;
    }
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
  position: relative;
}
.fixed-height {
  height: 400px;
  overflow: auto;
}
.pointer {
  cursor: pointer;
}
.copystyle {
  position: absolute;
  right: 0;
  top: 0px;
}
</style>
