function throttle(func, wait, options) {
  let context,
    args,
    result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  // eslint-disable-next-line
  const later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    // eslint-disable-next-line
    result = func.apply(context, args);
    // eslint-disable-next-line
    if (!timeout) context = args = null;
  };
  // eslint-disable-next-line
  return function () {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    // eslint-disable-next-line
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      // eslint-disable-next-line
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

interface Throttled extends Function {
  // eslint-disable-next-line
  now: Function;
}

export default function Throttle(milli: number, options = {}) {
  // eslint-disable-next-line
  return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
    const originalMethod = descriptor.value;
    // eslint-disable-next-line
    descriptor.value = throttle(function () {
      // eslint-disable-next-line
      originalMethod.apply(this, arguments);
    }, milli, options);
    // eslint-disable-next-line
    (<Throttled>descriptor.value).now = function () {
      // eslint-disable-next-line
      originalMethod.apply(this, arguments);
    };

    return descriptor;
  };
}
