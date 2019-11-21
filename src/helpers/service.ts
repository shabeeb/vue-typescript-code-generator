import { capitalize } from './common';
import { MODAL_FOLDER_NAME, CONFIG_URL } from '@/constants/filenames';
const componentActions = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);

  const newComponent = `import axios from '@/lib/axios';
  import { ${capitalizeTitle}Model } from '@/${MODAL_FOLDER_NAME}/${capitalizeTitle}Model';
  import { ${upperCaseTitle}_URL } from '@/${CONFIG_URL}';
  export class ${capitalizeTitle}Service {
    public static async get${capitalizeTitle}s ()  {
      return await axios.get(${upperCaseTitle}_URL + '/');
    }
    public static async get${capitalizeTitle}ById (id: string){
      return await axios.get(${upperCaseTitle}_URL + '/' + id);
    }
    public static async create${capitalizeTitle} (${lowercaseTitle}Model: ${capitalizeTitle}Model)  {
      return await axios.post(${upperCaseTitle}_URL + '/', ${lowercaseTitle}Model);
    }
    public static async update${capitalizeTitle} (${lowercaseTitle}Model: ${capitalizeTitle}Model)  {
      return await axios.put(${upperCaseTitle}_URL + '/' + ${lowercaseTitle}Model.id, ${lowercaseTitle}Model);
    }
    public static async delete${capitalizeTitle} (id: string)  {
      return await axios.delete(${upperCaseTitle}_URL + '/' + id);
    }
  }



   `;
  return newComponent;
};

export default componentActions;
