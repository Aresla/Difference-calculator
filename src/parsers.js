import yaml from 'js-yaml';

export const mapTypeToParser = {
  '.json': (file) => JSON.parse(file),
  '.yaml': (file) => yaml.safeLoad(file),
};
