import { NegociacaoController } from "./controllers/negociacao-controller.js";
const controler = new NegociacaoController();
const form = document.querySelector('.form');
form.addEventListener('submit', event => {
    event.preventDefault();
    controler.adiciona();
});
