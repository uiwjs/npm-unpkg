import { Files } from '@/models/global';

// 拼接url参数
export function splitUrl(url: string, options: { [x: string]: any }) {
  let urlNew = url;
  const paramsArray: string[] = [];
  // Object.keys(options).forEach(key => paramsArray.push(key + '=' + options[key]));
  Object.keys(options).forEach((key) =>
    paramsArray.push(`${key}=${options[key]}`),
  );
  if (Object.keys(options).length === 0) {
    return url;
  }
  if (/\?/.test(urlNew) === false) {
    urlNew = `${urlNew}?${paramsArray.join('&')}`;
  } else {
    urlNew += `&${paramsArray.join('&')}`;
  }
  return urlNew;
}

export function nameSort(data: Files[] = [], resule: Files[] = []) {
  let dirs: Files[] = [];
  let files: Files[] = []
  data.forEach((item) => {
    if (item.type === 'directory') {
      dirs.push(item);
    } else if (item.type === 'file') {
      files.push(item);
    }
  });
  dirs = dirs.sort((a, b) => {
    return a.path.replace(/^\//, '').localeCompare(b.path.replace(/^\//, ''));
  });
  files = files.sort((a, b) => {
    return a.path.replace(/^\//, '').localeCompare(b.path.replace(/^\//, ''));
  });
  return [...dirs, ...files];
}

export function dataFilesSort(files: Files[] = [], resule: Files[] = []) {
  resule = nameSort(files);
  resule = resule.map<Files>((file) => {
    if (file.files) {
      file.files = nameSort(file.files);
    }
    return file;
  });
  return resule;
}