/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from 'react';
import P from 'prop-types';
import './App.css';

// New Component /
const Post = ({ post }) => {
   console.log('filho');
   return (
      <div key={post.id} className="post">
         <h1>{post.title}</h1>
         <p>{post.body}</p>
      </div>
   );
};

//Tipagem
Post.prototype = {
   post: P.shape({
      id: P.number,
      title: P.string,
      body: P.string,
   }),
};

function App() {
   const [posts, setPosts] = useState([]);
   const [value, setValue] = useState('');
   console.log('pai');

   //component did mount
   useEffect(() => {
      setTimeout(() => {
         fetch('https://jsonplaceholder.typicode.com/posts')
            .then((r) => r.json())
            .then((r) => setPosts(r));
      }, 2000);
   }, []);

   return (
      <div className="App">
         <p>
            <input
               type="search"
               value={value}
               onChange={(e) => setValue(e.target.value)}
            />
         </p>
         {useMemo(() => {
            return (
               posts.length > 0 &&
               posts.map((post) => {
                  return <Post key={post.id} post={post} />;
               })
            );
         }, [posts])}
         {posts.length <= 0 && <p>Ainda nao tem post espere 2min</p>}
      </div>
   );
}
export default App;
