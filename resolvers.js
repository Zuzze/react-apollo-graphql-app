exports.resolvers = {
  Query: {
    getAllPosts: () => {}
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
