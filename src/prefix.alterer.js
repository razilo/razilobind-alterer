import Alterer from './alterer.js'

/**
 * Prefix Alterer
 * Adds anything to start of a string
 *
 * Inherits
 *
 * properties: name, accepts, options
 * method: detect(name, resolved) { return bool }
 */
export default class PrefixAlterer extends Alterer {
	constructor() {
		super();
		this.name = 'prefix';
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
		return String(options) + resolved;
	}
}
