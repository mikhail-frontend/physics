interface IRewriteFuncOption {
    timer: ReturnType<typeof setTimeout>;
    lastArgs;
}

interface IRewriteFunc {
    (...rewriteArgs): void;
    options: IRewriteFuncOption;
}

export function cancel(func: IRewriteFunc) {
  if (func && func.options) {
    clearTimeout(func.options.timer);
  }
}

function getWrapper(
  debounceTime: number,
  leading: boolean,
  // eslint-disable-next-line
  originalMethod: Function,
  // eslint-disable-next-line
  that?: Function
) {
  const options: IRewriteFuncOption = {
    timer: undefined,
    lastArgs: []
  };
  // eslint-disable-next-line
  let rewriteFunc = <IRewriteFunc> function (...rewriteArgs) {
    options.lastArgs = rewriteArgs;

    if (!options.timer) {
      if (leading) originalMethod.apply(this, options.lastArgs);

      options.timer = setTimeout(() => {
        if (!leading) originalMethod.apply(this, options.lastArgs);
        options.timer = undefined;
      }, debounceTime);
    } else {
      clearTimeout(options.timer);

      options.timer = setTimeout(() => {
        if (!leading) originalMethod.apply(this, options.lastArgs);
        options.timer = undefined;
      }, debounceTime);
    }
  };

  if (that) {
    rewriteFunc = rewriteFunc.bind(that);
  }

  rewriteFunc.options = options;

  return rewriteFunc;
}

function defineProperty(
  debounceTime: number,
  leading: boolean,
  // eslint-disable-next-line
  target: any,
  name: string
) {
  let wrapperFunc;

  Object.defineProperty(target, name, {
    configurable: true,
    enumerable: false,
    get() {
      return wrapperFunc;
    },
    set(value) {
      wrapperFunc = getWrapper(debounceTime, leading, value, this);
    }
  });
}

function modifyDescriptor(
  debounceTime: number,
  leading: boolean,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  descriptor.value = getWrapper(debounceTime, leading, originalMethod);
  return descriptor;
}

function createDebounce(
  debounceTime: number,
  leading: boolean,
  ...args
) {
  if (args.length === 0) throw new Error('function applied debounce decorator should be a method');
  if (args.length === 1) throw new Error('method applied debounce decorator should have valid name');

  const target = args[0],
    name = args[1];
  const descriptor = args.length === 3 && args[2]
    ? args[2]
    : Object.getOwnPropertyDescriptor(target, name);

  if (descriptor) {
    return modifyDescriptor(debounceTime, leading, descriptor);
  }
  // property method has no descriptor to return;
  defineProperty(debounceTime, leading, target, name);
}

export default function debounce(time = 500, options = { leading: false }) {
  const debounceTime = time;
  const leading = options.leading || false;
  // eslint-disable-next-line
  const opts = [time, options];
  // eslint-disable-next-line
  return function (...args) {
    return createDebounce(debounceTime, leading, ...args);
  };
}
