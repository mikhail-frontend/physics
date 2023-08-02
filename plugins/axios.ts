import { cookie } from '~/helpers/Cookie';
import API from '~/helpers/API';

const getDomain = (req) => {
  const host = req && req.headers ? req.headers.host : 'localhost:8080';
  try {
    return new URL(`https://${host}`).hostname;
  } catch (e) {
    return host;
  }
};

export default async function axiosPlugin({
  $axios, $config, req, store
}) {
  if (process.server) {
    const url = getDomain(req);
    const HOST = process.env.VUE_APP_SERVER_HOST || 'http://localhost:8080';
    store.commit('AppSettings/setProperty', { name: 'domain', value: url });
    store.commit('AppSettings/setProperty', { name: 'apiHost', value: HOST });
  }

  $axios.setHeader('domain', store.state.AppSettings.domain);
  $axios.setHeader('Accept', 'application/json');
  $axios.setBaseURL(store.state.AppSettings.apiHost);

  $axios.interceptors.request.use((config) => {
    if (process.client) {
      const token = localStorage.getItem('access_token') || cookie.get('access_token');
      if (token) config.headers.Authorization = token;
    }
    if (process.server) {
      const cookies = cookie.parseCookies(req.headers?.cookie);
      if (cookies.access_token) {
        config.headers.Authorization = cookies.access_token;
        store.commit('AppSettings/setProperty', { name: 'isUserAuth', value: true });
      }
    }

    return config;
  });

  const handleErrorResponse = (error) => {
    const isShowErrors = error?.response?.status >= 400 && error.response.status < 500;
    const errorMessage = error.response && error.response.data && error.response.data.errors ? error.response.data.errors : '';
    if (process.client && errorMessage && isShowErrors && window?.$alert) {
      if (Array.isArray(errorMessage)) {
        errorMessage.forEach((item) => {
          window?.$alert(item, 'error');
        });
      } else {
        window?.$alert(errorMessage, 'error');
      }
    }
    return { errors: errorMessage, error: error?.response?.data?.error };
  };

  const getData = async (
    url: string,
    params = {},
    publicMethod = true,
    returnHeaders = false,
    rootUrl = false
  ) => {
    let host = `/api${publicMethod ? '/public' : ''}`;
    if (store.state.AppSettings.id && !rootUrl) {
      host += `/companies/${store.state.AppSettings.id}`;
    }
    host += `${url}`;
    try {
      const response = await $axios.get(`${host}`, { headers: { Accept: 'application/json' }, params });
      const { data, headers } = response;
      return returnHeaders ? { data, headers } : data;
    } catch (error) {
      return handleErrorResponse(error);
    }
  };

  const postData = async (
    url: string,
    params = {},
    method: 'POST' | 'PUT' | 'DELETE' = 'POST',
    publicMethod = true,
    rootUrl = false
  ) => {
    let host = `/api${publicMethod ? '/public' : ''}`;
    if (store.state.AppSettings.id && !rootUrl) {
      host += `/companies/${store.state.AppSettings.id}`;
    }
    host += `${url}`;
    try {
      const response = await $axios({
        headers: { Accept: 'application/json' },
        method,
        url: host,
        data: params
      });
      const { data } = response;
      return data;
    } catch (error) {
      return handleErrorResponse(error);
    }
  };

  $config.getData = getData;
  $config.postData = postData;
  $config.VUE_APP_SERVER_HOST = process.env.VUE_APP_SERVER_HOST || 'http://localhost:8080';
  API.initialize({ getData, postData });

  return $axios;
}
