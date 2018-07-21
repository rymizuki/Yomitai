import qs from 'qs'
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { TRootState, TBooksState, TBookState } from 'state'

export type TBooksSearchParam = {
  keyword: string,
  field: 'author' | 'title',
  period: 'all' | 'this_month' | 'this_year'
}

export const state: () => TBooksState = () => ({
  rows: [],
  error: null,
})

export const getters: GetterTree<TBooksState, TRootState> = {
  getRows (state) {
    return () => state.rows
  },
  getError (state) {
    return () => state.error
  }
}

export const mutations: MutationTree<TBooksState> = {
  receive (state, rows: TBookState[]) {
    state.rows = rows
    state.error = null
  },
  reject (state, error) {
    state.error = error
  }
}

export const actions: ActionTree<TBooksState, TRootState> = {
  async search ({ commit }, { field, keyword, period }: TBooksSearchParam) {
    console.log(field, keyword)
    const query = qs.stringify({ field, keyword, period })
    const { data } = await this.$axios.get(`/api/books?${ query }`)
    if (data.rows) {
      commit('receive', data.rows)
    } else {
      commit('reject', data.error)
    }
  }
}
