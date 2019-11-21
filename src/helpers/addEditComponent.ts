import {
  capitalize,
  snakeToCamel,
  snakeToLabel,
  camelTToLabel
} from './common';
import { excludeFieldList } from './config';
const componentGen = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  // const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);

  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `
  /**
   * Add ${capitalizeTitle}
   */
 <template>
   <v-card class="mx-auto" style="max-width: 500px;">

     <!--  <v-alert type="success" v-if="successStatus">${capitalizeTitle} {{isEditmode ? 'Updated' : 'Added'}} succesfully</v-alert>
     <v-alert type="error" v-if="errorStatus">Something went wrong...</v-alert>-->

     <v-toolbar color="indigo accent-4" cards dark flat>
     <v-btn icon @click="$router.push('/${lowercaseTitle}/')">
     <v-icon>mdi-arrow-left</v-icon>
   </v-btn>
       <v-card-title class="title font-weight-regular">{{isEditmode ? 'Update' : 'Add'}} ${capitalizeTitle}</v-card-title>
       <v-spacer></v-spacer>

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
         color="indigo accent-4"
         depressed
         @click="add${capitalizeTitle}"
       >{{isEditmode ? 'Update' : 'Submit'}}</v-btn>
     </v-card-actions>
   </v-card>
 </template>
 <script lang="ts">
 import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
 import { Getter, namespace, Action } from 'vuex-class';
 const ${capitalizeTitle}Module = namespace('${capitalizeTitle}Module');

 @Component
 export default class Add${capitalizeTitle} extends Vue {
  @Prop({ default: '' })
  public id!: string;
  @Prop({ default: '' })
  public action!: string;


   @${capitalizeTitle}Module.Getter('successStatus') public successStatus!: boolean;
   @${capitalizeTitle}Module.Getter('errorStatus') public errorStatus!: boolean;
   @${capitalizeTitle}Module.Action('add${capitalizeTitle}') public add${capitalizeTitle}Store!: any;
   @${capitalizeTitle}Module.Getter('getSingle${capitalizeTitle}') public getSingle${capitalizeTitle}!: any;
   @${capitalizeTitle}Module.Action('update${capitalizeTitle}') public update${capitalizeTitle}Store!: any;
   @${capitalizeTitle}Module.Action('loadSingle${capitalizeTitle}') public loadSingle${capitalizeTitle}!: any;

${componentVariables(fieldNames)}

  // private id: string = '';
  private isEditmode: boolean = false;
  /* istanbul ignore next */
  private rules = {
      length: (len: any) => (v: any) =>
        (v || '').length >= len || 'Invalid character length, required' + len,
      required: (v: any) => !!v || 'This field is required'
    };

  @Watch('getSingle${capitalizeTitle}')
  private ongetSingle${capitalizeTitle}Changed(val: any) {
    this.updteEdit(val);
  }

   private add${capitalizeTitle}() {

    ${addMethod(fieldNames)}

    if (this.isEditmode) {
      data.id = this.id;
      this.update${capitalizeTitle}Store(data);
    } else {
      this.add${capitalizeTitle}Store(data);
    }
     (this.$refs.form as HTMLFormElement).reset();
     this.$router.push('/${lowercaseTitle}/');
   }

   private updteEdit(val: any) {
    ${watchMethod(fieldNames)}
  }

  private mounted() {
    this.isEditmode = false;
    if (this.action && (this.action === 'edit' && this.id !== '')) {
      this.isEditmode = true;
      this.loadSingleTodo(this.id);
    }
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
                    color="indigo"
                    counter="10"
                    label="${capitalize(snakeToLabel(camelTToLabel(field)))}"
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
  let variableList: string = 'const data:any = {';
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      variableList += ` ${field}: this.${snakeToCamel(field)},
      `;
    }
  });
  variableList += ` }`;

  return variableList;
};

const watchMethod = (fileds: any) => {
  let variableList: string = '';
  fileds.map((field: any) => {
    if (!excludeFieldList.includes(field)) {
      variableList += ` this.${snakeToCamel(field)}= val.${snakeToCamel(field)};
      `;
    }
  });
  variableList += ` this.id = val.id;
  this.isEditmode = true;`;

  return variableList;
};

export default componentGen;

// this.firstName = val.firstName;
//     this.lastName = val.lastName;
// this.middleName = val.middleName;
