import React, { useState, useEffect } from 'react';
import '../App.css';

const TypewriterText = ({ text, delay, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shouldStart, setShouldStart] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [audio] = useState(new Audio(process.env.PUBLIC_URL + '/audio/typing.mp3'));
  
  // Setup audio
  useEffect(() => {
    audio.volume = 0.2;
    audio.loop = true; // Enable looping
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setShouldStart(true);
    }, delay);

    return () => clearTimeout(startDelay);
  }, [delay]);

  useEffect(() => {
    if (!shouldStart) return;

    if (currentIndex < text.length) {
      // Start playing the looped audio when typing begins
      if (currentIndex === 0) {
        audio.play().catch(err => console.log('Audio play failed:', err));
      }

      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Stop the audio when typing is complete
      audio.pause();
      audio.currentTime = 0;
      setIsComplete(true);
      if (onComplete) {
        onComplete();
      }
    }
  }, [currentIndex, text, shouldStart, onComplete, audio]);

  return (
    <span className={`typewriter ${isComplete ? 'complete' : ''}`}>
      {displayText}
    </span>
  );
};

const Proposal = () => {
  const [yesClicked, setYesClicked] = useState(false);
  const [currentParagraph, setCurrentParagraph] = useState(0);
  const girlfriendName = "Tatum"; // Updated the name

  const handleNoButtonHover = (e) => {
    const container = e.target.closest('.no-button-container');
    
    // Get random position within the viewport, but keep some padding
    const padding = 100;
    const maxX = window.innerWidth - padding;
    const maxY = window.innerHeight - padding;
    
    let newX = Math.random() * maxX;
    let newY = Math.random() * maxY;
    
    // Ensure container stays in viewport
    newX = Math.min(Math.max(newX, padding), maxX);
    newY = Math.min(Math.max(newY, padding), maxY);
    
    // Add moving class and set position
    container.classList.add('moving');
    container.style.left = `${newX}px`;
    container.style.top = `${newY}px`;
    container.style.right = 'auto';
  };

  const paragraphs = [
    "There aren't enough words in the universe to express just how much love, gratitude, and appreciation I have for you. You are, without a doubt, the most incredible person to ever exist, and I count myself unbelievably lucky to have you by my side.",
    "Thank you, my angel, for being my rock—the one I can always lean on. Thank you for cheering me on in everything I do, for believing in me even when I doubt myself, and for loving me so endlessly and effortlessly. You are my entire world, my confidant, my best friend, and my greatest love.",
    "Everything about you is perfect to me—your gorgeous, contagious smile, your soft black hair, those glistening green eyes that pull me in every time, and, most of all, the beautiful heart and soul that make you the most wonderful person to be around.",
    "I love every single moment we share—whether we're cooking and baking together, laughing until we can't breathe, or even crying in each other's arms. You make every second special, even the quiet ones where we're just being lazy together. No one makes me laugh the way you do, and no one makes my heart feel as full as you do."
  ];

  return (
    <div className="container">
      {!yesClicked && (
        <h1 className="title">Will you be my Valentine?</h1>
      )}
      
      <div className="proposal-content">
        {/* Only show photos after yes is clicked */}
        {yesClicked && (
          <div className="photo-column left-photos">
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo1.jpeg"} alt="Us 1" />
            </div>
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo2.jpeg"} alt="Us 2" />
            </div>
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo5.jpeg"} alt="Us 5" />
            </div>
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo6.jpg"} alt="Us 6" />
            </div>
          </div>
        )}

        <div className="proposal-box">
          {!yesClicked ? (
            <div className="button-group">
              <div className="yes-button-container">
                <div className="sparkles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`sparkle sparkle-${i + 1}`} />
                  ))}
                </div>
                <button
                  className="yes-button"
                  onClick={() => setYesClicked(true)}
                >
                  YES!
                </button>
              </div>
              <div className="no-button-container">
                <div className="sparkles red-sparkles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={`sparkle sparkle-${i + 1}`} />
                  ))}
                </div>
                <button 
                  className="no-button"
                  onMouseOver={handleNoButtonHover}
                >
                  No
                </button>
              </div>
            </div>
          ) : (
            <div className="celebration">
              <h2 className="signature">
                <TypewriterText 
                  text={`My Dearest ${girlfriendName},`} 
                  delay={0}
                  onComplete={() => setCurrentParagraph(1)} 
                />
              </h2>
              <div className="love-letter">
                {paragraphs.map((text, index) => (
                  <p key={index} className="love-text">
                    {currentParagraph > index && (
                      <TypewriterText 
                        text={text}
                        delay={0}
                        onComplete={() => setCurrentParagraph(index + 2)}
                      />
                    )}
                  </p>
                ))}
                {currentParagraph > paragraphs.length && (
                  <p className="signature">
                    <TypewriterText 
                      text="I love you endlessly, my beebs. Always and forever. - From Fabio"
                      delay={0}
                    />
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Only show photos after yes is clicked */}
        {yesClicked && (
          <div className="photo-column right-photos">
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo3.jpeg"} alt="Us 3" />
            </div>
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo4.jpeg"} alt="Us 4" />
            </div>
            <div className="photo-frame">
              <img src={process.env.PUBLIC_URL + "/images/photo7.jpg"} alt="Us 7" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposal;