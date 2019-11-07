import { capitalize, snakeToCamel, camelToSnake } from '../common';
const vueTestGen = (title: string) => {
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const newComponent = `
  /**
   * ${capitalizeTitle} test
   */
  import { shallowMount, createLocalVue } from '@vue/test-utils';
import ${capitalizeTitle} from '@/views/${capitalizeTitle}.vue';
import VueRouter from 'vue-router';

describe('${capitalizeTitle}.vue', () => {
  it('renders without crashing', () => {
    const localVue = createLocalVue();
    const router = new VueRouter();
    localVue.use(VueRouter);
    const wrapper = shallowMount(${capitalizeTitle}, { localVue, router });
    expect(wrapper.element).toMatchSnapshot();
  });
});


 `;
  return newComponent;
};

export default vueTestGen;
