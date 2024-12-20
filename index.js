import { CharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

let pageNumber = 1;
let maxPageNumber;


async function fetchCharacters(page) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return null;
  }
}


async function getCharacters(page) {
  cardContainer.innerHTML = ``;
  const data = await fetchCharacters(page);

  if (!data) {
    return null;
  } else {
    const characters = data.results;
    maxPageNumber = data.info.pages;

    characters.forEach((character) => {
      const card = CharacterCard(character);
      cardContainer.append(card);
    });

    return maxPageNumber;
  }
} 


async function renderCharactersPage(page) {
  maxPageNumber = await getCharacters(page);

  if (maxPageNumber === null) {
    const errorMessage = document.createElement("li");
    errorMessage.textContent = "Failed to load...";
    cardContainer.append(errorMessage);

    pagination.textContent = page + " / ?";

    return null;

  } else {
    pagination.textContent = page + " / " + maxPageNumber;

    return maxPageNumber;
  }
}


maxPageNumber = renderCharactersPage(1);

if (pageNumber <= 1) {
   prevButton.setAttribute("disabled", "")
} 

if (pageNumber >= maxPageNumber) {
  nextButton.setAttribute("disabled", "");
}

prevButton.addEventListener("click", () => {
  if (pageNumber > 1) {
    pageNumber = pageNumber - 1;
  } else {
    pageNumber = 1;
  }

  if (pageNumber === 1) {
    prevButton.setAttribute("disabled", "")
  }

  if (pageNumber < maxPageNumber) {
    nextButton.removeAttribute("disabled");
  }
  renderCharactersPage(pageNumber);
});

nextButton.addEventListener("click", () => {
 if (pageNumber < maxPageNumber) {
   pageNumber = pageNumber + 1;
 } else {
   pageNumber = maxPageNumber; 
 }

 if (pageNumber > 1) {
    prevButton.removeAttribute("disabled");
 } 

 if (pageNumber === maxPageNumber) {
    nextButton.setAttribute("disabled", "");
 }
  renderCharactersPage(pageNumber);
});


let searchQuery = "";
const searchBar = document.querySelector('[data-js="search-bar"]');

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const elements = event.target.elements;
  console.log(elements);
});
