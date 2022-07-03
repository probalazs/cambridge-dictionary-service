import {
  Find,
  Finding,
  GetHtml,
  SenseHeader,
  Translation,
} from '../interfaces';
import { load } from 'cheerio';

export type Strategy = {
  getHtml: GetHtml;
};

export const find =
  (strategy: Strategy): Find =>
  (word) =>
    strategy.getHtml(word).then((html) => getFindings(load(html)));

function getFindings($: cheerio.Root): Finding[] {
  return getSenses($)
    .map((_, sense) => getFinding($, sense))
    .toArray() as any;
}

function getSenses($: cheerio.Root): cheerio.Cheerio {
  return $('.dsense');
}

function getFinding($: cheerio.Root, element: cheerio.Element): Finding {
  return {
    header: getFindingHeader($, element),
    translations: getTranslations($, element),
  };
}

function getFindingHeader(
  $: cheerio.Root,
  element: cheerio.Element,
): SenseHeader {
  return {
    word: getContent($(element).find('.dsense_h .dsense_hw')),
    condition: getContent($(element).find('.dsense_h .dsense_pos')),
    guidedWord: getContent($(element).find('.dsense_h .dsense_gw')),
  };
}

function getTranslations(
  $: cheerio.Root,
  element: cheerio.Element,
): Translation[] {
  return getBlocks($, element)
    .map((_, block) => ({
      examples: getExamples($, block),
      translation: getTranslation($, block),
    }))
    .toArray() as any;
}

function getBlocks($: cheerio.Root, element: cheerio.Element): cheerio.Cheerio {
  return $(element).find('.def-block');
}

function getExamples($: cheerio.Root, element: cheerio.Element): string[] {
  return $(element)
    .find('.examp')
    .map((_, element) => getContent($(element)))
    .toArray() as any;
}

function getTranslation($: cheerio.Root, element: cheerio.Element): string {
  return getContent($(element).find('.def'));
}

function getContent($: cheerio.Cheerio): string {
  return $.contents().text().trim();
}
