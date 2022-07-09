import { Request, Response } from '@google-cloud/functions-framework';

export type Main = (request: Request, response: Response) => Promise<any>;

export type Configuration = {
  wordEndpoint: string;
};

export type GetHtml = (word: string) => Promise<string>;

export type Find = (word: string) => Promise<Finding[]>;

export type Finding = {
  header: SenseHeader;
  translations: Translation[];
};

export type SenseHeader = {
  word: string;
  condition: string;
  guidedWord: string;
};

export type Translation = { translation: string };
