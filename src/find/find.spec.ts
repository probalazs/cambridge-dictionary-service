import { getRandomString } from '../test-helpers';
import { find, Strategy } from './find';

describe('Find', () => {
  it('should fetch html', () => {
    const word = getRandomString();
    const getHtml = jest.fn().mockResolvedValue(getRandomString());

    find(createStrategy({ getHtml }))(word);

    expect(getHtml).toBeCalledWith(word);
  });

  [
    {
      should: 'return empty list when input html is empty',
      html: '',
      expected: [],
    },
    {
      should: 'return sense header',
      html: `
      <div class="dsense">
        <div class="dsense_h">
          <div class="dsense_hw">[word]</div>
          <div class="dsense_pos">[condition]</div>
          <div class="dsense_gw">[guided word]</div>
        </div>
      </div>
      `,
      expected: [
        {
          header: {
            word: '[word]',
            condition: '[condition]',
            guidedWord: '[guided word]',
          },
          translations: expect.anything(),
        },
      ],
    },
    {
      should: 'return translation',
      html: `
      <div class="dsense">
        <div class="def-block">
          <div class="def">[translation]</div>
        </div>
      </div>
      `,
      expected: [
        {
          header: expect.anything(),
          translations: [
            {
              translation: '[translation]',
              examples: expect.anything(),
            },
          ],
        },
      ],
    },
    {
      should: 'return example',
      html: `
      <div class="dsense">
        <div class="def-block">
          <div class="examp">[example]</div>
        </div>
      </div>
      `,
      expected: [
        {
          header: expect.anything(),
          translations: [
            {
              translation: expect.anything(),
              examples: ['[example]'],
            },
          ],
        },
      ],
    },
  ].forEach((testCase) => {
    it(`should ${testCase.should}`, async () => {
      const getHtml = () => Promise.resolve(testCase.html);

      const result = await find(createStrategy({ getHtml }))(getRandomString());

      expect(result).toEqual(testCase.expected);
    });
  });
});

function createStrategy(override: Partial<Strategy> = {}): Strategy {
  return {
    getHtml: () => Promise.resolve(getRandomString()),
    ...override,
  };
}
