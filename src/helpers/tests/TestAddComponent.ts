import { capitalize, snakeToCamel, camelToSnake } from '../common';
const TestAddComponentGen = (title: string) => {
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const newComponent = `
  /**
   * Add${capitalizeTitle} test
   */
  import { shallowMount, createLocalVue } from '@vue/test-utils';
import Add${capitalizeTitle} from '@/components/${capitalizeTitle}/Add${capitalizeTitle}.vue';
// import VueRouter from 'vue-router';

import Vuex from 'vuex';
import vuetify from 'vuetify';

describe('component/${capitalizeTitle}/Add${capitalizeTitle}.vue', () => {
  let wrapper: any;
  beforeEach(() => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(vuetify);
    // localVue.use(VueRouter);
    // const router = new VueRouter();
    const $route = {
      params: {
        add: 'add',
        id: '1',
      },
    };
    const store = new Vuex.Store({
      modules: {
        ${capitalizeTitle}Module: {
          namespaced: true,
          state: {},
          getters: { successStatus: jest.fn(), errorStatus: jest.fn(),getSingle${capitalizeTitle}: jest.fn(), },
          actions: {},
        },
      },
    });
    wrapper = shallowMount(Add${capitalizeTitle}, {
      localVue,
      store,
      // router,
      mocks: {
        $route,
      },
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
