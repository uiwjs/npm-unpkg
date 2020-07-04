import {
  init,
  RematchRootState,
  RematchDispatch,
  Models,
  ModelEffects,
  ModelConfig,
} from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import global from './global';

// no need to extend from Models
export interface RootModel extends Models {
  global: typeof global;
}

export type ExtractRematchLoadingFromEffectsObject<
  effects extends ModelEffects<any>
> = { [effectKey in keyof effects]: boolean };

export type ExtractRematchLoadingFromEffects<
  effects extends ModelConfig['effects']
> = effects extends (...args: any[]) => infer R
  ? R extends ModelEffects<any>
    ? ExtractRematchLoadingFromEffectsObject<R>
    : {}
  : effects extends ModelEffects<any>
  ? ExtractRematchLoadingFromEffectsObject<effects>
  : {};

interface LoadingState<M extends Models> {
  loading: {
    global: boolean;
    models: { [k in keyof M]: boolean };
    effects: {
      [k in keyof M]: ExtractRematchLoadingFromEffects<M[k]['effects']>;
    };
  };
}

const loading = createLoadingPlugin({});

export const store = init({
  models: {
    global: global,
  },
  plugins: [loading],
});

export const { dispatch } = store;

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel> & LoadingState<RootModel>;
