import { capitalize, snakeToCamel, camelToSnake } from './common';
import { excludeFieldList } from './config';
const componentGen = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `
  /**
   * ${capitalizeTitle}
   */
 <template>
   <v-card class="mx-auto" style="max-width: 500px;">
     <!-- <v-system-bar color="deep-purple darken-4" dark>
       <v-spacer></v-spacer>
       <v-icon small>mdi-square</v-icon>
       <v-icon class="ml-1" small>mdi-circle</v-icon>
       <v-icon class="ml-1" small>mdi-triangle</v-icon>
     </v-system-bar>-->
     <v-alert type="success" v-if="successStatus">${capitalizeTitle} Added succesfully</v-alert>
     <v-alert type="error" v-if="errorStatus">Something went wrong...</v-alert>

     <v-toolbar color="deep-purple accent-4" cards dark flat>
     <!--   <v-btn icon>
         <v-icon>mdi-arrow-left</v-icon>
       </v-btn>-->
       <v-card-title class="title font-weight-regular">Add ${title}</v-card-title>
       <v-spacer></v-spacer>
       <!-- <v-btn icon>
         <v-icon>mdi-magnify</v-icon>
       </v-btn>
       <v-btn icon>
         <v-icon>mdi-dots-vertical</v-icon>
       </v-btn>-->
     </v-toolbar>
     <v-form ref="form" v-model="form" class="pa-4 pt-6">
       ${textFileds(fieldNames)}
     </v-form>
     <v-divider></v-divider>
     <v-card-actions>
       <v-btn text @click="$refs.form.reset()">Clear</v-btn>
       <v-spacer></v-spacer>
       <v-btn
         :disabled="!form"
         :loading="isLoading"
         class="white--text"
         color="deep-purple accent-4"
         depressed
         @click="add${capitalizeTitle}"
       >Submit</v-btn>
     </v-card-actions>
   </v-card>
 </template>
 <script lang="ts">
 import { Component, Vue } from 'vue-property-decorator';
 import { Getter, namespace, Action } from 'vuex-class';
 const ${capitalizeTitle}Module = namespace('${capitalizeTitle}Module');

 @Component
 export default class Add${capitalizeTitle} extends Vue {
   @${capitalizeTitle}Module.Getter('successStatus') public successStatus!: boolean;
   @${capitalizeTitle}Module.Getter('errorStatus') public errorStatus!: boolean;
   @${capitalizeTitle}Module.Action('add${capitalizeTitle}') public add${capitalizeTitle}Store!: any;
${componentVariables(fieldNames)}

private rules = {
    length: (len: any) => (v: any) =>
      (v || '').length >= len || 'Invalid character length, required' + len,

    required: (v: any) => !!v || 'This field is required'
  };
   private add${capitalizeTitle}() {

    ${addMethod(fieldNames)}


     this.add${capitalizeTitle}Store(data);
     (this.$refs.form as HTMLFormElement).reset();
   }
 
 }
 </script>
 `;
  return newComponent;
};

const textFileds = (fileds: any) => {
  //   const excludeFieldList = ['created', 'modified', 'id'];

  let filedsList: string = '';
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      filedsList += `  <v-text-field
                    v-model="${snakeToCamel(field)}"
                    filled
                    color="deep-purple"
                    counter="10"
                    label="${field}"
                    style="min-height: 96px"
                    type="text"
                    :rules="[rules.required]"
                ></v-text-field>`;
    }
  });

  return filedsList;
};

const componentVariables = (fileds: any) => {
  let variableList: string = `  public form: boolean = false;
  private isLoading: boolean = false;`;

  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      variableList += ` private ${snakeToCamel(field)}: string = '';
    `;
    }
  });

  return variableList;
};

const addMethod = (fileds: any) => {
  let variableList: string = 'const data = {';
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      variableList += ` ${field}: this.${snakeToCamel(field)},
      `;
    }
  });
  variableList += '}';

  return variableList;
};

export default componentGen;
