import Alterer from './alterer.js'

/**
 * JSON Alterer
 * Alters any type of data to a JSON string
 *
 * Inherits
 *
 * properties: name, accepts, options
 * method: detect(name, resolved) { return bool }
 */
export default class JsonAlterer extends Alterer {
	constructor() {
		super();
		this.name = 'json';
		this.accepts = [];
	}

	/**
	 * alter()
	 * Changes resolved data based on options
	 * @param mixed resolved The data to change
	 * @param mixed options Any options sent in with the alterer
	 * @return mixed Changed resolved data
	 */
	alter(resolved, options) {
		return JSON.stringify(resolved);
	}
}
