import { TRootState } from "state";
import { GetterTree } from "vuex";

export const state: () => TRootState = () => ({})

export const getters: GetterTree<TRootState, TRootState> = {
  getSeriesList (state: TRootState) {
    console.log(state)
    return () => state.series ? state.series.rows : []
  }
}

export const mutations = {}

export const actions = {}
