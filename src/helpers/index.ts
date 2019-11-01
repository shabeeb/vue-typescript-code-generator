import componentGen from './component';
import componentTypes from './types';
import componentActions from './actions';
import componentMutation from './mutations';
import componentGetters from './getters';
import componentStoreIndex from './storeindex';
import vuePage from './vuePage';
import listComponent from './listComponent';
import vueTestGen from './tests/views';
import TestAddComponentGen from './tests/TestAddComponent';
import TestListComponent from './tests/TestListComponent';

import {
  routerSnippet,
  storeImportSnippet,
  storeModuleNameSnippet,
  configURLSnippet,
} from './snippets';

export {
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
  storeModuleNameSnippet,
  configURLSnippet,
  vueTestGen,
  TestAddComponentGen,
  TestListComponent,
};
