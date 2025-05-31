/* Reset and base styles */
document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcome-screen');
  const homeMenu = document.getElementById('home-menu');
  const gameContainer = document.getElementById('game-container');
  const gameArea = document.getElementById('game-area');
  const enterButton = document.getElementById('enter-button');
  const backBtn = document.getElementById('back-to-menu');
  const navbar = document.getElementById('navbar');

  // Boot animation for welcome screen
  setTimeout(() => {
    document.querySelector('.boot-title').style.animation = 'boot-fade-in 0.8s forwards';
  }, 1700);
  setTimeout(() => {
    document.querySelector('.boot-btn').style.animation = 'boot-fade-in 0.8s forwards';
  }, 2100);

  // Enter button
  enterButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    homeMenu.style.display = 'block';
    navbar.style.display = 'block';
  });

  // Play button for games
  document.querySelectorAll('.game-card button').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (idx === 2) { // Snake
        homeMenu.style.display = 'none';
        gameContainer.style.display = 'flex';
        startSnakeGame();
      } else {
        alert('This game is not implemented yet!');
      }
    });
  });

  // Back to menu button
  backBtn.addEventListener('click', () => {
    gameContainer.style.display = 'none';
    homeMenu.style.display = 'block';
    gameArea.innerHTML = '';
    document.onkeydown = null; // Remove snake controls
  });

  // Simple Snake Game
  function startSnakeGame() {
    // Show menu first
    gameArea.innerHTML = `
      <div id="snake-menu">
        <h2>🐍 Snake</h2>
        <button id="snake-play-btn">Play</button>
        <div id="snake-highscore">High Score: <span id="snake-highscore-value">0</span></div>
      </div>
      <div id="snake-game-wrapper" style="display:none;">
        <canvas id="snake-canvas" width="480" height="480"></canvas>
        <div id="snake-score" style="font-size:1.2em;margin:12px 0;">Score: 0</div>
        <button id="restart-snake-btn" style="display:none;">Restart</button>
      </div>
    `;

    // High score from localStorage
    let highScore = parseInt(localStorage.getItem('snakeHighScore') || '0');
    document.getElementById('snake-highscore-value').textContent = highScore;

    document.getElementById('snake-play-btn').onclick = () => {
      document.getElementById('snake-menu').style.display = 'none';
      document.getElementById('snake-game-wrapper').style.display = '';
      runSnakeGame();
    };

    function runSnakeGame() {
      const canvas = document.getElementById('snake-canvas');
      const ctx = canvas.getContext('2d');
      const scoreDisplay = document.getElementById('snake-score');
      const restartBtn = document.getElementById('restart-snake-btn');

      let snake = [{x: 240, y: 240}];
      let direction = {x: 24, y: 0};
      let food = {x: 120, y: 120};
      let gameOver = false;
      let intervalId = null;
      let score = 0;

      function draw() {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, 480, 480);

        // Draw food
        ctx.fillStyle = '#baffc9';
        ctx.fillRect(food.x, food.y, 24, 24);

        // Draw snake
        ctx.fillStyle = '#fff';
        snake.forEach(part => ctx.fillRect(part.x, part.y, 24, 24));
      }

      function move() {
        const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
        snake.unshift(head);

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          score++;
          scoreDisplay.textContent = 'Score: ' + score;
          food = {
            x: Math.floor(Math.random() * 20) * 24,
            y: Math.floor(Math.random() * 20) * 24
          };
        } else {
          snake.pop();
        }

        // Collision
        if (
          head.x < 0 || head.x >= 480 || head.y < 0 || head.y >= 480 ||
          snake.slice(1).some(part => part.x === head.x && part.y === head.y)
        ) {
          gameOver = true;
        }
      }

      function loop() {
        if (gameOver) {
          ctx.fillStyle = '#ff3860';
          ctx.font = '32px monospace';
          ctx.fillText('Game Over', 120, 240);
          restartBtn.style.display = '';
          // Save high score
          if (score > highScore) {
            highScore = score;
            localStorage.setItem('snakeHighScore', highScore);
          }
          document.getElementById('snake-highscore-value').textContent = highScore;
          return;
        }
        move();
        draw();
        intervalId = setTimeout(loop, 100);
      }

      function restartGame() {
        snake = [{x: 240, y: 240}];
        direction = {x: 24, y: 0};
        food = {x: 120, y: 120};
        gameOver = false;
        score = 0;
        scoreDisplay.textContent = 'Score: 0';
        draw();
        loop();
        restartBtn.style.display = 'none';
      }

      restartBtn.onclick = restartGame;

      // Prevent arrow key scrolling and handle controls
      function handleKey(e) {
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
        if (e.key === 'ArrowUp' && direction.y === 0) direction = {x: 0, y: -24};
        if (e.key === 'ArrowDown' && direction.y === 0) direction = {x: 0, y: 24};
        if (e.key === 'ArrowLeft' && direction.x === 0) direction = {x: -24, y: 0};
        if (e.key === 'ArrowRight' && direction.x === 0) direction = {x: 24, y: 0};
        if (gameOver && e.key === 'Enter') restartGame();
      }
      document.addEventListener('keydown', handleKey, { passive: false });

      draw();
      loop();
    }
  }
});


