import { capitalize, snakeToCamel, camelToSnake } from '../common';
const TestAddComponentGen = (title: string, jsonValue: any) => {
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const newComponent = `
  /**
   * List${capitalizeTitle} test
   */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import List${capitalizeTitle} from '@/components/${capitalizeTitle}/List${capitalizeTitle}.vue';

import Vuex from 'vuex';
import vuetify from 'vuetify';

describe('component/${capitalizeTitle}/List${capitalizeTitle}.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(vuetify);
    const store = new Vuex.Store({
      modules: {
        ${capitalizeTitle}Module: {
          namespaced: true,
          state: {},
          getters: {
            get${capitalizeTitle}List: jest.fn(() => [${JSON.stringify(
    jsonValue
  )}]),
            successStatus: jest.fn(),
            errorStatus: jest.fn(),
          },
          actions: {load${capitalizeTitle}: jest.fn() },
        },
      },
    });
    wrapper = shallowMount(List${capitalizeTitle}, {
      localVue,
      store,
    });
  });
  it('renders props when passed', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
 `;
  return newComponent;
};

export default TestAddComponentGen;
