import yaml from 'js-yaml';
import parseFileSync from 'ini-parser';

const parsers = {
  '.json': (file) => JSON.parse(file),
  '.yaml': (file) => yaml.safeLoad(file),
  '.ini': (file) => parseFileSync(file),
};

export default parsers;
