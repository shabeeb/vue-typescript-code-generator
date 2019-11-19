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
   * Sets ${lowercaseTitle}
   * @param {*} state
   * @param payload ${lowercaseTitle} list
   */


  SET_${upperCaseTitle}LIST(state, payload: any) {
    state.${lowercaseTitle}List = payload;
  },

  /**
   * set stae on success
   * @param {*} state
   * @param {*} payload
   */
  SET_${upperCaseTitle}_SUCCESSFULLY(state, payload: any) {
    state.successStatus = payload;
  },

  /**
   * set stae on error
   * @param {*} state
   * @param {*} payload
   */
  SET_${upperCaseTitle}_ERROR(state, payload: any) {
    state.errorStatus = payload;
  },
  /**
   * Sets single ${lowercaseTitle}
   * @param {*} state
   * @param payload ${lowercaseTitle}  data
   */

  SET_EDIT_${upperCaseTitle}(state, payload: any) {
    state.single${capitalizeTitle} = payload;
  },
  /**
   * Sets message ${lowercaseTitle}
   * @param {*} state
   * @param payload ${lowercaseTitle}   data
   */

  SET_${upperCaseTitle}_MESSAGE(state, payload: string) {
    state.message = payload;
  },
};
   `;
  return newComponent;
};

export default componentMutation;
