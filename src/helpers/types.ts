import { capitalize } from './common';
const componentTypes = (title: string, jsonValue: any) => {
  const lowercaseTitle = title.toLowerCase();
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `

  export interface ${capitalizeTitle}State {
    ${lowercaseTitle}List: ${capitalizeTitle}Model[];
    loading?: boolean;
    successStatus?: boolean;
    errorStatus?: boolean;
    single${capitalizeTitle}: ${capitalizeTitle}Model[];
    message: string;
  }
  export interface ${capitalizeTitle}Model {
    ${modalTypes(fieldNames)}
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
