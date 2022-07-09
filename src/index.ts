import { find } from './find';
import { getHtml } from './get-html';
import axios from 'axios';
import { configuration } from './configuration';
import type { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';

export const main: HttpFunction = (request, response) =>
  find({
    getHtml: getHtml({ get: axios.get, baseUrl: configuration.wordEndpoint }),
  })(request.query['q']! as string).then((_) => response.json(_));
