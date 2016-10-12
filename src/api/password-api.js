import { modifyPasswordUrl } from '../appConstants/urlConfig';
import commonAjax from '../helpers/commonAjax';

export function modifyPassword(config, sucCallback, failCallback) {
    return commonAjax(modifyPasswordUrl, config, sucCallback, failCallback);
}

