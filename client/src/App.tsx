import React from "react";
import "./App.css";
// import { Query } from "react-apollo";
import { GET_ALL_POSTS } from "./queries";
import { useQuery } from "@apollo/react-hooks";

interface Post {
  id: number;
  title: String;
  description: String;
  likes: Number;
  createdDate: String;
}

interface Posts {
  post: Post[];
}

const App = () => {
  const { loading, data, error } = useQuery<Post, Posts>(GET_ALL_POSTS);
  console.log(data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Home</h1>
        {loading && <div>Loading</div>}
        {error && <div>Error</div>}
        {!loading && !error && <p>Feed</p>}
      </header>
    </div>
  );
};

export default App;
