import Step from "./step.js";
import State from "./state.js";
import Canvas from "./canvas.js";
import {Shape} from "./shape.js";

export default class GenAlgorithm {
    constructor(original, cfg) {
        this.cfg = cfg;
        this.state = new State(original, Canvas.empty(cfg));
        this._steps = 0;
        this.onStep = () => {};
            }

    start() {
        this._ts = Date.now();
        this._addShape();
    }

    _addShape() {
        this._findBestStep().then(step => this._optimizeStep(step)).then(step => {
            this._steps++;
            if (step.distance < this.state.distance) { /* лучше чем текущее состояние, чётко */
                this.state = step.apply(this.state);
                this.onStep(step);
            } else { /* хуже чем текущее состояние, в мусорку его */
                this.onStep(null);
            }
            this._continue();
        });
    }

    _continue() {
        if (this._steps < this.cfg.steps) {
            setTimeout(() => this._addShape(), 10);
        } else {
            let time = Date.now() - this._ts;
        }
    }

    _findBestStep() {
        const LIMIT = this.cfg.shapes;

        let bestStep = null;
        let promises = [];

        for (let i = 0; i < LIMIT; i++) {
            let shape = Shape.create(this.cfg);

            let promise = new Step(shape, this.cfg).compute(this.state).then(step => {
                if (!bestStep || step.distance < bestStep.distance) {
                    bestStep = step;
                }
            });
            promises.push(promise);
        }

        return Promise.all(promises).then(() => bestStep);
    }

    _optimizeStep(step) {
        const LIMIT = this.cfg.mutations;

        let totalAttempts = 0;
        let successAttempts = 0;
        let failedAttempts = 0;
        let resolve = null;
        let bestStep = step;
        let promise = new Promise(r => resolve = r);
            let tryMutation = () => {
                if (failedAttempts >= LIMIT) {
                    return resolve(bestStep);
                }

                totalAttempts++;
                bestStep.mutate().compute(this.state).then(mutatedStep => {
                    if (mutatedStep.distance < bestStep.distance) { /* успех */
                        successAttempts++;
                        failedAttempts = 0;
                        bestStep = mutatedStep;
                    } else { /* неудача */
                        failedAttempts++;
                    }

                    tryMutation();
                });
            }

            tryMutation();
        return promise;
    }
}
