import { createModel } from '@rematch/core';
import { Dispatch } from './';
import { getDirectoryTrees, getFileContent } from '@/servers/unpkg';

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
  pkgname?: string;
  selectFile?: string;
  content?: string;
  extname?: string;
  showSearch?: boolean;
  package?: PackageJSON;
  files?: Files[]
}

export type Params = {
  org?: string;
  name?: string;
  filename?: string;
}

export default createModel({
  state: {
    pkgname: '',
    files: [],
    selectFile: '',
    content: '',
    extname: '',
    package: {} as PackageJSON,
    showSearch: false,
  },
  reducers: {
    update: (state: any, payload: GlobalState): GlobalState => ({
      ...state,
      ...payload,
    }),
  },
  effects: (dispatch: any) => ({
    async setPkgname(params: Params = {}) {
      const dph = dispatch as Dispatch;
      const { name, org } = params;
      const state: GlobalState = {};
      if (!org && name) {
        state.pkgname = name;
      } else if (org && name) {
        state.pkgname = `${org}/${name}`;
      }
      if (params.filename) {
        state.selectFile = params.filename;
      }
      dph.global.update({ ...state });
    },
    async getDirectoryTrees(_, { global }: { global: GlobalState}) {
      const dph = dispatch as Dispatch;
      const data: Files = await getDirectoryTrees(global.pkgname!);
      if (data && data.files) {
        dph.global.update({ files: data.files });
      }
    },
    async getPackageJSON(_, { global }: { global: GlobalState}) {
      const dph = dispatch as Dispatch;
      const data: PackageJSON = await getFileContent(`${global.pkgname}/package.json`);
      if (data && typeof data === 'object') {
        dph.global.update({ package: {...data} });
      }
    },
    async getFileContent(filepath: string = '', { global }: { global: GlobalState}) {
      if (!filepath) return;
      const dph = dispatch as Dispatch;
      const type = filepath.replace(/.+\./,'');
      const data: PackageJSON = await getFileContent(`${global.pkgname}/${filepath}`);
      if (typeof data === 'string' || !data) {
        dph.global.update({ content: data, extname: type });
      } else if (data && /\.(json|map)$/.test(filepath)) {
        dph.global.update({ content: JSON.stringify(data, null, 2), extname: type });
      }
    },
  }),
});
