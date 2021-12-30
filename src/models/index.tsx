import { init, RematchRootState, RematchDispatch, Models } from '@rematch/core';
import loadingPlugin, { ExtraModelsFromLoading } from '@rematch/loading';
import { global } from './global';

export interface RootModel extends Models<RootModel>, FullModel {
  global: typeof global;
}

type FullModel = ExtraModelsFromLoading<RootModel>;

export const models: RootModel = { global } as RootModel;
export const store = init<RootModel, FullModel>({
  models,
  plugins: [loadingPlugin()],
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel, FullModel>;
