export function inpect() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const retorno = metodoOriginal.apply(this, args); //this é o contexto dessa nova function
      return retorno;
    };
    return descriptor;
  };
}
