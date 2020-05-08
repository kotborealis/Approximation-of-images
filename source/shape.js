import Canvas from "./canvas.js";
import * as util from "./util.js";

export class Shape {
	static randomPoint(width, height) {
		return [~~(Math.random()*width), ~~(Math.random()*height)];
	}

	static create(cfg) {
		let ctors = cfg.shapeTypes;
		let index = Math.floor(Math.random() * ctors.length);
		let ctor = ctors[index];
		return new ctor(cfg.width, cfg.height);
	}

	constructor(w, h) {
		this.bbox = {};
	}

}
