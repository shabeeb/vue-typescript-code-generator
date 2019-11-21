import { capitalize, snakeToLabel, camelTToLabel } from './common';
import { excludeFieldList } from './config';

const listComponent = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `

  /**
   * List${capitalizeTitle}  component
   */

  <template>
    <v-card class="mx-auto">

      <v-toolbar flat>
        <v-toolbar-title class="grey--text">All ${capitalizeTitle}</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-col class="col-lg-4 col-md-5 col-8">
          <v-alert type="success" v-if="successStatus" class="alert-top">
          {{get${capitalizeTitle}Message ? get${capitalizeTitle}Message : message }}
          </v-alert>
          <v-alert type="error" v-if="errorStatus" class="alert-top">Something went wrong...</v-alert>
        </v-col>
        <div class="flex-grow-1"></div>
        <v-btn class="mx-2" fab dark color="indigo" @click="$router.push('/${lowercaseTitle}/add/');">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      </v-toolbar>
      <v-divider></v-divider>


      <v-card-text v-if="get${capitalizeTitle}List.length == 0">No ${capitalizeTitle} found. Add one</v-card-text>
      <v-card-text v-if="get${capitalizeTitle}List.length != 0">
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                ${tableHead(fieldNames)}
              </tr>
            </thead>
            <tbody>
            ${tableBody(fieldNames, capitalizeTitle, lowercaseTitle)}
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </template>
  <script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Getter, namespace, Action } from 'vuex-class';
  import { ${upperCaseTitle}_UPDATE_MESSAGE } from '../../locales/en';
  const ${capitalizeTitle}Module = namespace('${capitalizeTitle}Module');

  @Component
  export default class List${capitalizeTitle} extends Vue {
    @${capitalizeTitle}Module.Getter('successStatus') public successStatus!: boolean;
    @${capitalizeTitle}Module.Getter('errorStatus') public errorStatus!: boolean;
    @${capitalizeTitle}Module.Action('load${capitalizeTitle}') public load${capitalizeTitle}!: any;
    @${capitalizeTitle}Module.Getter('get${capitalizeTitle}List') public  get${capitalizeTitle}List!: [];
    @${capitalizeTitle}Module.Action('loadSingle${capitalizeTitle}') public loadSingle${capitalizeTitle}!: any;
    @${capitalizeTitle}Module.Action('clearStatus') public clearStatus!: any;
    @${capitalizeTitle}Module.Action('remove${capitalizeTitle}') public remove${capitalizeTitle}!: any;
    @${capitalizeTitle}Module.Getter('get${capitalizeTitle}Message') public get${capitalizeTitle}Message!: any;


    private message: string = ${upperCaseTitle}_UPDATE_MESSAGE ;


    @Watch('successStatus')
  private onStatusChanged(val: any, oldVal: any) {
    setTimeout(this.clearStatus, 3000);
  }

  private remove(id: string) {
    const confrm = confirm('Are you sure to delete ?');
    if (confrm) {
      this.remove${capitalizeTitle}(id);
    }
  }
    private mounted() {
      this.load${capitalizeTitle}();
    }
  }
  </script>
  <style scoped>
  .alert-top {
    margin-top: 17px;
  }
  </style>
 `;
  return newComponent;
};

const tableHead = (fileds: any) => {
  // const excludeFieldList = ['created', 'modified', 'id'];

  let filedsList: string = '<th class="text-left">SI</th>';
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      filedsList += `
       <th class="text-left">${capitalize(
         snakeToLabel(camelTToLabel(field))
       )}</th>`;
    }
  });
  filedsList += ` <th>
  Actions
</th>`;
  return filedsList;
};

const tableBody = (fileds: any, capitalizeTitle: any, lowercaseTitle: any) => {
  // const excludeFieldList = ['created', 'modified', 'id'];

  let filedsList: string = `<tr v-for="(${lowercaseTitle} ,idx) in  get${capitalizeTitle}List" :key="${lowercaseTitle}.id">
  <td>{{ idx+1 }}</td>`;
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      filedsList += `
      <td>{{ ${lowercaseTitle}.${field} }}</td>`;
    }
  });
  filedsList += ` <td>
  <v-icon right @click="$router.push('/${lowercaseTitle}/edit/'+ ${lowercaseTitle}.id)">mdi-pencil</v-icon>
  <v-icon right @click="remove(${lowercaseTitle}.id)">mdi-delete</v-icon>
</td></tr>`;
  return filedsList;
};

export default listComponent;
