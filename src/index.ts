import { find } from './find';
import { getHtml } from './get-html';
import axios from 'axios';
import { configuration } from './configuration';
import { Main } from './interfaces';

export const main: Main = (request, response) =>
  find({
    getHtml: getHtml({ get: axios.get, baseUrl: configuration.wordEndpoint }),
  })(request.query['q']! as string).then((_) => response.json(_));
