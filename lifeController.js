class LifeController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }
}

const gameOfLife = new LifeController(new LifeModel(), new LifeView())