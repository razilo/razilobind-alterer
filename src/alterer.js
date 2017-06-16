/**
 * Alterer
 * Generic alterer methods used accross all alterers
 */
export default class Alterer {
	constructor() {
		this.name = undefined;
		this.accepts = [];
	}

	detect(name, resolved) {
		if (name !== this.name)	return false;
		if (this.accepts.length !== 0 && this.accepts.indexOf(typeof resolved) < 0) return false;
		return true;
	}
}
