import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspect } from "../decorators/inspect.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { domInject } from "../decorators/dom-injector.js";
import { NegociacoesService } from "../service/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
  @domInject("#data")
  private inputData: HTMLInputElement;
  @domInject("#quantidade")
  private inputQuantidade: HTMLInputElement;
  @domInject("#valor")
  private inputValor: HTMLInputElement;
  private negociacoes = new Negociacoes();
  private negociacoesView = new NegociacoesView("#negociacoesView");
  private mensagemView = new MensagemView("#mensagemView");
  private negociacoesService = new NegociacoesService();

  constructor() {
    this.negociacoesView.update(this.negociacoes);
  }

  @inspect()
  @logarTempoDeExecucao(true)
  public adiciona(): void {
    const negociacao = Negociacao.criaDe(
      this.inputData.value,
      this.inputQuantidade.value,
      this.inputValor.value
    );
    if (!this.isAWorkingDay(negociacao.data)) {
      this.mensagemView.update(
        "Você não pode realizar está operação fora dos dias uteis!"
      );
      return;
    }

    this.negociacoes.adiconaNegociacoes(negociacao);
    imprimir(negociacao, this.negociacoes);
    this.limparFormulario();
    this.updateViews();
  }

  importaDados(): void {
    this.negociacoesService
      .obterNegociacoes()
      .then((negocacoesDeHoje) => {
        return negocacoesDeHoje.filter((negocacoesDeHoje) => {
          return !this.negociacoes
            .lista()
            .some((negociacao) => negociacao.ehIgual(negociacao));
        });
      })
      .then((negociacoesDeHoje) => {
        // for (let negociacao of negociacoesDeHoje) {
        //   this.negociacoes.adiconaNegociacoes(negociacao);
        // }
        negociacoesDeHoje.forEach((negociacao) => {
          this.negociacoes.adiconaNegociacoes(negociacao);
        });
        this.negociacoesView.update(this.negociacoes);
      });
  }

  private isAWorkingDay(data: Date): boolean {
    return (
      data.getDay() > DiasDaSemana.DOMINGO &&
      data.getDay() < DiasDaSemana.SABADO
    );
  }

  private limparFormulario(): void {
    this.inputData.value = "";
    this.inputQuantidade.value = "";
    this.inputValor.value = "";
    this.inputData.focus();
  }

  private updateViews(): void {
    this.negociacoesView.update(this.negociacoes);
    this.mensagemView.update("Negociacão adicionada com sucesso!");
  }
}
