import { capitalize } from './common';
const componentActions = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);

  const newComponent = `import { ActionTree } from 'vuex';
import { ${capitalizeTitle}State, ${capitalizeTitle}Model  } from './types';
import { RootState } from '../../types';
import { BASE_URL, ${upperCaseTitle}URL } from '@/config/urlList';
import axios from '@/lib/axios';
  
/**
 * ${lowercaseTitle} Actions
 *
 */
export const actions: ActionTree<${capitalizeTitle}State, RootState> = {
  /**
   * @param  {} {commit, dispatch}
   * @param  {} ${lowercaseTitle}  list
   */
  add${capitalizeTitle}({ commit, dispatch }, data) {
    commit('SET_LOADING', true);
    axios.post(BASE_URL + ${upperCaseTitle}URL + '/', data).then(_ => {
      commit('SET_LOADING', false);
      commit('SET_${upperCaseTitle}_SUCCESSFULLY', true);
      commit('SET_${upperCaseTitle}_ERROR', false);
      dispatch('load${capitalizeTitle}');
    }).catch(() => {
      commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
      commit('SET_${upperCaseTitle}_ERROR', true);
    });
  },

  /**
   * load ${lowercaseTitle} from server and set to store
   * @param {*} { commit }
   */
  load${capitalizeTitle}({ commit }) {
    commit('SET_LOADING', true);
    axios
      .get(BASE_URL + ${upperCaseTitle}URL + '/')
      .then((r: any) => r.data)
      .then((data : ${capitalizeTitle}Model[]) => {
        commit('SET_${upperCaseTitle}LIST', data);
        commit('SET_LOADING', false);
      });
  },
  /**
   * clear message
   * @param {*} { commit }
   */
  clearStatus({ commit }) {
    commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
    commit('SET_${upperCaseTitle}_ERROR', false);
  },
  /**
   * load single ${lowercaseTitle}   by id from server and set to store
   * @param {*} { commit }
   */
  loadSingle${capitalizeTitle}({ commit }, id) {
    commit('SET_LOADING', true);
    axios
      .get(BASE_URL + ${upperCaseTitle}URL + '/' + id)
      .then((r: any) => r.data)
      .then((data: ${capitalizeTitle}Model[]) => {
        commit('SET_EDIT_${upperCaseTitle}', data);
        commit('SET_LOADING', false);
      })
      .catch(() => {
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
        commit('SET_${upperCaseTitle}_ERROR', true);
      });
  },
  /**
   * @param  {} {commit, dispatch}
   * @param  {} ${lowercaseTitle}   list
   */
  update${capitalizeTitle}({ commit, dispatch }, data: any) {
    commit('SET_LOADING', true);
    axios
      .put(BASE_URL + ${upperCaseTitle}URL + '/' + data.id, data)
      .then(_ => {
        commit('SET_LOADING', false);
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', true);
        commit('SET_${upperCaseTitle}_ERROR', false);
        dispatch('load${capitalizeTitle}');
      })
      .catch(() => {
        commit('SET_LOADING', false);
        commit('SET_${upperCaseTitle}_SUCCESSFULLY', false);
        commit('SET_${upperCaseTitle}_ERROR', true);
      });
  },

};

   `;
  return newComponent;
};

export default componentActions;
