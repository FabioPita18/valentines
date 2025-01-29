import React, { useState, useEffect } from 'react';
import SquareHeart from './SquareHeart';
import LoadingBar from './LoadingBar';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isHeartFallen, setIsHeartFallen] = useState(false);
  const [showProceed, setShowProceed] = useState(false);

  const handleProceedClick = () => {
    const button = document.querySelector('.proceed-text');
    if (!button) return;
    
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      button.style.transform = 'scale(1.1)';
      setTimeout(() => {
        onLoadingComplete();
      }, 150);
    }, 150);
  };

  useEffect(() => {
    const duration = 3000; // 3 seconds total
    const interval = 30; // Update every 30ms for smooth animation
    const steps = duration / interval;
    const incrementAmount = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = Math.min(prevProgress + incrementAmount, 100);
        if (newProgress === 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsComplete(true);
            // Start heart fall animation after loading completes
            setTimeout(() => {
              setIsHeartFallen(true);
              // Show proceed text after heart falls and starts bouncing
              setTimeout(() => {
                setShowProceed(true);
              }, 1000); // Show proceed after fall animation
            }, 500); // Start falling after moving up
          }, 500); // Complete loading
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loading-screen">
      <div className={`heart-wrapper ${isComplete ? 'complete' : ''} ${isHeartFallen ? 'fallen' : ''}`}>
        <SquareHeart progress={progress} />
      </div>
      <div className={`loading-content ${isComplete ? 'complete' : ''}`}>
        {!isComplete && (
          <div className="loading-bar-container">
            <LoadingBar progress={progress} />
            <span className="percentage-text">{Math.round(progress)}%</span>
          </div>
        )}
        {showProceed && (
          <div className="proceed-container">
            <div className="sparkles">
              {[...Array(6)].map((_, i) => (
                <div key={i} className={`sparkle sparkle-${i + 1}`} />
              ))}
            </div>
            <p 
              className="loading-text proceed-text"
              onClick={handleProceedClick}
            >
              Proceed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen; 