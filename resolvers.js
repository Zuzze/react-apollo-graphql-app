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
    }
  }
};
