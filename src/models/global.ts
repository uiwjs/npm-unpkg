import { createModel } from '@rematch/core';
import { RootModel } from './';
import { getDirectoryTrees, getFileContent } from '../servers/unpkg';
import {dataFilesSort} from '../utils/utils';

export interface Files {
  path: string;
  type: 'directory' | 'file';
  extname: string;
  integrity: string;
  lastModified: string;
  size: number;
  files?: Files[];
}

export interface PackageJSON {
    name: string;
    version: string;
    description: string;
    author: string;
    homepage?: string;
    repository?: {
      type?: string;
      url?: string;
    } | string;
    license: string;
    main: string;
    module: string;
    files: string[];
    publishConfig?: {
      [key: string]: any;
    }
    keywords: string[];
    peerDependencies?: {
      [key: string]: string;
    }
    dependencies?: {
      [key: string]: string;
    }
    devDependencies?: {
      [key: string]: string;
    }
    gitHead?: string;
}

export interface GlobalState {
  notFindPkg?: boolean;
  pkgname?: string;
  selectFile?: string;
  content?: string;
  extname?: string;
  showSearch?: boolean;
  package?: PackageJSON;
  files?: Files[];
}

export type Params = {
  org?: string;
  name?: string;
  filename?: string;
  '*'?: string;
}

export const global = createModel<RootModel>()({
  state: {
    notFindPkg: false,
    pkgname: '',
    files: [],
    selectFile: '',
    content: '',
    extname: '',
    package: {} as PackageJSON,
    showSearch: false,
  } as GlobalState,
  reducers: {
    update: (state, payload: GlobalState) => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch) =>  {
		const { global } = dispatch
    return {
      async setPkgname(params: Params) {
        const { name, org } = params || {};
        const state: GlobalState = {};
        if (!org && name) {
          state.pkgname = name;
        } else if (org && name) {
          state.pkgname = `${org}/${name}`;
        }
        if (params.filename) {
          state.selectFile = params.filename;
        }
        global.update({ ...state });
      },
      async getDirectoryTrees(_, state): Promise<any> {
        const data: Files = await getDirectoryTrees(state.global.pkgname!);
        if (data && data.files) {
          const dataSort = dataFilesSort(data.files);
          global.update({ files: dataSort });
        } else {
          global.update({ files: [] });
        }
      },
      async getPackageJSON(_, state) {
        const data: PackageJSON = await getFileContent(`${state.global.pkgname}/package.json`);
        if (data && typeof data === 'object') {
          global.update({ package: {...data }, notFindPkg: false });
        } else {
          global.update({
            package: undefined,
            notFindPkg: true,
          });
        }
      },
      async getFileContent(filepath: string = '', state) {
        if (!filepath) {
          dispatch.global.update({ content: '', extname: '' });
          return;
        };
        const type = filepath.replace(/.+\./,'');
        const data: PackageJSON = await getFileContent(`${state.global.pkgname}/${filepath}`);
        if (typeof data === 'string' || !data) {
          dispatch.global.update({ content: data, extname: type });
        } else if (data && /\.(json|map)$/.test(filepath)) {
          dispatch.global.update({ content: JSON.stringify(data, null, 2), extname: type });
        }
      },
    }
  }
});
