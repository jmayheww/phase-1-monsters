const baseURL = "http://localhost:3000/monsters";
let pageNumber = 1;
let domPageNumber = document.querySelector("#page-number");
const pageForward = document.querySelector("#forward");


// Handle page loads

pageForward.addEventListener("click", () => navigatePages(1));



document.addEventListener("DOMContentLoaded", () => {
  createMonsterForm();

  getAllMonsters(pageNumber);
});

// Fetches Monster data
function getAllMonsters(page) {
  console.log('page: ', page);

  fetch(baseURL + `/?_limit=5&_page=${page}`)
    .then((resp) => resp.json())
    .then((monsterData) => {
      monsterData.map((monster) => createMonsterCard(monster));
    });
}

// Dom selectors
function createMonsterCard(monsterData) {
  const monsterContainer = document.querySelector("#monster-container");

  const monsterCard = document.createElement("div");
  const monsterName = document.createElement("h2");
  const monsterAge = document.createElement("h4");
  const monsterDetails = document.createElement("p");

  monsterName.textContent = monsterData.name;
  monsterAge.textContent = monsterData.age;
  monsterDetails.textContent = monsterData.description;

  let monsterArr = [];

  monsterArr.push(monsterName, monsterAge, monsterDetails);

  appendMonsters(monsterContainer, monsterCard, monsterArr);
}

function appendMonsters(container, card, arr) {
  arr.forEach((el) => {
    card.append(el);
    return container.append(card);
  });
}

const createMonsterForm = () => {
  const createMonster = document.querySelector("#create-monster");
  const monsterForm = document.createElement("form");
  const formHeader = document.createElement("h2");
  monsterForm.id = "monster-form";

  const nameInput = document.createElement("input");
  const ageInput = document.createElement("input");
  const detailsInput = document.createElement("input");

  const createButton = document.createElement("button");

  // Register Event Listener

  monsterForm.addEventListener("submit", handleCreateMonster);

  //

  // Add new monster to Dom

  formHeader.textContent = "Create Monster";
  nameInput.placeholder = "Monster Name";
  ageInput.placeholder = "Monster Age";
  detailsInput.placeholder = "Monster Description";
  createButton.innerText = "Create Monster";

  monsterForm.append(
    formHeader,
    nameInput,
    ageInput,
    detailsInput,
    createButton
  );

  createMonster.append(monsterForm);
};

//Handle Events

function handleCreateMonster(event) {
  event.preventDefault();

  let name = event.target[0].value;
  let age = event.target[1].value;
  let description = event.target[2].value;

  let newMonsterObj = { name, age, description };

  console.log(newMonsterObj);
  postNewMonster(newMonsterObj, event);
}

function postNewMonster({ name, age, description }, event) {
  event.preventDefault();
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      age,
      description,
    }),
  })
    .then((resp) => resp.json())
    .then((monster) => {
      createMonsterCard(monster);
      event.target.reset();
    })
    .catch((error) => console.log(error));
}

function navigatePages(crement) {
  console.log("button clicked");
  pageNumber += crement;


  domPageNumber.innerHTML = pageNumber;
  getAllMonsters(pageNumber);
}
