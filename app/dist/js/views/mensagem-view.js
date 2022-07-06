import { View } from "./view.js";
export class MensagemView extends View {
    template(model) {
        return `
            <p class="alert alert-info">${model}</p>
           `;
    }
    update(model) {
        const template = this.template(model);
        this.elemento.innerHTML = template;
    }
}
