import Alterer from './alterer.js'

/**
 * Identical Alterer
 * Alters any data to its boolean opposite
 *
 * Inherits
 *
 * properties: name, accepts, options
 * method: detect(name, resolved) { return bool }
 */
export default class IdenticalAlterer extends Alterer {
	constructor() {
		super();
		this.name = 'identical';
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
		return resolved === options;
	}
}
