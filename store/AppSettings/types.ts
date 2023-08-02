import type { User, File } from '../globalTypes';

export interface AppSettingsState {
    id: number
    color_scheme: string
    logo: string
    domain: string
    apiHost: string
    usersBanned: User[],
    company_files: File[],
    code: string,
    owner: User,
    firstLink: string | null
    isUserAuth: boolean,
    description_background: string | null,
    bitrixForms: Map<string, {scripts: HTMLElement[], element: HTMLElement}>
    description_small_for_course: string | null,
    video_preview_image_id: number | null
    journal_learner_role_id: number
    vk_id_code: string
    favicon: string
    loadScripts: boolean
    name: string
    description: string
    errorLayout: string
    utm: null | Record<string, string>
    isUtmChanged: boolean
    hasSavedUtm: boolean
    affise_uid: null | string
    integration_affise_exists?: boolean
    routeFrom: string
}
