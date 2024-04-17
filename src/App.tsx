import React, { useEffect } from 'react'
import axios from 'axios';
import Blog from './blog';
import './App.css';

function App() {
    const [posts, setPosts] = React.useState([]);

    const fetchPosts = async () => {
      axios
        .get('http://stoltzfus-headless-cms-test.local:51273/wp-json/wp/v2/posts')
        .then((res) => {
          setPosts(res.data);
        });
      }

    useEffect(() => {
      fetchPosts();
    }, []);

    return (
      <div className='posts-container'>
        {posts.map((item) => (
          <Blog
            post={item}
          />
        ))}
      </div>
    );
}

export default App
