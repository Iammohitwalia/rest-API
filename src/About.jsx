import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import ProjectsGridComponent from './project';

const About = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // Simulating some loading process
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      }, []);
    
  return (
    <div>
              {isLoading ? <Loader /> : <div><ProjectsGridComponent/></div>}

    </div>
  )
}

export default About