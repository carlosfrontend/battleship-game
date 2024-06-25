
import Game from './Controllers/Game.mjs';

import './css/style.css';
import footerLogo from './img/ghlogo.png';

const ghLogo = document.querySelector('.gh-logo');
ghLogo.src = footerLogo;

Game();
