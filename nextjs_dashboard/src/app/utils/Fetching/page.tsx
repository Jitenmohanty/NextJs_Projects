"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [photosRes, setPhotosRes] = useState([]);
    const [postsRes, setPostsRes] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const [photosResponse, postsResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=100`),
            axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=100`),
          ]);
          setPhotosRes(photosResponse.data);
          setPostsRes(postsResponse.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    return { photosRes, postsRes };
}

export default useFetch;
