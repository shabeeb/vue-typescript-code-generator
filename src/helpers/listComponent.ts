import { capitalize } from './common';
const listComponent = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `

  /**
   * ListViewComponent Page
   */
  
  <template>
    <v-card class="mx-auto">
      <v-toolbar flat>
        <v-toolbar-title class="grey--text">All ${capitalizeTitle}</v-toolbar-title>
        <div class="flex-grow-1"></div>
      </v-toolbar>
      <v-divider></v-divider>
      <!-- <v-alert type="success" v-if="successStatus">Author Added succesfully</v-alert>
      <v-alert type="error" v-if="errorStatus">Something went wrong...</v-alert>-->
  
      <v-card-text>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
              <tr>
                ${tableHead(fieldNames)}
              </tr>
            </thead>
            <!-- {{books}} -->
            <tbody>
            ${tableBody(fieldNames, capitalizeTitle)}
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </template>
  <script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Getter, namespace, Action } from 'vuex-class';
  const ${capitalizeTitle}Module = namespace('${capitalizeTitle}Module');
  
  @Component
  export default class AddListComponent extends Vue {
    @${capitalizeTitle}Module.Action('load${capitalizeTitle}') public load${capitalizeTitle}!: any;
    @${capitalizeTitle}Module.Getter('get${capitalizeTitle}List') public  get${capitalizeTitle}List!: [];
  
    private mounted() {
      this.load${capitalizeTitle}();
    }
  }
  </script>
 `;
  return newComponent;
};

const tableHead = (fileds: any) => {
  const excludeFieldList = ['created', 'modified', 'id'];

  let filedsList: string = '';
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      filedsList += `   <th class="text-left">${field}</th>`;
    }
  });

  return filedsList;
};

const tableBody = (fileds: any, capitalizeTitle: any) => {
  const excludeFieldList = ['created', 'modified', 'id'];

  let filedsList: string = `<tr v-for="${capitalizeTitle} in  get${capitalizeTitle}List" :key="${capitalizeTitle}.id">`;
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      filedsList += `   <td>{{ ${capitalizeTitle}.${field} }}</td>`;
    }
  });
  filedsList += ' </tr>';
  return filedsList;
};

export default listComponent;
