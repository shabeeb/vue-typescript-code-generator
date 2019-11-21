import { capitalize } from './common';
const componentModals = (title: string, jsonValue: any) => {
  const capitalizeTitle = capitalize(title);
  //   console.log(Object.keys(jsonValue));
  const fieldNames = Object.keys(jsonValue);
  //   textFileds(fieldNames);
  const newComponent = `


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

export default componentModals;
