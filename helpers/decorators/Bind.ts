export default function bind(target, key, descriptor) {
  if (!descriptor) return

  const fn = descriptor.value;

  return {
    configurable: true,

    get() {
      const boundFn = fn.bind(this);
      Reflect.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      // eslint-disable-next-line
      return function () {
        // eslint-disable-next-line
        return boundFn.apply(this, arguments)
      };
    }
  };
}
