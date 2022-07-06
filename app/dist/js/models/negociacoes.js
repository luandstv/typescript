export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiconaNegociacoes(negociacao) {
        this.negociacoes.push(negociacao);
    }
    lista() {
        return this.negociacoes;
    }
}
