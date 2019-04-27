const casual = require('casual');
const { MockList } = require('apollo-server');

module.exports = {
  User: () => {
    const name = casual.first_name;
    return {
      name: () => name,
      avatarUrl: () => `//iph.href.lu/300x300?text=${name}&bg=${casual.rgb_hex.replace('#', '')}`,
      location: () => casual.address,
      intro: () => casual.sentence,
      isFollowing: () => false,
      following: (parent, args) => new MockList(args.limit),
      followers: (parent, args) => new MockList(args.limit),
      followingCount: () => casual.integer(0, 1000),
      followersCount: () => casual.integer(0, 1000),
    };
  },
};
