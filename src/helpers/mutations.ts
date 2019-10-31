import { capitalize } from './common';
const componentMutation = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  //   console.log(Object.keys(jsonValue));
  const capitalizeTitle = capitalize(title);
  //   const fieldNames = Object.keys(jsonValue);
  const newComponent = `

  import { MutationTree } from 'vuex';
import { ${capitalizeTitle}State   } from './types';

/**
 * mutation
 */
export const mutations: MutationTree<${capitalizeTitle}State  > = {
  /**
   * Sets loading
   * @param {*} state
   * @param {boolean} flag - loading
   */

  SET_LOADING(state, flag: boolean) {
    state.loading = flag;
  },
  /**
   * Sets contact
   * @param {*} state
   * @param payload contact list
   */


  SET_${upperCaseTitle}LIST(state, payload: any) {
    state. ${lowercaseTitle}List = payload;
  },
  SET_${upperCaseTitle}_SUCCESSFULLY(state, payload: any) {
    state.successStatus = payload;
  },
  SET_${upperCaseTitle}_ERROR(state, payload: any) {
    state.errorStatus = payload; 
  },
};
   `;
  return newComponent;
};

export default componentMutation;
