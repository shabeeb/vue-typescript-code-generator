import { capitalize } from './common';
import { MODAL_FOLDER_NAME } from '@/constants/filenames';
const componentTypes = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `
  import { ${capitalizeTitle}Model } from '@/${MODAL_FOLDER_NAME}/${capitalizeTitle}Model';
  export interface ${capitalizeTitle}State {
    ${lowercaseTitle}List: ${capitalizeTitle}Model[];
    loading?: boolean;
    successStatus?: boolean;
    errorStatus?: boolean;
    single${capitalizeTitle}: ${capitalizeTitle}Model[];
    message: string;
  }

   `;
  return newComponent;
};

const modalTypes = (fileds: any) => {
  let modals: string = '';
  fileds.map((field: any) => {
    modals += ` ${field}: string;
    `;
  });

  return modals;
};

export default componentTypes;

// export interface ${capitalizeTitle}Model {
//   ${modalTypes(fieldNames)}
// }
