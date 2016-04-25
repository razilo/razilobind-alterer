import Alterer from './alterer.js'

/**
 * Trim Alterer
 * Alters string data by triming it of whitespace
 *
 * Inherits
 *
 * properties: name, accepts, options
 * method: detect(name, resolved) { return bool }
 */
export default class TrimAlterer extends Alterer {
	constructor() {
		super();
		this.name = 'trim';
		this.accepts = ['string'];
	}

	/**
	 * alter()
	 * Changes resolved data based on options
	 * @param mixed resolved The data to change
	 * @param mixed options Any options sent in with the alterer
	 * @return mixed Changed resolved data
	 */
	alter(resolved, options) {
		return resolved.trim();
	}
}
