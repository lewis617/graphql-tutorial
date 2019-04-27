const casual = require('casual');

module.exports = {
  User: () => {
    const name = casual.first_name;
    return {
      name: () => name,
      avatarUrl: () => `//iph.href.lu/300x300?text=${name}&bg=${casual.rgb_hex.replace('#', '')}`,
      location: () => casual.address,
      intro: () => casual.sentence,
    };
  },
};
