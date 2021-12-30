import request from '../utils/request';

export function getDirectoryTrees(pkg: string) {
  return request(`https://unpkg.com/${pkg}/?meta`, {
    method: 'GET',
  });
}

export function getFileContent(path: string) {
  return request(`https://unpkg.com/${path}`, {
    method: 'GET',
  });
}
