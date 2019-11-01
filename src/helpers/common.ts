const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group: string) =>
    group
      .toUpperCase()
      .replace('-', '')
      .replace('_', ''),
  );

const camelToSnake = (str: string) =>
  str.replace(/[\w]([A-Z])/g, (group: string) =>
    (group[0] + '_' + group[1]).toLowerCase(),
  );

export { capitalize, snakeToCamel, camelToSnake };
