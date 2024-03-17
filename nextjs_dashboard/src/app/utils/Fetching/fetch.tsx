"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = () => {
    const [photosRes, setPhotosRes] = useState([]);
    const [postsRes, setPostsRes] = useState([]);
    const [loading,setLoading] = useState(false)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true)
          const [photosResponse, postsResponse] = await Promise.all([
            axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=100`),
            axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=100`),
          ]);
          setPhotosRes(photosResponse.data);
          setPostsRes(postsResponse.data);
        } catch (error) {
          setLoading(false)
          console.error('Error fetching data:', error);
        }finally{
          setLoading(false)
        }
      };
      fetchData();
    }, []);
  
    return { photosRes, postsRes,loading };
}

export default useFetch;
