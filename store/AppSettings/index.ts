import type { ActionTree, GetterTree, MutationTree } from 'vuex';
import type { AppSettingsState } from '~/store/AppSettings/types';

import { mixinMutations } from '~/store/mixins';
import defaultState from './entities/defaultState';

export const state = defaultState;

export const getters: GetterTree<AppSettingsState, unknown> = {
  defaultPosterImageUrl(state): string {
    const posterImage = state.company_files.find((file) => file.id === state.video_preview_image_id);
    return posterImage?.link || '';
  }
};

export const mutations: MutationTree<AppSettingsState> = {
  ...mixinMutations(),

  changeBannedUser(state, { userId, type }) {
    if (type === 'unset') {
      const index = state.usersBanned.findIndex((uId) => uId === userId);
      state.usersBanned.splice(index, 1);
    } else {
      state.usersBanned.push(userId);
    }
  },

  setLayoutError(state, layout) {
    state.errorLayout = layout;
  }
};
export const actions: ActionTree<AppSettingsState, unknown> = {
  async getCompany({ commit, state }) {
    const res = await this.$config.getData(`/company?domain=${state.domain}`, {}, false);
    commit('setState', res.data);
    if (res.hasOwnProperty('errors') && process.env.NODE_ENV === 'production') commit('setLayoutError', 'empty');
    return res;
  },

  async fetchUserBanned({ commit }) {
    const { data } = await this.$config.getData('/users/comment_banned');
    commit('setProperty', { name: 'usersBanned', value: data });
  },

  async setUserChangeBanned({ commit }, { userId, type }) {
    const res = await this.$config.postData(`/users/${userId}/params/${type}_ban_comment`, {});
    commit('changeBannedUser', { userId, type });
    return res;
  },

  async getUserScripts({ commit }) {
    const { data } = await this.$config.getData('/scripts');
    commit('setProperty', { name: 'loadScripts', value: false });
    return data;
  },

  async getSocial() {
    return await this.$config.getData('/company_socialite/show');
  },

  async authWithVKID(_, payload: {uuid: number, token: string}) {
    return await this.$config.getData('/VK_ID', payload);
  },

  async sendAffiseStats({ state }, payload: { goal?: number, payment_id?: number }) {
    if (!state.integration_affise_exists || !state.affise_uid) return;

    // check if utm_source is not 'edpartners'
    if (state.utm?.utm_source !== 'edpartners') return;

    try {
      await this.$config.postData('/execute_affise', { ...payload, click_id: state.affise_uid }, 'POST');
    } catch {
      // pass the error
    }
  }
};
