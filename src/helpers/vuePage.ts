import { capitalize } from './common';
const vuePage = (title: string) => {
  // const lowercaseTitle = title.toLowerCase();
  // const upperCaseTitle = title.toUpperCase();
  //   console.log(Object.keys(jsonValue));
  const capitalizeTitle = capitalize(title);
  //   const fieldNames = Object.keys(jsonValue);
  const newComponent = `
  /**
 * ${capitalizeTitle} page
 */
  <template>
  <div>
    <transition
    mode="out-in"
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <Add${capitalizeTitle} v-if="showAdd"  class="absolute"  :id="id" :action="action" />
  </transition>
  <transition
    mode="in-out"
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <List${capitalizeTitle} v-if="!showAdd" :id="id"   />
  </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import Add${capitalizeTitle} from '@/components/${capitalizeTitle}/Add${capitalizeTitle}.vue';
import List${capitalizeTitle} from '@/components/${capitalizeTitle}/List${capitalizeTitle}.vue';

@Component({
  components: {
    Add${capitalizeTitle},
    List${capitalizeTitle}
  }
})
export default class ${capitalizeTitle}View extends Vue {
  @Prop({ default: '' })
  public action!: string;
  @Prop({ default: '' })
  public id!: string;

  private showAdd: boolean = false;


  /**
   * update props on route change
   */
  @Watch('$route', { immediate: true, deep: false })
  private onUrlChange(updatedRoute: any) {
    this.componenttoShow();
  }

  private mounted() {
    this.showAdd = false;
    this.componenttoShow();
  }

  /**
   * setting view/edit/list to show
   * @description
   */
  private componenttoShow() {
    this.showAdd = false;
    if (this.action && (this.action === 'add' || this.action === 'edit')) {
      this.showAdd = true;
    }
  }

}
</script>

   `;
  return newComponent;
};

export default vuePage;
