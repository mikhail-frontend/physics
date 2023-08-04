// eslint-disable-next-line
import type { dateBuilderConfig, buildDateReturnValue } from '@/helpers/BuildDate';
// @ts-ignore
import type UniversalSocialAuth from 'universal-social-auth';
import type { ConfirmConfig } from '~/components/ConfirmModal.vue';
import type { UploadOptions } from '~/helpers/UploadScript';
import type TokenManager from '~/helpers/TokenManager';
// @ts-ignore
import type { Breadcrumb, SpecialBreadrumb } from './helpers/types/types';

type httpMethods =
    | 'get' | 'GET'
    | 'delete' | 'DELETE'
    | 'head' | 'HEAD'
    | 'options' | 'OPTIONS'
    | 'post' | 'POST'
    | 'put' | 'PUT'
    | 'patch' | 'PATCH'
    | 'purge' | 'PURGE'
    | 'link' | 'LINK'
    | 'unlink' | 'UNLINK'
type getDataType = (url: string, params?:Record<string, unknown> | FormData, publicMethod?:boolean, returnHeaders?:boolean, rootUrl?:boolean) => Promise<any>
type postDataType = (url:string, params:Record<string, unknown> | FormData, method?: httpMethods, publicMethod?:boolean, rootUrl?:boolean) => Promise<any>
type customCrumb = {
    id: number
    text: string
    value: unknown
}

type $breadcrumbs = {
    updateRender: () => void;
}
type alert = (message: string, type?: 'success' | 'error' | 'info') => void;

type $stripHtmlResult = {
    result: string;
}

declare module 'vue/types/vue' {
    interface Vue {
        $OAuth: UniversalSocialAuth,
        $alert: alert,
        $stripHtml: (string: string) => $stripHtmlResult;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $modal: any,
        $setCanonical: (link:string) => string,
        $buildDate: (date: string, config?: Partial<dateBuilderConfig>) => buildDateReturnValue | null,
        $uploadScripts: (options: UploadOptions) => Promise<boolean>,
        $tokenManager: TokenManager,
        $confirm: (confirmText: string, config?: Partial<ConfirmConfig>) => Promise<boolean>,
        $handleErrors: (response: any, successMessage?: string) => void,
        $breadcrumbs: $breadcrumbs,
        $hideHtmlOverflow: (flag: boolean) => void,
        postData: postDataType,
        $getData: getDataType,
        VUE_APP_SERVER_HOST: string,
        HOST: string
    }
}
declare module 'vuex/types/' {
    // @ts-ignore
    interface Store {
        $config: {
            getData: getDataType
            postData: postDataType
        }
    }
}

declare global {
    interface Window {
        bitrixForm(window:Window, document: Document, formPath: string):void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        FroalaEditor: any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        videojs: any
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        $alert: any,
        ymaps: any,
        universitiesMap: any
    }

}
