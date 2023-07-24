"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={() => {}} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts)
  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      
      <PromptCardList 
      data={
        posts.filter((post) => {
          return searchText.toLowerCase() === ""
          ? post
          : post.prompt.toLowerCase().includes(searchText) 
          || post.prompt.includes(searchText) 
        })
      } 
      handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
