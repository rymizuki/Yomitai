import { GetterTree, MutationTree, ActionTree } from "vuex";
import { TRootState, TBookState } from "state";

type TSeriesState = () => {}

export const state: TSeriesState = () => ({})

export const getters: GetterTree<TRootState, TSeriesState> = {

}

export const mutations: MutationTree<TSeriesState> = {

}

export const actions: ActionTree<TRootState, TSeriesState> = {
  async registrar ({ commit }, book: TBookState) {
    const { data } = await this.$axios.post('/api/series/', { book })
    console.log(data)
  }
}
