import { capitalize } from './common';
const componentActions = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);

  const newComponent = `import { ActionTree } from 'vuex';
import { ${capitalizeTitle}State  } from './types';
import { RootState } from '../../types';

import {
  ${upperCaseTitle}_ADD_MESSAGE,
  ${upperCaseTitle}_UPDATE_MESSAGE,
  ${upperCaseTitle}_DELETE_MESSAGE
} from '@/locales/en';
import { ${capitalizeTitle}Service } from '@/services/${capitalizeTitle}Service';

/**
 * ${lowercaseTitle} Actions
 *
 */
export const actions: ActionTree<${capitalizeTitle}State, RootState> = {
  /**
   * @param  {} {commit, dispatch}
   * @param  {} ${lowercaseTitle}  list
   */
  async add${capitalizeTitle}({ commit, dispatch }, data) {
    commit('SET_LOADING', true);
    try {
      await ${capitalizeTitle}Service.create${capitalizeTitle}(data);
      commit('SET_LOADING', false);
      commit('SET_${upperCaseTitle}_SUCCESSFULLY', true);
      commit('SET_${upperCaseTitle}_ERROR', false);
      commit('SET_${upperCaseTitle}_MESSAGE', ${upperCaseTitle}_ADD_MESSAGE);
      dispatch('load${capitalizeTitle}');
    } catch {
      commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
      commit('SET_${upperCaseTitle}_ERROR', true);
      commit('SET_${upperCaseTitle}_MESSAGE', '');
    }
  },

  /**
   * load ${lowercaseTitle} from server and set to store
   * @param {*} { commit }
   */
  async load${capitalizeTitle}({ commit }) {
    commit('SET_LOADING', true);
    const ${lowercaseTitle} = await ${capitalizeTitle}Service.get${capitalizeTitle}s();
        commit('SET_${upperCaseTitle}LIST', ${lowercaseTitle}.data);
        commit('SET_LOADING', false);
  },
  /**
   * clear message
   * @param {*} { commit }
   */
  async clearStatus({ commit }) {
    commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
    commit('SET_${upperCaseTitle}_ERROR', false);
    commit('SET_${upperCaseTitle}_MESSAGE', '');
  },
  /**
   * load single ${lowercaseTitle}   by id from server and set to store
   * @param {*} { commit }
   */
  async loadSingle${capitalizeTitle}({ commit }, id) {
    commit('SET_LOADING', true);

      try {
        const ${lowercaseTitle}  = await ${capitalizeTitle}Service.get${capitalizeTitle}ById(id);
        commit('SET_EDIT_${upperCaseTitle}', ${lowercaseTitle} .data);
        commit('SET_LOADING', false);
      } catch {
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
        commit('SET_${upperCaseTitle}_ERROR', true);
      }

  },
  /**
   * update ${lowercaseTitle}
   * @param  {} {commit, dispatch}
   * @param  {} ${lowercaseTitle}   list
   */
  async update${capitalizeTitle}({ commit, dispatch }, data: any) {
    commit('SET_LOADING', true);
    try {
      const ${lowercaseTitle} = await ${capitalizeTitle}Service.update${capitalizeTitle}(data);
        commit('SET_LOADING', false);
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', true);
        commit('SET_${upperCaseTitle}_ERROR', false);
        commit('SET_${upperCaseTitle}_MESSAGE', ${upperCaseTitle}_UPDATE_MESSAGE);
        dispatch('load${capitalizeTitle}');
      } catch {
        commit('SET_LOADING', false);
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
        commit('SET_${upperCaseTitle}_ERROR', true);
        commit('SET_${upperCaseTitle}MESSAGE', '');
      }
  },
  /**
   * remove ${lowercaseTitle}
   * @param  {} {commit, dispatch}
   * @param  {} ${lowercaseTitle}   list
   */
  async remove${capitalizeTitle}({ commit, dispatch }, id: any) {
    commit('SET_LOADING', true);
    try {
      await ${capitalizeTitle}Service.delete${capitalizeTitle}(id);
        commit('SET_LOADING', false);
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', true);
        commit('SET_${upperCaseTitle}_MESSAGE', ${upperCaseTitle}_DELETE_MESSAGE);
        commit('SET_${upperCaseTitle}_ERROR', false);
        dispatch('load${capitalizeTitle}');
      } catch {
        commit('SET_LOADING', false);
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
        commit('SET_${upperCaseTitle}_ERROR', true);
        commit('SET_${upperCaseTitle}_MESSAGE', '');
      }
  },

};

   `;
  return newComponent;
};

export default componentActions;
