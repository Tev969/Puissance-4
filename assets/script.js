let playerOneTurn = true;
playAgainstIa = false;
let replay = document.querySelector(".restart");
let container = document.querySelector("#gamecontainer");
const playerVsIa = document.querySelector("#butTwo");
const playerVsPlayer = document.querySelector("#butOne");
let player = document.querySelector("h1");
let count = 0;
let canPlay = true;
enemy = "";
let map = [];
container.style.display = "none";
replay.style.display = "none";

function gameMap() {
  map = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];
}

// ​‌‍‌𝟮 𝗕𝗼𝘂𝘁𝗼𝗻𝘀 𝗽𝗼𝘂𝗿 𝗺𝗼𝗱𝗲𝘀 𝗱𝗲 𝗷𝗲𝘂​

playerVsPlayer.addEventListener("click", () => {
  enemy = "Joueur jaune";
  container.style.display = "block";
  playerVsPlayer.style.display = "none";
  playerVsIa.style.display = "none";
});

playerVsIa.addEventListener("click", () => {
  playAgainstIa = true;
  enemy = "joueur rouge";
  container.style.display = "block";
  playerVsPlayer.style.display = "none";
  playerVsIa.style.display = "none";
});

// ​‌‍‌creations de lignes et cases​

function createMap(lastCellCoords) {
  container.innerHTML = "";
  map.forEach((lines, i) => {
    let row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    lines.forEach((cells, j) => {
      let cell = document.createElement("div");
      cell.classList.add("cells");
      row.appendChild(cell);
      switch (cells) {
        case "X":
          cell.style.backgroundColor = "red";
          if (i === lastCellCoords[0] && j === lastCellCoords[1]) {
            cell.classList.add("chute");
            canPlay = false;
            player.textContent = "Joueur Rouge";
            setTimeout(() => {
              canPlay = true;
            }, 500);
          }
          break;

        case "A":
          cell.style.backgroundColor = "yellow";
          if (i === lastCellCoords[0] && j === lastCellCoords[1]) {
            cell.classList.add("chute");
            canPlay = false;
            player.textContent = "Joueur Jaune";
            setTimeout(() => {
              canPlay = true;
            }, 500);
          }
          break;
      }

      cell.addEventListener("click", () => {
        if (canPlay) {
          createMap(dropCoins(j));
          if (playAgainstIa) {
            setTimeout(() => {
              createMap(dropCoins(randomize(0, map[0].length - 1)));
            }, 500);
          }
          winCondition();
        }
      });
    });
  });
}

// ​‌‍‌Function des jetons ​

function dropCoins(index) {
  let cellIndex;
  for (let i = map.length - 1; i >= 0; i--) {
    if (map[i][index] == 0) {
      map[i][index] = playerOneTurn ? "A" : "X";
      cellIndex = i;
      break;
    }
  }

  playerOneTurn = !playerOneTurn;
  return [cellIndex, index];
}
function initialiseGame() {
  gameMap();
  createMap();
}
initialiseGame();

// ​‌‍‌Conditions de victoires​

function winCondition() {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        map[i + 3] &&
        map[i][j] === map[i + 1][j + 1] &&
        map[i][j] === map[i + 2][j + 2] &&
        map[i][j] === map[i + 3][j + 3] &&
        map[i][j] !== 0
      ) {
        gameOver();
      }
    }
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        map[i + 3] &&
        map[i][j] === map[i + 1][j - 1] &&
        map[i][j] === map[i + 2][j - 2] &&
        map[i][j] === map[i + 3][j - 3] &&
        map[i][j] !== 0
      ) {
        gameOver();
      }
    }
  }

  // ​‌‍ // win condition verticale​

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (
        map[i + 3] &&
        map[i][j] === map[i + 1][j] &&
        map[i][j] === map[i + 2][j] &&
        map[i][j] === map[i + 3][j] &&
        map[i][j] !== 0
      ) {
        gameOver();
      }
    }
  }

  // ​‌‍‌    // condition horizontale​

  map.forEach((line) => {
    for (let i = 0; i <= 3; i++) {
      if (
        line[i] === line[i + 1] &&
        line[i] === line[i + 2] &&
        line[i] === line[i + 3] &&
        line[i] !== 0
      ) {
        gameOver();
      }
    }
  });
}

function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gameOver() {
  playerOneTurn ? (enemy = "rouge") : (enemy = "jaune");
  replay.style.display = "block";
  player.textContent = `le joueur ${enemy} a gagné`;
  container.style.display = "none";
}

function restarting() {
  gameOver()
  initialiseGame();
  winCondition();
  playerVsPlayer.style.display = "block";
  playerVsIa.style.display = "block";
  container.style.display = "none";
  replay.style.display = "none";
  player.textContent = "Puissance 4";
}
