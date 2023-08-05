export type vueValidator<T> = (value: T) => string | boolean

export const isURL: vueValidator<string> = (v) => {
    const value = v || '';
    if (!value) return true;
    return !!value.match(/^https?:\/\/.*/gm) || 'Ссылка должна начинаться c https://';
};

export const isIframe: vueValidator<string> = (v) => {
    const pattern = '<iframe.+src="\\S+".+><\\/iframe>';
    return !!v.match(new RegExp(pattern, 'gm'))
        || 'iFrame должен начинаться с тега <iframe>, заканчиваться тегом </iframe>, а также иметь непустой атрибут src';
};

export const isRequired: vueValidator<string | number | Array<string | number> | null | void> = (value) => {
    if (Array.isArray(value)) return !!value.length || 'Обязательное поле';
    return !!String(value).trim() || 'Обязательное поле';
};

export const isTime: vueValidator<string> = (v) => {
    const value = v || '';
    return !!value.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/gm) || 'Время должно быть в формате ЧЧ:ММ:СС';
};

export const isPositiveNumber: vueValidator<string | number> = (value) => {
    if (isNaN(Number(value)) || value === null) return 'Введите число';
    return Number(value) >= 0 || 'Число должно быть больше или равно 0';
};

export const isEmail: vueValidator<string | string[]> = (value) => {
    if (typeof value === 'string') {
        value = value.trim();
    }
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Array.isArray(value)) {
        const isCorrect = !value.find((v) => !pattern.test(v));
        return Boolean(isCorrect) || 'Некорректный формат e-mail';
    }
    return Boolean(pattern.test(value)) || 'Некорректный формат e-mail';
};

export const isMinLength = (minLength: number): vueValidator<string> => (value) => value.length >= minLength || `Длина должна быть не меньше ${minLength} символов`;

export const isPhoneLength = (minLength: number): vueValidator<string> => (value) => value.length >= minLength || 'Введите корректный номер телефона';

export const isMatch = (matcher: string | number, msg = 'Данные не совпадают'): vueValidator<string | number> => (value) => value === matcher || msg;

export const isNumber: vueValidator<string> = (value) => {
    const pattern = /^[0-9]+$/;
    return pattern.test(value) || 'Допустимы только цифры';
};

export const emailRules = [isRequired, isEmail];
export const urlRules = [isRequired, isURL];
export const iframeRules = [isRequired, isIframe];
export const numbersRules = [isNumber];
export const requiredRules = [isRequired];
export const timeRules = [isRequired, isTime];
