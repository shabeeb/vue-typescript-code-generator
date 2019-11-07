import { capitalize } from './common';

const routerSnippet = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  const upperCaseTitle = title.toUpperCase();
  const capitalizeTitle = capitalize(title);
  const newComponent = `
    {
        path: '/${lowercaseTitle}/:id?',
        name: '${lowercaseTitle}',
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
    import ${capitalizeTitle}Module from './modules/${capitalizeTitle}';`;
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
  const newComponent = `export const ${upperCaseTitle}URL = '${endPoint}';`;
  return newComponent;
};

export {
  routerSnippet,
  storeImportSnippet,
  storeModuleNameSnippet,
  configURLSnippet,
};
