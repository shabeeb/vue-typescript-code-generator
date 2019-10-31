import { capitalize } from './common';
const addComponentVue = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  //   console.log(Object.keys(jsonValue));
  const capitalizeTitle = capitalize(title);
  //   const fieldNames = Object.keys(jsonValue);
  const newComponent = `
  <template>
  <div>
    <${capitalizeTitle}Component />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ${capitalizeTitle}Component from '@/components/${capitalizeTitle}Component/${capitalizeTitle}Component.vue'; // @ is an alias to /src
@Component({
  components: {
    ${capitalizeTitle}Component
  }
})
export default class ${capitalizeTitle}View extends Vue {}
</script>

   `;
  return newComponent;
};

export default addComponentVue;
