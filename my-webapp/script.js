/* Reset and base styles */
document.addEventListener('DOMContentLoaded', () => {
  // Element references
  const welcomeScreen = document.getElementById('welcome-screen');
  const homeMenu = document.getElementById('home-menu');
  const gameContainer = document.getElementById('game-container');
  const gameArea = document.getElementById('game-area');
  const enterButton = document.getElementById('enter-button');
  const backBtn = document.getElementById('back-to-menu');
  const navbar = document.getElementById('navbar');
  const settingsModal = document.getElementById('settings-modal');
  const closeSettings = document.getElementById('close-settings');
  const darkModeToggle = document.getElementById('dark-mode-toggle');

  // Boot animation for welcome screen
  setTimeout(() => {
    document.querySelector('.boot-title').style.animation = 'boot-fade-in 0.8s forwards';
  }, 1700);
  setTimeout(() => {
    document.querySelector('.boot-btn').style.animation = 'boot-fade-in 0.8s forwards';
  }, 2100);

  // Enter button: show home menu and navbar
  enterButton.addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    homeMenu.style.display = 'block';
    navbar.style.display = 'block';
  });

  // Play button for games
  document.querySelectorAll('.game-card button').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      homeMenu.style.display = 'none';
      gameContainer.style.display = 'flex';
      gameArea.innerHTML = '';
      if (idx === 1) {
        startTetrisGame();
      } else if (idx === 2) {
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
    document.onkeydown = null; // Remove snake controls if any
  });

  // Navbar links
  document.getElementById('nav-home').addEventListener('click', (e) => {
    e.preventDefault();
    homeMenu.style.display = 'block';
    gameContainer.style.display = 'none';
    if (settingsModal) settingsModal.style.display = 'none';
  });

  document.getElementById('nav-about').addEventListener('click', (e) => {
    e.preventDefault();
    homeMenu.style.display = 'none';
    gameContainer.style.display = 'none';
    if (settingsModal) settingsModal.style.display = 'none';
    alert('About section coming soon!');
  });

  document.getElementById('nav-settings').addEventListener('click', (e) => {
    e.preventDefault();
    if (settingsModal) settingsModal.style.display = 'flex';
  });

  // Settings modal close logic
  if (closeSettings && settingsModal) {
    closeSettings.onclick = function() {
      settingsModal.style.display = 'none';
    };
    settingsModal.onclick = function(e) {
      if (e.target === this) this.style.display = 'none';
    };
  }

  // Dark mode toggle logic
  if (darkModeToggle) {
    // Load saved preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.checked = true;
    }
    darkModeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
      }
    });
  }
});


