import { capitalize, snakeToCamel, camelToSnake } from '../common';
const vueTestGen = (title: string) => {
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const newComponent = `
  /**
   * ${capitalizeTitle} test
   */
  import { shallowMount } from '@vue/test-utils';
  import ${capitalizeTitle} from '@/views/${capitalizeTitle}.vue';
  
  describe('${capitalizeTitle}.vue', () => {
    it('renders without crashing', () => {
      const wrapper = shallowMount(${capitalizeTitle});
      expect(wrapper.element).toMatchSnapshot();
    });
  }); 
 `;
  return newComponent;
};

export default vueTestGen;
