import { capitalize } from './common';
const vuePage = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  //   console.log(Object.keys(jsonValue));
  const capitalizeTitle = capitalize(title);
  //   const fieldNames = Object.keys(jsonValue);
  const newComponent = `
  <template>
  <div>
    <${capitalizeTitle}Component />
    <List${capitalizeTitle}Component />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ${capitalizeTitle}Component from '@/components/${capitalizeTitle}Component/${capitalizeTitle}Component.vue'; 
import List${capitalizeTitle}Component from '@/components/${capitalizeTitle}Component/List${capitalizeTitle}Component.vue'; 

@Component({
  components: {
    ${capitalizeTitle}Component,
    List${capitalizeTitle}Component
  }
})
export default class ${capitalizeTitle}View extends Vue {}
</script>

   `;
  return newComponent;
};

export default vuePage;
