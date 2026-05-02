const ROWS = 5;
const COLS = 6;
const TILE_TYPES = [
  { name: "ruby", color: "#f95d6a", symbol: "'✦'" },
  { name: "aqua", color: "#39c6f0", symbol: "'◆'" },
  { name: "leaf", color: "#64d96b", symbol: "'✿'" },
  { name: "light", color: "#ffd166", symbol: "'●'" },
  { name: "void", color: "#9b5de5", symbol: "'✧'" },
];

const MAX_PLAYER_HP = 1000;
const MAX_ENEMY_HP = 1500;
const ENEMY_ATTACK = 120;
const CASCADE_DELAY = 230;

const boardElement = document.querySelector("#board");
const messageElement = document.querySelector("#message");
const comboText = document.querySelector("#comboText");
const damageText = document.querySelector("#damageText");
const turnText = document.querySelector("#turnText");
const playerHpText = document.querySelector("#playerHpText");
const enemyHpText = document.querySelector("#enemyHpText");
const playerHpBar = document.querySelector("#playerHpBar");
const enemyHpBar = document.querySelector("#enemyHpBar");
const enemyAttackText = document.querySelector("#enemyAttackText");
const restartButton = document.querySelector("#restartButton");

let board = [];
let playerHp = MAX_PLAYER_HP;
let enemyHp = MAX_ENEMY_HP;
let turn = 1;
let comboTotal = 0;
let damageTotal = 0;
let locked = false;
let gameOver = false;
let dragState = null;

function randomType() {
  return Math.floor(Math.random() * TILE_TYPES.length);
}

function createInitialBoard() {
  const nextBoard = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      let type = randomType();

      while (
        (col >= 2 && nextBoard[row][col - 1] === type && nextBoard[row][col - 2] === type) ||
        (row >= 2 && nextBoard[row - 1][col] === type && nextBoard[row - 2][col] === type)
      ) {
        type = randomType();
      }

      nextBoard[row][col] = type;
    }
  }

  return nextBoard;
}

function startGame() {
  board = createInitialBoard();
  playerHp = MAX_PLAYER_HP;
  enemyHp = MAX_ENEMY_HP;
  turn = 1;
  comboTotal = 0;
  damageTotal = 0;
  locked = false;
  gameOver = false;
  dragState = null;
  messageElement.textContent = "オーブをドラッグして、隣のマスと入れ替えよう。";
  render();
  updateHud();
}

function render(matchedKeys = new Set()) {
  boardElement.innerHTML = "";

  for (let row = 0; row < ROWS; row += 1) {
    for (let col = 0; col < COLS; col += 1) {
      const typeIndex = board[row][col];
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile";
      tile.dataset.row = String(row);
      tile.dataset.col = String(col);

      if (typeIndex === null) {
        tile.classList.add("empty");
        tile.setAttribute("aria-label", `empty cell at row ${row + 1}, column ${col + 1}`);
        boardElement.append(tile);
        continue;
      }

      tile.setAttribute(
        "aria-label",
        `${TILE_TYPES[typeIndex].name} orb at row ${row + 1}, column ${col + 1}`
      );
      tile.style.setProperty("--tile-bg", TILE_TYPES[typeIndex].color);
      tile.style.setProperty("--tile-symbol", TILE_TYPES[typeIndex].symbol);

      if (dragState?.row === row && dragState?.col === col) {
        tile.classList.add("selected");
      }

      if (matchedKeys.has(cellKey(row, col))) {
        tile.classList.add("matched");
      }

      boardElement.append(tile);
    }
  }
}

function updateHud() {
  comboText.textContent = String(comboTotal);
  damageText.textContent = String(damageTotal);
  turnText.textContent = String(turn);
  playerHpText.textContent = `${playerHp} / ${MAX_PLAYER_HP}`;
  enemyHpText.textContent = `${enemyHp} / ${MAX_ENEMY_HP}`;
  enemyAttackText.textContent = String(ENEMY_ATTACK);
  playerHpBar.style.width = `${(playerHp / MAX_PLAYER_HP) * 100}%`;
  enemyHpBar.style.width = `${(enemyHp / MAX_ENEMY_HP) * 100}%`;
}

function cellKey(row, col) {
  return `${row}:${col}`;
}

function parseCellKey(key) {
  const [row, col] = key.split(":").map(Number);
  return { row, col };
}

function isAdjacent(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) === 1;
}

function swapCells(a, b) {
  const temp = board[a.row][a.col];
  board[a.row][a.col] = board[b.row][b.col];
  board[b.row][b.col] = temp;
}

function getTileFromPoint(clientX, clientY) {
  const element = document.elementFromPoint(clientX, clientY);
  return element?.closest(".tile");
}

function onPointerDown(event) {
  const tile = event.target.closest(".tile");

  if (!tile || locked || gameOver) {
    return;
  }

  const row = Number(tile.dataset.row);
  const col = Number(tile.dataset.col);
  dragState = {
    pointerId: event.pointerId,
    row,
    col,
    moved: false,
  };
  tile.setPointerCapture(event.pointerId);
  messageElement.textContent = "ドラッグ中: 隣のオーブを通過すると入れ替わります。";
  render();
}

function onPointerMove(event) {
  if (!dragState || dragState.pointerId !== event.pointerId || locked || gameOver) {
    return;
  }

  const tile = getTileFromPoint(event.clientX, event.clientY);

  if (!tile) {
    return;
  }

  const nextCell = {
    row: Number(tile.dataset.row),
    col: Number(tile.dataset.col),
  };
  const currentCell = {
    row: dragState.row,
    col: dragState.col,
  };

  if (!isAdjacent(currentCell, nextCell)) {
    return;
  }

  swapCells(currentCell, nextCell);
  dragState.row = nextCell.row;
  dragState.col = nextCell.col;
  dragState.moved = true;
  render();
}

async function onPointerUp(event) {
  if (!dragState || dragState.pointerId !== event.pointerId) {
    return;
  }

  const moved = dragState.moved;
  dragState = null;
  render();

  if (moved && !locked && !gameOver) {
    await resolveTurn();
  } else if (!gameOver) {
    messageElement.textContent = "オーブをドラッグして、隣のマスと入れ替えよう。";
  }
}

function onPointerCancel(event) {
  if (dragState?.pointerId !== event.pointerId) {
    return;
  }

  dragState = null;
  render();
}

function findMatchGroups() {
  const groups = [];

  for (let row = 0; row < ROWS; row += 1) {
    let start = 0;

    for (let col = 1; col <= COLS; col += 1) {
      const sameAsRun = col < COLS && board[row][col] === board[row][start];

      if (sameAsRun) {
        continue;
      }

      if (col - start >= 3) {
        groups.push(
          Array.from({ length: col - start }, (_, index) => cellKey(row, start + index))
        );
      }

      start = col;
    }
  }

  for (let col = 0; col < COLS; col += 1) {
    let start = 0;

    for (let row = 1; row <= ROWS; row += 1) {
      const sameAsRun = row < ROWS && board[row][col] === board[start][col];

      if (sameAsRun) {
        continue;
      }

      if (row - start >= 3) {
        groups.push(
          Array.from({ length: row - start }, (_, index) => cellKey(start + index, col))
        );
      }

      start = row;
    }
  }

  return groups;
}

async function resolveTurn() {
  locked = true;
  comboTotal = 0;
  damageTotal = 0;
  messageElement.textContent = "コンボ判定中...";
  updateHud();

  while (true) {
    const groups = findMatchGroups();

    if (groups.length === 0) {
      break;
    }

    const matchedKeys = new Set(groups.flat());
    comboTotal += groups.length;
    damageTotal += calculateDamage(groups.length, matchedKeys.size);
    render(matchedKeys);
    updateHud();
    await wait(CASCADE_DELAY);

    removeMatchedCells(matchedKeys);
    render();
    await wait(CASCADE_DELAY);

    collapseAndRefill();
    render();
    await wait(CASCADE_DELAY);
  }

  if (comboTotal > 0) {
    enemyHp = Math.max(0, enemyHp - damageTotal);
    messageElement.textContent = `${comboTotal} combo! ${damageTotal} damage!`;
  } else {
    messageElement.textContent = "コンボなし。敵の反撃を受けます。";
  }

  updateHud();
  await wait(CASCADE_DELAY);

  if (enemyHp === 0) {
    endGame("勝利！Restartで再挑戦できます。");
    return;
  }

  enemyAttack();

  if (playerHp === 0) {
    endGame("敗北... Restartで再挑戦できます。");
    return;
  }

  turn += 1;
  locked = false;
  updateHud();
}

function calculateDamage(comboCount, matchedCount) {
  const baseDamage = matchedCount * 18;
  const comboBonus = comboCount * 45;
  const chainBonus = Math.max(0, comboTotal - 1) * 25;
  return baseDamage + comboBonus + chainBonus;
}

function removeMatchedCells(matchedKeys) {
  for (const key of matchedKeys) {
    const { row, col } = parseCellKey(key);
    board[row][col] = null;
  }
}

function collapseAndRefill() {
  for (let col = 0; col < COLS; col += 1) {
    const remaining = [];

    for (let row = ROWS - 1; row >= 0; row -= 1) {
      if (board[row][col] !== null) {
        remaining.push(board[row][col]);
      }
    }

    for (let row = ROWS - 1; row >= 0; row -= 1) {
      board[row][col] = remaining.shift() ?? randomType();
    }
  }
}

function enemyAttack() {
  playerHp = Math.max(0, playerHp - ENEMY_ATTACK);
  messageElement.textContent += ` 敵の攻撃: ${ENEMY_ATTACK} damage.`;
  updateHud();
}

function endGame(message) {
  gameOver = true;
  locked = true;
  dragState = null;
  messageElement.textContent = message;
  updateHud();
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

boardElement.addEventListener("pointerdown", onPointerDown);
boardElement.addEventListener("pointermove", onPointerMove);
boardElement.addEventListener("pointerup", onPointerUp);
boardElement.addEventListener("pointercancel", onPointerCancel);
restartButton.addEventListener("click", startGame);

startGame();
