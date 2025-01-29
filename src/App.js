import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Proposal from './components/Proposal';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLoadingComplete = () => {
    // Start the transition
    setIsTransitioning(true);
    
    // Remove loading screen after transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Match this with the CSS transition duration
  };

  return (
    <>
      {isLoading && (
        <div className={`loading-screen ${isTransitioning ? 'fade-out' : ''}`}>
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        </div>
      )}
      <div className={`proposal-container ${!isLoading ? 'visible' : ''}`}>
        <Proposal />
      </div>
    </>
  );
}

export default App;