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
    paraTexto() {
        return JSON.stringify(this.negociacoes, null, 2);
    }
    ehIgual(negociacoes) {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes);
    }
}
//# sourceMappingURL=negociacoes.js.map