import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";



const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <h2>Your image is cooking...</h2>
      <div class="loading-circle">
        <ClipLoader
          size={225}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
};

export default LoadingScreen;