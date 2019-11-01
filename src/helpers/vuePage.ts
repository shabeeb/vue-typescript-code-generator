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
    <Add${capitalizeTitle} />
    <List${capitalizeTitle} />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Add${capitalizeTitle} from '@/components/${capitalizeTitle}/Add${capitalizeTitle}.vue'; 
import List${capitalizeTitle} from '@/components/${capitalizeTitle}/List${capitalizeTitle}.vue'; 

@Component({
  components: {
    Add${capitalizeTitle},
    List${capitalizeTitle}
  }
})
export default class ${capitalizeTitle}View extends Vue {}
</script>

   `;
  return newComponent;
};

export default vuePage;
