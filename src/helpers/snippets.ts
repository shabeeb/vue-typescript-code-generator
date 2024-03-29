import { capitalize } from './common';
import { MODULE_FOLDER_NAME } from '@/constants/filenames';

const routerSnippet = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `
    {
        path: '/${lowercaseTitle}/:action?/:id?',
        name: '${lowercaseTitle}',
        props: true,
        // route level code-splitting
        // this generates a separate chunk (${lowercaseTitle}.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "${lowercaseTitle}" */ '../views/${capitalizeTitle}.vue'),
      },`;
  return newComponent;
};

const storeImportSnippet = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `
    import ${capitalizeTitle}Module from './${MODULE_FOLDER_NAME}/${capitalizeTitle}';`;
  return newComponent;
};

const storeModuleNameSnippet = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `${capitalizeTitle}Module`;
  return newComponent;
};

const configURLSnippet = (title: string, endPoint: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `export const ${upperCaseTitle}_URL = BASE_URL + '${endPoint}';`;
  return newComponent;
};

const messageSnippet = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `  export const ${upperCaseTitle}_ADD_MESSAGE = "${capitalizeTitle}  added successfully";
  export const ${upperCaseTitle}_UPDATE_MESSAGE = "${capitalizeTitle} Updated successfully";
  export const ${upperCaseTitle}_DELETE_MESSAGE = "${capitalizeTitle}  Deleted successfully";
  `;
  return newComponent;
};

export {
  routerSnippet,
  storeImportSnippet,
  storeModuleNameSnippet,
  configURLSnippet,
  messageSnippet
};
