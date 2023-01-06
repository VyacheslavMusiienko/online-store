import { IUtils } from '../interface/Utils';

const Utils = {
  parseRequestURL: (): IUtils => {
    const url = window.location.hash.slice(1).toLowerCase() || '/';
    const r = url.split('/');
    const request: IUtils = {
      resource: null,
      id: null,
      verb: null,
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
  },
};

export default Utils;
