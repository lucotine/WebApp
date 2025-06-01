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

  

  // When user clicks Play on games
  startSnakeGame();
  startTetrisGame();
});


