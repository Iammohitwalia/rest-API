import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import TeamGridComponent from './team';

const Home = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulating some loading process
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }, []);
  return (
    <>
    {isLoading ? <Loader /> : <div><h1><TeamGridComponent/></h1></div>}
    </>
    )
}

export default Home