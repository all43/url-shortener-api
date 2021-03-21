const Storage = require('./Storage');

let storage;
const URLs = [
  'http://www.example.org/apparatus.aspx',
  'https://www.google.com/doodles/30th-anniversary-of-pac-man',
  'https://translate.google.com/?sl=auto&tl=de&text=ambiguity&op=translate',
  'https://en.wikipedia.org/wiki/Berlin',
  'https://github.com/facebook/jest',
];

function getRandomUrl() {
  const index = Math.floor(Math.random() * URLs.length);
  return URLs[index];
}

describe('Storage works properly', () => {
  beforeEach(() => {
    storage = new Storage();
  });
  test('has add and get methods defined', () => {
    expect(storage).toMatchObject({
        get: expect.any(Function),
        add: expect.any(Function),
      }
    );
  });
  test('added url matches retrieved with the same key', () => {
    const url = getRandomUrl();
    const key = storage.add(url);
    expect(storage.get(key)).toBe(url);
  });
  test('key collision is not possible', () => {
    storage.allowedCharacters = 'abc';
    storage.keyLength = 1;
    const keys = URLs.map((url) => storage.add(url));
    const uniqueKeys = new Set(keys);
    expect(uniqueKeys.size).toBe(keys.length);
  });
});
