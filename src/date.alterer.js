import Alterer from './alterer.js'
import {RaziloBindDateFormat} from 'razilobind-core'

/**
 * Date Alterer
 * Alters various data to a date string in (options) format
 *
 * Inherits
 *
 * properties: name, accepts, options
 * method: detect(name, resolved) { return bool }
 */
export default class DateAlterer extends Alterer {
	constructor() {
		super();
		this.name = 'date';
		this.accepts = ['string', 'number', 'object', 'symbol'];
	}

	/**
	 * alter()
	 * Changes resolved data based on options
	 * @param mixed resolved The data to change
	 * @param mixed options Any options sent in with the alterer
	 * @return mixed Changed resolved data
	 */
	alter(resolved, options) {
		let dateObj;

		if (typeof resolved === 'symbol') dateObj = new Date(Date.parse(String(Symbol(resolved))));
		else if (!isNaN(resolved) && resolved !== null) dateObj = new Date(resolved);
		else if (typeof resolved === 'string' && resolved.length > 0) dateObj = new Date(Date.parse(resolved));
		else if (resolved instanceof Date) dateObj = resolved;
		else return '';

		return RaziloBindDateFormat.dateFormat(dateObj, options);
	}
}
