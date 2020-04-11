export const state = () => ({
  menuIsOpened: false
})

export const mutations = {
  SET_STATE(state, payload) {
    state[payload.key] = payload.value
  },
}
