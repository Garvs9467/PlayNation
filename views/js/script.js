/*=====================================================================
  script.js – Play Nation (Full Version)
  • All pages: auth navbar (username + logout)
  • Home, Top Games, Categories: game gallery + search
  • Login, Signup, Forgot, Reset, Contact
=====================================================================*/

const GAMES = [
  { title: "Clash of Clans", category: "Strategy", link: "https://supercell.com/en/games/clashofclans/", imageSrc: "https://images.sftcdn.net/images/t_app-icon-m/p/29b5d97a-97ae-4aa8-9f06-ebc8193da10a/2716175944/clash-of-clans-download-Clash-of-Clans-for-Windows.jpg", description: "Build your village, raise a clan, and battle in epic wars", element: null },
  { title: "Clash Royale", category: "Strategy", link: "https://supercell.com/en/games/clashroyale/", imageSrc: "https://images.sftcdn.net/images/t_app-icon-m/p/f33c9661-4c68-4a4c-b79d-dbf53aa8a1c5/1371475041/clash-royale-clash-royale-icon.jpg", description: "Collect cards, build your deck, and duel players in real-time battles", element: null },
  { title: "Candy Crush Saga", category: "Arcade", link: "https://king.com/game/candycrush", imageSrc: "https://th.bing.com/th/id/OIP.NyPQgzIU3gQGWZVzp9UJ8gHaEo?w=299&h=186&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Match colorful candies and solve sweet puzzles to progress", element: null },
  { title: "Free Fire", category: "Battle Royale", link: "https://ff.garena.com/", imageSrc: "https://th.bing.com/th/id/OIP.J3odRvXgsQ8iRErJoyOFXAHaEK?w=283&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Survive fast-paced 10-minute matches and claim victory as the last one standing", element: null },
  { title: "PUBG Mobile", category: "Battle Royale", link: "https://www.pubgmobile.com/en-US/home.shtml", imageSrc: "https://th.bing.com/th/id/OIP.85RoMB7_QHjmOcfZ6DiJjwHaHa?w=178&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Drop in, gear up, and fight your way to become the lone survivor", element: null },
  { title: "COD Mobile", category: "Battle Royale", link: "https://www.callofduty.com/mobile", imageSrc: "https://th.bing.com/th/id/OIP.bfD4G188gAJtNgeQyZ2mLwHaD4?w=255&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Join iconic missions, team up with friends, and dominate every battlefield!", element: null },
  { title: "Subway Surfers", category: "Runner", link: "https://sybo.com/games/subway-surfers/", imageSrc: "https://th.bing.com/th/id/OIP.NJlfb44TlNjUM0UFFtP9ewHaNL?w=186&h=331&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Dash, dodge, and surf through the city to escape the inspector", element: null },
  { title: "Temple Run 2", category: "Runner", link: "https://imangistudios.com/games/temple-run-2/", imageSrc: "https://th.bing.com/th/id/OIP.-OamL4VCAUc-o5vkh9RnJwHaNJ?w=186&h=331&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Run for your life, jump obstacles, and escape the cursed temple", element: null },
  { title: "Among Us", category: "Party", link: "https://innersloth.com/games/among-us/", imageSrc: "https://th.bing.com/th/id/OIP.HgZcsM-45ZOiIVidHtfzFQHaJ4?w=130&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Complete tasks with your crew — or deceive them as the imposter", element: null },
  { title: "Hill Climb Racing", category: "Arcade", link: "https://fingersoft.com/games/hill-climb-racing/", imageSrc: "https://th.bing.com/th/id/OIP.EydLrTAKJo5v-t_HCfEqYwHaEL?w=303&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Defy gravity and race up hills in quirky vehicles with endless fun!", element: null },
  { title: "8 Ball Pool", category: "Sports", link: "https://www.miniclip.com/games/8-ball-pool/", imageSrc: "https://th.bing.com/th/id/OIP.hENV72TslIHXjRIu82heTgHaEK?w=290&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Challenge friends and show off your cue skills in classic pool matches", element: null },
  { title: "Fruit Ninja", category: "Arcade", link: "https://halfbrick.com/games/fruitninja", imageSrc: "https://th.bing.com/th/id/OIP.mTiMCTqw25NH1uz9mTcEdAHaEo?w=266&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "<p>Slice and dice juicy fruits in the most satisfying arcade challenge ever!</p>", element: null },
  { title: "Minecraft", category: "Sandbox", link: "https://www.minecraft.net/", imageSrc: "https://th.bing.com/th/id/OIP.0L9oSnoLyNKnqNE4jLTUBAHaEK?w=305&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3", description: "Build, explore, and survive in an endless world of creativity and adventure", element: null },
];

/*=====================================================================
  DOM READY – Run on every page
=====================================================================*/
document.addEventListener('DOMContentLoaded', () => {
  const currentPage = location.pathname.split('/').pop() || 'index.html';

  // ——— COMMON FOR ALL PAGES ———
  setupNavigation();     // mobile menu + active link
  initAuthNavbar();      // ← NEW: Show username + logout on ALL pages

  // ——— PAGE-SPECIFIC INITIALIZATION ———
  if (['home.html', 'top_games.html', 'categories.html', ''].includes(currentPage)) {
    initializeGameCards();
    setupGallerySearch();
  }

  if (currentPage === 'login.html') setupLoginForm();
  if (currentPage === 'signup.html') setupSignupForm();
  if (currentPage === 'forgot.html') setupForgotForm();
  if (currentPage === 'reset.html') setupResetForm();
  if (currentPage === 'contact.html') setupContactForm();
});

/*=====================================================================
  1. AUTH NAVBAR – Works on ALL pages
=====================================================================*/
function initAuthNavbar() {
  const authLink = document.getElementById('authLink');
  const titleEl = document.querySelector('header h1');

  if (!authLink || !titleEl) {
    console.warn('Missing authLink or header h1 – skipping auth navbar');
    return;
  }

  fetch('/api/auth/status', { credentials: 'include' })
    .then(r => r.json())
    .then(data => {
      console.log('Auth status:', data);

      if (data.loggedIn) {
        // — LOGGED IN —
        authLink.textContent = 'Logout';
        authLink.href = '#';
        authLink.id = 'logoutBtn';

        titleEl.innerHTML = `Play Nation <small style="color:#3498db;">(${data.username})</small>`;

        authLink.onclick = e => {
          e.preventDefault();
          fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
            .then(() => location.href = '/login.html');
        };
      } else {
        // — NOT LOGGED IN —
        const protected = ['home.html', 'top_games.html', 'categories.html'];
        if (protected.includes(location.pathname.split('/').pop())) {
          location.href = '/login.html';
        } else {
          authLink.textContent = 'Login';
          authLink.href = '/login.html';
        }
      }
    })
    .catch(err => {
      console.error('Auth check failed:', err);
      authLink.textContent = 'Login';
      authLink.href = '/login.html';
    });
}

/*=====================================================================
  2. LOGIN FORM
=====================================================================*/
function setupLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const msgEl = document.getElementById('msg');

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();

    msgEl.style.color = res.ok ? '#27ae60' : '#e74c3c';
    msgEl.textContent = json.msg;

    if (res.ok) setTimeout(() => location.href = '/home.html', 1000);
  });
}

/*=====================================================================
  3. SIGNUP FORM
=====================================================================*/
function setupSignupForm() {
  const form = document.getElementById('signupForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    const msgEl = document.getElementById('msg');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    const json = await res.json();

    msgEl.textContent = json.msg;
    msgEl.style.color = res.ok ? '#27ae60' : '#e74c3c';

    if (res.ok) setTimeout(() => location.href = '/login.html', 1500);
  });
}

/*=====================================================================
  4. FORGOT PASSWORD
=====================================================================*/
function setupForgotForm() {
  const form = document.getElementById('forgotForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const msgEl = document.getElementById('msg');

    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    const json = await res.json();

    msgEl.textContent = json.msg;
    msgEl.style.color = res.ok ? '#27ae60' : '#e74c3c';
  });
}

/*=====================================================================
  5. RESET PASSWORD
=====================================================================*/
function setupResetForm() {
  const params = new URLSearchParams(location.search);
  const tokenInput = document.getElementById('token');
  if (tokenInput) tokenInput.value = params.get('token') || '';

  const form = document.getElementById('resetForm');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const token = document.getElementById('token').value;
    const password = document.getElementById('password').value;
    const msgEl = document.getElementById('msg');

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    const json = await res.json();

    msgEl.textContent = json.msg;
    msgEl.style.color = res.ok ? '#27ae60' : '#e74c3c';

    if (res.ok) setTimeout(() => location.href = 'login.html', 2000);
  });
}

/*=====================================================================
  6. GAME CARDS INITIALIZATION
=====================================================================*/
function initializeGameCards() {
  const container = document.getElementById('game-gallery');
  if (!container) return;

  GAMES.forEach(game => {
    let card = Array.from(container.querySelectorAll('.game-card h3'))
      .find(h3 => h3.textContent.trim() === game.title)
      ?.closest('.game-card');

    if (!card) {
      card = container.querySelector('.game-card:not([data-init])');
      if (card) card.dataset.init = 'true';
    }

    if (!card) return;
    game.element = card;

    const titleEl = card.querySelector('h3');
    const descEl = card.querySelector('p');
    const imgEl = card.querySelector('.game-image');
    const btn = card.querySelector('.play-button');

    if (titleEl) titleEl.textContent = game.title;
    if (descEl) descEl.innerHTML = game.description;
    if (imgEl && game.imageSrc) {
      imgEl.src = game.imageSrc;
      imgEl.alt = game.title;
    }
    if (btn && game.link) {
      btn.href = game.link;
      btn.target = '_blank';
    }
  });
}

/*=====================================================================
  7. GALLERY SEARCH
=====================================================================*/
function setupGallerySearch() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  input.addEventListener('keyup', () => {
    const term = input.value.toLowerCase();
    GAMES.forEach(game => {
      if (!game.element) return;
      const title = game.title.toLowerCase();
      const desc = game.element.querySelector('p').textContent.toLowerCase();
      game.element.style.display = title.includes(term) || desc.includes(term) ? 'block' : 'none';
    });
  });
}

/*=====================================================================
  8. NAVIGATION (mobile + active link)
=====================================================================*/
function setupNavigation() {
  const btn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('sidebar');
  const links = document.querySelectorAll('.nav-links a, .sidebar a');
  const cur = location.pathname.split('/').pop() || 'index.html';

  if (btn && sidebar) {
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }

  links.forEach(a => {
    const href = a.getAttribute('href').split('/').pop();
    a.classList.toggle('active', href === cur);
  });
}

/*=====================================================================
  9. CONTACT FORM
=====================================================================*/
function setupContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    const btn = form.querySelector("button[type=submit]");
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const json = await res.json();

      alert(json.msg);
      if (res.ok) {
        form.reset();
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = originalText;
    }
  });
}