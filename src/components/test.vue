<template>
  <v-card class="mx-auto" style="max-width: 500px;">
    <!-- <v-system-bar color="deep-purple darken-4" dark> <v-spacer></v-spacer> <v-icon small>mdi-square</v-icon> <v-icon class="ml-1" small>mdi-circle</v-icon> <v-icon class="ml-1" small>mdi-triangle</v-icon> </v-system-bar>-->
    <v-alert type="success" v-if="successStatus">Author Added succesfully</v-alert>
    <v-alert type="error" v-if="errorStatus">Something went wrong...</v-alert>
    <v-toolbar color="deep-purple accent-4" cards dark flat>
      <v-btn icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="title font-weight-regular">Add AddListComponent</v-card-title>
      <v-spacer></v-spacer>
      <!-- <v-btn icon> <v-icon>mdi-magnify</v-icon> </v-btn> <v-btn icon> <v-icon>mdi-dots-vertical</v-icon> </v-btn>-->
    </v-toolbar>
    <v-form ref="form" v-model="form" class="pa-4 pt-6">
      <v-text-field
        v-model="firstName"
        :rules="[ rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="first_name"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
      <!-- <v-text-field v-model="lastName" filled color="deep-purple" label="Last name"></v-text-field> -->
      <v-text-field
        v-model="middleName"
        filled
        color="deep-purple"
        counter="6"
        label="middle_name"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        :rules="[ rules.length(6)]"
        filled
        color="deep-purple"
        counter="6"
        label="Last name"
        style="min-height: 96px"
        type="text"
      ></v-text-field>
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
        @click="addAddList"
      >Submit</v-btn>
    </v-card-actions>
  </v-card>
</template> 
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter, namespace, Action } from 'vuex-class';
const AddListModule = namespace('AddListModule');
@Component export default class AddListComponent extends Vue {
     @AddListModule.Getter('successStatus') public successStatus!: boolean;
     @AddListModule.Getter('errorStatus') public errorStatus!: boolean;
      public form: boolean = false; private firstName: string = ''; private lastName: string = ''; private middleName: string = ''; private isLoading: boolean = false; private rules = { length: (len) => (v) => , required: (v) => !!v || 'This field is required' };
      private addAddList() {
      const data = { first_name: this.firstName, middle_name: this.middleName, last_name: this.lastName }; console.log('data', data); this.$store.dispatch('AddListModule/addAddList', data); } }
</script>