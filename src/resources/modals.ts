import path from 'node:path';
import chokidar from 'chokidar';
import { getDirectoryFromFileURL, getModulesInFolder } from '@utils.js';
import search from './modals/modals.search.js';

const MODALS = {
  search
};

// TODO: a more centralised way to reload?
const MODALS_FOLDER = path.join(getDirectoryFromFileURL(import.meta.url), 'modals');
chokidar.watch(MODALS_FOLDER).on('change', async path => {
  if (!path.endsWith('.js')) return;
  (await getModulesInFolder(MODALS_FOLDER)).forEach(array =>
    Reflect.set(MODALS, <string>array[0].split('.')[1], array[1]));
});

export default MODALS;