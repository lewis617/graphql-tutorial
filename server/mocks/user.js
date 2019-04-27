const casual = require('casual');

module.exports = {
  User: () => ({
    name: () => casual.first_name,
    avatarUrl: () => `//iph.href.lu/300x300?text=${casual.first_name}&bg=${casual.rgb_hex}`,
    location: () => casual.address,
    intro: () => casual.sentence,
  }),
};
