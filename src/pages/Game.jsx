import React, { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, Heart, Trash2, ArrowLeft, ArrowRight, Play } from 'lucide-react';
import './Game.css';

const GAME_WIDTH = 400; // max width
const GAME_HEIGHT = 500;
const BIN_WIDTH = 60;
const BIN_HEIGHT = 70;
const ITEM_SIZE = 40;

const Game = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerX, setPlayerX] = useState(50); // percentage 0-100
  const [items, setItems] = useState([]);
  
  const gameAreaRef = useRef(null);
  const requestRef = useRef();
  const lastTimeRef = useRef();
  const spawnTimerRef = useRef(0);
  const updateGameRef = useRef();
  
  const gameOver = () => {
    setIsPlaying(false);
    setIsGameOver(true);
    cancelAnimationFrame(requestRef.current);
  };

  // Main Game Loop
  const updateGame = useCallback((time) => {
    // Game Items Config
    const ITEM_TYPES = [
      { type: 'good', emoji: '📄', points: 10 },
      { type: 'good', emoji: '🍎', points: 10 },
      { type: 'good', emoji: '🥤', points: 10 },
      { type: 'bad', emoji: '☢️', points: -20, damage: 1 }, // Hazard
    ];
    if (!lastTimeRef.current) lastTimeRef.current = time;
    const deltaTime = time - lastTimeRef.current;
    
    if (deltaTime > 16) { // Run approx ~60fps
      lastTimeRef.current = time;
      
      setItems(prevItems => {
        let newItems = [...prevItems];
        
        // Spawn Mechanics
        spawnTimerRef.current += deltaTime;
        if (spawnTimerRef.current > 1000) { // spawn every 1 second
          spawnTimerRef.current = 0;
          const randomType = ITEM_TYPES[Math.floor(Math.random() * ITEM_TYPES.length)];
          newItems.push({
            id: Date.now() + Math.random(),
            x: Math.random() * 90, // Random X from 0% to 90%
            y: 0, // Starts at top (0px)
            speed: 3 + Math.random() * 2, // Falling speed
            ...randomType
          });
        }
        
        // Move items down and check collisions
        let activeItems = [];
        let livesLostCount = 0;
        let scoreGained = 0;
        
        for (let item of newItems) {
          item.y += item.speed;
          
          // Collision Check
          // Player is at bottom: Y = GAME_HEIGHT - BIN_HEIGHT
          // We assume a percentage X for player
          if (item.y + ITEM_SIZE >= GAME_HEIGHT - BIN_HEIGHT && item.y <= GAME_HEIGHT) {
            // Check X overlap
            // The item X is percentage, player X is percentage.
            const itemAbsX = (item.x / 100) * gameAreaRef.current?.offsetWidth || GAME_WIDTH;
            const playerAbsX = (playerX / 100) * gameAreaRef.current?.offsetWidth || GAME_WIDTH;
            
            // If they intersect
            if (Math.abs(itemAbsX - playerAbsX) < BIN_WIDTH / 1.5) {
                if (item.type === 'good') {
                  scoreGained += item.points;
                } else if (item.type === 'bad') {
                  livesLostCount += item.damage;
                }
                continue; // Item caught (don't push to active)
            }
          }
          
          // Missed item
          if (item.y > GAME_HEIGHT) {
             if (item.type === 'good') {
                livesLostCount += 1; // missing good items drops a life
             }
             // bad items missed is totally fine
             continue;
          }
          
          activeItems.push(item);
        }
        
        // Apply state changes from loop
        if (scoreGained !== 0) {
          setScore(s => s + scoreGained);
        }
        
        if (livesLostCount > 0) {
          setLives(l => {
            const newLives = l - livesLostCount;
            if (newLives <= 0) gameOver();
            return newLives;
          });
        }
        
        return activeItems;
      });
    }
    
    // Only continue if not game over
    if (requestRef.current) {
        requestRef.current = requestAnimationFrame(updateGameRef.current);
    }
  }, [playerX]);

  // Set the ref to the function after render
  useEffect(() => {
    updateGameRef.current = updateGame;
  }, [updateGame]);

  const startGame = () => {
    setIsPlaying(true);
    setIsGameOver(false);
    setScore(0);
    setLives(3);
    setItems([]);
    setPlayerX(50);
    spawnTimerRef.current = 0;
    lastTimeRef.current = performance.now();
    requestRef.current = requestAnimationFrame(updateGameRef.current);
  };

  const movePlayer = (direction) => {
    setPlayerX(prev => {
      const moveAmount = 8; // move by 8% each tap
      if (direction === 'left') return Math.max(0, prev - moveAmount);
      if (direction === 'right') return Math.min(100, prev + moveAmount);
      return prev;
    });
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying) return;
      if (e.key === 'ArrowLeft') movePlayer('left');
      if (e.key === 'ArrowRight') movePlayer('right');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Clean up animation frame on unmount
  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying, updateGame]);

  return (
    <div className="game-wrapper">
      <div className="container game-container">
        
        <div className="game-header">
          <h1 className="game-title">Catch the Waste!</h1>
          <p>Collect recyclables, but avoid toxic radiation waste (☢️). Missing good waste hurts your campus!</p>
        </div>

        <div className="game-board-card">
          {/* HUD */}
          <div className="game-hud">
             <div className="score">Score: {score}</div>
             <div className="lives">
               {[...Array(Math.max(0, lives))].map((_, i) => (
                 <Heart key={i} size={20} fill="#e74c3c" color="#e74c3c" />
               ))}
             </div>
          </div>

          {/* Canvas area */}
          <div className="game-area" ref={gameAreaRef} style={{ height: GAME_HEIGHT }}>
            
            {!isPlaying && !isGameOver && (
              <div className="game-overlay">
                <div className="game-instructions">
                  <h3>How to Play</h3>
                  <p>Move the bin left and right.</p>
                  <p>Catch: 📄 🍎 🥤</p>
                  <p>Avoid: ☢️</p>
                </div>
                <button className="btn btn-primary btn-game" onClick={startGame}>
                  <Play size={20} /> Start Game
                </button>
              </div>
            )}

            {isGameOver && (
              <div className="game-overlay over">
                <h2>Game Over!</h2>
                <p>Final Score: <strong>{score}</strong></p>
                <button className="btn btn-primary mt-4 btn-game" onClick={startGame}>
                  <RefreshCw size={20} /> Try Again
                </button>
              </div>
            )}

            {/* Render Items */}
            {items.map(item => (
              <div 
                key={item.id} 
                className={`falling-item ${item.type}`}
                style={{ 
                  left: `${item.x}%`, 
                  top: `${item.y}px`,
                  width: ITEM_SIZE,
                  height: ITEM_SIZE,
                }}
              >
                {item.emoji}
              </div>
            ))}

            {/* Render Player Bin */}
            <div 
              className="player-bin" 
              style={{
                left: `calc(${playerX}% - ${BIN_WIDTH/2}px)`,
                width: BIN_WIDTH,
                height: BIN_HEIGHT
              }}
            >
              <Trash2 size={40} color="white" />
            </div>
            
          </div>

          {/* Mobile Controls */}
          {isPlaying && (
             <div className="mobile-controls">
                <button className="ctrl-btn left" onClick={() => movePlayer('left')} onTouchStart={() => movePlayer('left')}>
                  <ArrowLeft size={32} />
                </button>
                <button className="ctrl-btn right" onClick={() => movePlayer('right')} onTouchStart={() => movePlayer('right')}>
                  <ArrowRight size={32} />
                </button>
             </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Game;
