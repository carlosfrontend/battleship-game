import Game from './Controllers/Game.mjs';
import './css/style.css';
import footerLogo from './img/ghlogo.png';
// eslint-disable-next-line no-unused-vars
import battleShipBackground from './img/battleship.jpg';

const ghLogo = document.querySelector('.gh-logo');

ghLogo.src = footerLogo;


Game();
