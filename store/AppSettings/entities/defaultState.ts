import type { AppSettingsState } from '~/store/AppSettings/types';

const defaultState: () => AppSettingsState = () => ({
  id: 0,
  color_scheme: '',
  logo: '',
  domain: '',
  apiHost: '',
  usersBanned: [],
  company_files: [],
  code: '',
  owner: {
    email: '',
    id: 0,
    socials: [],
    name: ''
  },
  isUserAuth: false,
  firstLink: null,
  description_background: null,
  bitrixForms: new Map<string, {scripts: HTMLElement[], element: HTMLElement}>(),
  description_small_for_course: '',
  vk_id_code: null,
  video_preview_image_id: null,
  journal_learner_role_id: 0,
  favicon: '',
  loadScripts: true,
  name: '',
  description: '',
  errorLayout: 'default',
  utm: null,
  hasSavedUtm: false,
  isUtmChanged: false,
  affise_uid: null,
  integration_affise_exists: false,
  routeFrom: ''
});

export default defaultState;
