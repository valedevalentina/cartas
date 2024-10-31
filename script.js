// Variables para almacenar la ID de la baraja y el botón
let deckId = '';
const newDeckButton = document.getElementById('new-deck');
const drawCardButton = document.getElementById('draw-card');
const cardDisplay = document.getElementById('card-display');
const cardInfo = document.getElementById('card-info');
const cardImage = document.getElementById('card-image');

// Crear una nueva baraja
async function createNewDeck() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
    const data = await response.json();
    deckId = data.deck_id;
    cardInfo.textContent = 'Nueva baraja generada. ¡Ahora saca una carta!';
    cardImage.style.display = 'none';
}

// Sacar una carta de la baraja actual
async function drawCard() {
    if (!deckId) {
        cardInfo.textContent = 'Primero debes generar una nueva baraja.';
        return;
    }

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    const data = await response.json();
    
    if (data.cards.length > 0) {
        const card = data.cards[0];
        cardInfo.textContent = `Sacaste: ${card.value} de ${card.suit}`;
        cardImage.src = card.image;
        cardImage.style.display = 'block';
    } else {
        cardInfo.textContent = 'No quedan más cartas en la baraja. ¡Genera una nueva!';
    }
}

// Event listeners para los botones
newDeckButton.addEventListener('click', createNewDeck);
drawCardButton.addEventListener('click', drawCard);
