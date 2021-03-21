class Storage {
  constructor() {
    this.shortUrls = new Map();
    this.keyLength = process.env.KEY_LENGTH || 4;
    this.allowedCharacters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  getRandomKey() {
    const { allowedCharacters } = this;
    let collisions = 0;
    const maxCollisions = process.env.MAX_COLLISIONS || 10;
    
    // having closure here allows us to keep collisions variable private
    function generateKey() {
      let key = '';
      for (let i = 0; i < this.keyLength; i++) {
        const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
        key += allowedCharacters[randomIndex];
      }

      // check if we have key collision
      if (this.shortUrls.has(key)) {
        collisions++;
        // if we already have many collisions increase key length
        if (collisions >= maxCollisions) this.keyLength++;
        return generateKey.call(this);
      }
      return key;
    }
    return generateKey.call(this);
  }

  add(link) {
    const key = this.getRandomKey();
    this.shortUrls.set(key, link);
    return key;
  }

  get(key) {
    return this.shortUrls.get(key);
  }
}

module.exports = Storage;
