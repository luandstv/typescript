import { Imprimivel } from "./imprimivel.js";

export function imprimir(...objetos: Imprimivel[]) {
  objetos.forEach((objetos) => {
    console.log(objetos.paraTexto());
  });
}
