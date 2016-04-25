import Alterer from './alterer.js'

/**
 * Join Alterer
 * Joins the values of object or array as a string
 *
 * Inherits
 *
 * properties: name, accepts, options
 * method: detect(name, resolved) { return bool }
 */
export default class JoinAlterer extends Alterer {
	constructor() {
		super();
		this.name = 'join';
		this.accepts = ['object'];
	}

	/**
	 * alter()
	 * Changes resolved data based on options
	 * @param mixed resolved The data to change
	 * @param mixed options Any options sent in with the alterer
	 * @return mixed Changed resolved data
	 */
	alter(resolved, options) {
		var result = '';
		for (let key in resolved) result = result + String(resolved[key]);
		return result;
	}
}
