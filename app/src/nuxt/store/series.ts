import { GetterTree, MutationTree, ActionTree } from "vuex";
import { TRootState, TBookState, TSeriesState } from "state";

export const state: () => TSeriesState = () => ({
  rows: []
})

export const getters: GetterTree<TRootState, TSeriesState> = {
}

export const mutations: MutationTree<TSeriesState> = {
  FETCH_RESOLVE (state, { rows }) {
    state.rows = rows
  }
}

export const actions: ActionTree<TRootState, TSeriesState> = {
  async fetch ({ commit }) {
    const { data } = await this.$axios.get('/api/series')
    commit('FETCH_RESOLVE', data)
  },
  async registrar ({ commit }, book: TBookState) {
    const { data } = await this.$axios.post('/api/series/', { book })
    console.log(data)
  }
}
