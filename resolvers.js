const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllPosts: async (root, args, { Post }) => {
      const allPosts = await Post.find();
      return allPosts;
    }
  },
  Mutation: {
    addPost: async (
      root,
      { title, description, category, username },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        description,
        category,
        username
      }).save();
      return newPost;
    },

    signupUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });

      if (user) {
        throw new Error("User already exists");
      }

      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.JWT_SECRET, "1hr") };
    }
  }
};
