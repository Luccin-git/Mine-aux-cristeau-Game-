// Fichier js/Script.js


// Récupération des éléments du DOM
const hero = document.getElementById('hero');
const versDroite = document.getElementById('versdroite');
const versGauche = document.getElementById('versgauche');
const versLeHaut = document.getElementById('verslehaut');
const versLeBas = document.getElementById('verslebas');
const quitter = document.getElementById('quitter');

const pioche = document.getElementById('Gpourcentage');
const pourcentage = document.getElementById('pourcentage');
const scoreElement = document.getElementById('score');

let forcePioche = 40;
let forcePiocheInitiale = 40;
let score = 0;


// Variables pour la position du héros
let positionX = 12; // Position initiale du héros en unités de tuiles (largeur)
let positionY = 7;  // Position initiale du héros en unités de tuiles (hauteur)

// Dimensions de la zone de jeu
const gameWidth = 25;
const gameHeight = 15;

/// Fonction pour déplacer le héros et gérer la pioche
function deplacer(dx, dy) {
  const newX = positionX + dx;
  const newY = positionY + dy;

  if (newX >= 0 && newX < gameWidth && newY >= 0 && newY < gameHeight) {
    if (donjon[newY][newX] !== 'vide') {
      if (forcePioche > 0) {
        forcePioche--;
        if (donjon[newY][newX] === 'cristal') {
          score++;
          scoreElement.textContent = score;
        }
        donjon[newY][newX] = 'vide';
        game.children[newY+1].children[newX].firstChild.src = 'img/tile_vide.png';
        pioche.style.width = (150 * forcePioche / forcePiocheInitiale) + 'px';
        pourcentage.textContent = `${forcePioche}/${forcePiocheInitiale}`;
      } else {
        // Si la force de pioche est épuisée, empêcher le déplacement.
        return;
      }
    }
    // Déplacer le héros dans tous les cas, même lorsqu'il creuse.
    positionX = newX;
    positionY = newY;
    hero.style.left = (positionX * 24) + 'px';
    hero.style.top = (positionY * 24) + 'px';
  }

  if (forcePioche === 0) {
    finDuJeu();
  }
}

  

// Fonctions pour déplacer le héros
function deplacerDroite() 
{
  deplacer(1, 0);
}

function deplacerGauche() 
{
  deplacer(-1, 0);
}

function deplacerHaut() 
{
  deplacer(0, -1);
}

function deplacerBas() 
{
  deplacer(0, 1);
}
  
// Fonction pour générer le donjon
function genererDonjon(largeur, hauteur) 
{
    const donjon = [];
    for (let i = 0; i < hauteur; i++) {
      const ligne = [];
      for (let j = 0; j < largeur; j++) {
        const aleatoire = Math.random();
        const tuile = aleatoire < 0.9 ? 'roche' : 'cristal';
        ligne.push(tuile);
      }
      donjon.push(ligne);
    }
    return donjon;
}
// Fonction pour créer les éléments HTML du donjon
function creerDonjonHTML(donjon) 
{
    const game = document.getElementById('game');
    for (const ligne of donjon) {
      const divLigne = document.createElement('div');
      divLigne.classList.add('ligne');
      for (const tuile of ligne) {
        const divTuile = document.createElement('div');
        divTuile.classList.add('tuile');
        const img = document.createElement('img');
        img.alt = tuile;
        img.src = tuile === 'roche' ? 'img/tile_roche.png' : 'img/tile_cristal.png';
        divTuile.appendChild(img);
        divLigne.appendChild(divTuile);
      }
      game.appendChild(divLigne);
    }
}
  
// Génération et affichage du donjon
const largeurDonjon = 25;
const hauteurDonjon = 15;
const donjon = genererDonjon(largeurDonjon, hauteurDonjon);
creerDonjonHTML(donjon);


// Fonction pour la fin du jeu
function finDuJeu() {
  const finDuJeuDiv = document.createElement("div");
  finDuJeuDiv.setAttribute("id", "fin-du-jeu");
  finDuJeuDiv.innerHTML = `
    <h2>Fin du jeu</h2>
    <p>Votre score est de ${score}.</p>
    <button id="rejouer">Réessayer</button>
    <button id="fermer">Fermer</button>
  `;

  document.body.appendChild(finDuJeuDiv);

  const rejouerBtn = document.getElementById("rejouer");
  const fermerBtn = document.getElementById("fermer");

  rejouerBtn.addEventListener("click", () => {
    window.location.reload();
  });

  fermerBtn.addEventListener("click", () => {
    finDuJeuDiv.remove();
  });
}

  
  
  

// Ajout des écouteurs d'événements
versDroite.addEventListener('click', deplacerDroite);
versGauche.addEventListener('click', deplacerGauche);
versLeHaut.addEventListener('click', deplacerHaut);
versLeBas.addEventListener('click', deplacerBas);
quitter.addEventListener('click', () => window.location.reload());
quitter.addEventListener('click', () => finDuJeu());