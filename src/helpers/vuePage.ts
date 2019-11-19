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
    <transition
    mode="out-in"
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <Add${capitalizeTitle} v-if="showAdd"  class="absolute" />
  </transition>
  <transition
    mode="in-out"
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <List${capitalizeTitle} v-if="!showAdd"  />
  </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Add${capitalizeTitle} from '@/components/${capitalizeTitle}/Add${capitalizeTitle}.vue';
import List${capitalizeTitle} from '@/components/${capitalizeTitle}/List${capitalizeTitle}.vue';

@Component({
  components: {
    Add${capitalizeTitle},
    List${capitalizeTitle}
  }
})
export default class ${capitalizeTitle}View extends Vue {

  private showAdd: boolean = false;

  @Watch('$route', { immediate: true, deep: false })
  private onUrlChange(updatedRoute: any) {
    this.componenttoShow(updatedRoute);
  }

  private mounted() {
    this.showAdd = false;
    this.componenttoShow(this.$route);
  }
  private componenttoShow(routeValue: any) {
    if (
      routeValue.params &&
      (routeValue.params.add && routeValue.params.add === 'add')
    ) {
      this.showAdd = true;
    } else {
      this.showAdd = false;
    }
  }
}
</script>

   `;
  return newComponent;
};

export default vuePage;
