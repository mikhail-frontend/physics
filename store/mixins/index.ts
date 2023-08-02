import { Vue } from 'nuxt-property-decorator';

// eslint-disable-next-line
export const mixinMutations = () => ({
  setProperty(state, payload) {
    const isPayloadArr = Array.isArray(payload);
    if (!isPayloadArr) {
      const { name, value } = payload;
      Vue.set(state, name, value);
      return;
    }
    payload.forEach(({ name, value }) => {
      Vue.set(state, name, value);
    });
  },

  setCurrentTab(state, payload) {
    state.currentTab = payload;
  },

  setState(state, payload) {
    if (!payload) return;
    Object.entries(payload).forEach(([key, value]) => {
      if (state.hasOwnProperty(key)) {
        Vue.set(state, key, value);
      }
    });
  },

  clearState(state, freezeState) {
    Object.entries(freezeState).forEach(([key, value]) => {
      Vue.set(state, key, value);
    });
  },

  setFirstPage(state) {
    state.page = 1;
    state.per_page = 10;
    state.stopLoading = true;
    state.finishLoading = false;
  }
});
