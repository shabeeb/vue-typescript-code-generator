import { capitalize } from './common';
const componentStoreIndex = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `
  import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import {  ${capitalizeTitle}State } from './types';
import { RootState } from '../../types';

/**
 * ${lowercaseTitle} state
 */
export const state:  ${capitalizeTitle}State = {
  ${lowercaseTitle}List: [],
  loading: false,
  successStatus: false,
  errorStatus: false,
  single${capitalizeTitle}: [],
};

const namespaced: boolean = true;

const ${capitalizeTitle}Module: Module< ${capitalizeTitle}State, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default ${capitalizeTitle}Module;
   `;
  return newComponent;
};

export default componentStoreIndex;
