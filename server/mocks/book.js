const casual = require('casual');

module.exports = {
  Book: () => {
    const title = casual.word;
    return {
      title: () => title,
      coverUrl: () => `//iph.href.lu/150x180?text=${title}&bg=${casual.rgb_hex.replace('#', '')}`,
      rating: () => casual.double(0, 10).toFixed(1),
    };
  },
};
