import { capitalize } from './common';
const componentGetters = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `
  import { GetterTree } from 'vuex';
  import { ${capitalizeTitle}State  } from './types';
  import { RootState } from '../../types';

  /**
   * Getters ${capitalizeTitle}
   */
  export const getters: GetterTree<${capitalizeTitle}State , RootState> = {
    /**
     * ${lowercaseTitle}
     * @param {*} state
     * @returns  {object} ${lowercaseTitle}
     */

    get${capitalizeTitle}List(state) {
      return state.${lowercaseTitle}List;
    },
    successStatus(state) {
      return state.successStatus;
    },
    errorStatus(state) {
      return state.errorStatus;
    },
    /**
   * getSingle${capitalizeTitle}
   * @param {*} state
   * @returns  {object} ${lowercaseTitle}
   */
  getSingle${capitalizeTitle}(state) {
    return state.single${capitalizeTitle};
  },
  /**
   * get${capitalizeTitle}Message
   * @param {*} state
   * @returns  {object}  ${lowercaseTitle}
   */
  get${capitalizeTitle}Message(state) {
    return state.message;
  },
  };

   `;
  return newComponent;
};

export default componentGetters;
