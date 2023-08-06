import {mixinMutations} from '~/store/mixins';
import axios from "axios";
import universities from "~/pages/entities/universities";


export const state = () => ({
    citiesWithUniversities: []
});

export const getters = {};

export const mutations = {
    ...mixinMutations(),
};
export const actions = {
    async getUniversities({commit}) {
        try {
            const {data: serverResponse} = await axios.get(
                `http://localhost:8080/api/public/companies/1/map_cities`,
                {
                    params: {
                        'with': 'mapUniversities;mapUniversities.mapCity',
                        all: 1
                    }
                }
            );
            const {data} = serverResponse;
            commit('setProperty', {name: 'citiesWithUniversities', value: data})
            return data;
        } catch (e) {
            commit('setProperty', {name: 'citiesWithUniversities', value: universities});
            return  universities
        }
    }
};
