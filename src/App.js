import React, { useEffect, useState, useRef, useCallback } from 'react';
import Confetti from 'react-confetti';
import Slider from 'react-slick';
// import useWindowSize from 'react-use/lib/useWindowSize';
import { useWindowSize } from 'react-use';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const countdownTarget = new Date('2025-06-18T00:00:00');

const images = [
  {
    src: 'img1.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img2.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img3.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img4.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img5.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img6.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img7.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img8.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img9.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img10.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img11.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img12.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img13.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img14.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
  {
    src: 'img15.jpeg',
    alt: 'Warm family picture with smiles and sunlight.'
  },
];

function formatTimeLeft(timeLeft) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
}

export default function App() {
  const now = new Date();
  const [timeLeft, setTimeLeft] = useState(countdownTarget - now);
  const [isUnlocked, setIsUnlocked] = useState(timeLeft <= 0);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiTimeoutRef = useRef(null);

  const { width, height } = useWindowSize();

  const audioRef = useRef(null);
  const [audioPlaying, setAudioPlaying] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (isUnlocked) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = countdownTarget - now;
      if (diff <= 0) {
        setTimeLeft(0);
        setIsUnlocked(true);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isUnlocked]);

  // Play music on unlock and user interaction
  useEffect(() => {
    if (isUnlocked) {
      // Try to play immediately - may be blocked by browser
      const playPromise = audioRef.current?.play();
      if (playPromise !== undefined) {
        playPromise.then(() => setAudioPlaying(true)).catch(() => setAudioPlaying(false));
      }
    } else {
      setAudioPlaying(false);
      audioRef.current?.pause();
    }
  }, [isUnlocked]);

  // Handle user interaction to start audio if not already playing
  const handleUserInteraction = useCallback(() => {
    if (isUnlocked && !audioPlaying) {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {});
    }
    // Show confetti briefly on every interaction
    setShowConfetti(true);
    if (confettiTimeoutRef.current) clearTimeout(confettiTimeoutRef.current);
    confettiTimeoutRef.current = setTimeout(() => setShowConfetti(false), 1000);
  }, [isUnlocked, audioPlaying]);

  const time = formatTimeLeft(timeLeft);

  // React Slick settings for carousel
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 350,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: false,
    pauseOnHover: false
  };

  return (
    <div
      onClick={handleUserInteraction}
      onTouchStart={handleUserInteraction}
      style={{
        fontFamily: "'Poppins', sans-serif",
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        height: '100vh',
        margin: 0,
        color: '#5a2a27',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isUnlocked ? 'flex-start' : 'center',
        alignItems: 'center',
        padding: '24px',
        overflowX: 'hidden',
        userSelect: 'none',
        textAlign: 'center',
      }}
      aria-label="Parent's anniversary interactive page"
    >
      {!isUnlocked ? (
        <>
          <h1 style={{ fontSize: '3rem', marginBottom: '16px', fontWeight: '900' }}>
            Counting down to your Engagement Anniversary YAYYYYYY
          </h1>
          <div
            role="timer"
            aria-live="polite"
            aria-atomic="true"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '24px',
              fontWeight: '700',
              fontSize: '2rem',
            }}
          >
            <div>
              <div>{time.days}</div>
              <div style={{ fontSize: '0.875rem' }}>Days</div>
            </div>
            <div>
              <div>{time.hours.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: '0.875rem' }}>Hours</div>
            </div>
            <div>
              <div>{time.minutes.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: '0.875rem' }}>Minutes</div>
            </div>
            <div>
              <div>{time.seconds.toString().padStart(2, '0')}</div>
              <div style={{ fontSize: '0.875rem' }}>Seconds</div>
            </div>
          </div>
          <p style={{ marginTop: '24px', fontSize: '1.25rem', opacity: 0.9 }}>
            Keep Watching. Reload on 18th. 
          </p>
          <span
            className="material-icons"
            style={{ fontSize: '72px', marginTop: '32px', color: '#db7093' }}
            aria-hidden="true"
          >
            favorite
          </span>
        </>
      ) : (
        <>
          <h1
            style={{ fontWeight: '900', fontSize: '2.75rem', marginBottom: '16px', userSelect: 'text' }}
          >
            Happy Engagement Anniversary, Mama & Papa!
          </h1>
          <div style={{ maxWidth: '500px', width: '100%', userSelect: 'none' }}>
            <Slider {...sliderSettings} aria-label="Slideshow of Anniversary Pictures">
              {images.map(({ src, alt }, index) => (
                <div key={index} style={{ outline: 'none', userSelect: 'none' }}>
                  <img
                    src={src}
                    alt={alt}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '16px',
                      boxShadow: '0 8px 20px rgba(219, 112, 147, 0.35)',
                      userSelect: 'none',
                    }}
                    draggable={false}
                  />
                </div>
              ))}
            </Slider>
          </div>
          <audio
            ref={audioRef}
            src="song.mp3"
            loop
            controls
            preload="auto"
            style={{ marginTop: '24px', outline: 'none', borderRadius: '12px' }}
            aria-label="Background music for anniversary slideshow"
          />
          <p
            style={{
              marginTop: '16px',
              fontSize: '1rem',
              opacity: 0.85,
              fontStyle: 'italic',
              userSelect: 'text',
            }}
          >
            Touch Screen :P
          </p>
        </>
      )}

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={1000}  // more confetti for full screen
          gravity={0.5}
          colors={['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#c71585']}
          recycle={false}
          initialVelocityX={{ min: -6, max: 10 }}
          initialVelocityY={{ min: -15, max: 1000 }}
        />
        // <Confetti
        //   width={width}
        //   height={height}
        //   numberOfPieces={80}
        //   gravity={0.5}
        //   colors={['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#c71585']}
        //   recycle={false}
        //   initialVelocityX={{ min: -6, max: 6 }}
        //   initialVelocityY={{ min: -10, max: 0 }}
        //   // Use custom confetti shapes by replacing canvas drawing would require
        //   // overriding react-confetti. Instead, this uses pink hues for hearts.
        // />
      )}

      {/* Material Icons font link - include dynamically (alternative is in index.html) */}
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
        crossOrigin="anonymous"
      />
    </div>
  );
}

