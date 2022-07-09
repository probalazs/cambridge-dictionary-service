import { http } from '@google-cloud/functions-framework';
import { find } from './find';
import { getHtml } from './get-html';
import axios from 'axios';
import { configuration } from './configuration';

http('mainHttp', (request, response) =>
  find({
    getHtml: getHtml({ get: axios.get, baseUrl: configuration.wordEndpoint }),
  })(request.query['q']! as string).then(response.json),
);
