class Storage {
  constructor() {
    this.shortUrls = new Map();
    this.keyLength = process.env.KEY_LENGTH || 4;
    this.allowedCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  genRandomKey() {
    const { allowedCharacters } = this;
    let key = '';
    for (let i = 0; i < this.keyLength; i++) {
      const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
      key += allowedCharacters[randomIndex];
    }
    return key;
  }

  add(link) {
    const key = this.genRandomKey();
    this.shortUrls.set(key, link);
    return key;
  }

  get(key) {
    return this.shortUrls.get(key);
  }
}

module.exports = Storage;
