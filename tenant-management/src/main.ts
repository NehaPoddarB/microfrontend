import('./bootstrap')
	.catch(err => console.error(err));
import {defineCustomElements} from 'web-button-component/loader';

defineCustomElements(window);