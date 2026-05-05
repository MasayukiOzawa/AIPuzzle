const ROWS = 5;
const COLS = 6;
const TILE_TYPES = [
  { name: "ruby", color: "#f95d6a", symbol: "'✦'" },
  { name: "aqua", color: "#39c6f0", symbol: "'◆'" },
  { name: "leaf", color: "#64d96b", symbol: "'✿'" },
  { name: "sun", color: "#ffbf47", symbol: "'☀'" },
  { name: "berry", color: "#ff7eb6", symbol: "'♥'" },
  { name: "mint", color: "#7de2d1", symbol: "'⬟'" },
  { name: "light", color: "#ffd166", symbol: "'●'" },
  { name: "void", color: "#9b5de5", symbol: "'✧'" },
  { name: "moon", color: "#7b8cff", symbol: "'☾'" },
];

const MAX_PLAYER_HP = 1000;
const MAX_ENEMY_HP = MAX_PLAYER_HP;
const CASCADE_DELAY = 230;
const COLLECTION_STORAGE_KEY = "kirakira-collected-rivals";
const PLAYER_CHARACTER_STORAGE_KEY = "kirakira-player-character";
const PLAYER_NAME_STORAGE_KEY = "kirakira-player-name";
const DEFAULT_PLAYER_NAME = "ぷれいやー";
const createAvatarImage = (src, label) =>
  `<img src="${src}" alt="${label}" class="character-svg-avatar" loading="lazy" decoding="async">`;

const PLAYER_CHARACTERS = [
  {
    id: "lumirun",
    name: "ルミルン",
    title: "ようせいの なまえ",
    attack: 120,
    heroAvatar: `<svg viewBox="0 0 220 220" role="img" aria-label="きらきらステッキをもったようせい"><circle cx="110" cy="110" r="92" fill="#fff8fd" stroke="#ffffff" stroke-width="10"></circle><path d="M63 112c-25-10-32-31-17-47 15-16 37-6 48 16-10 8-19 18-31 31z" fill="#e7fbff"></path><path d="M157 112c25-10 32-31 17-47-15-16-37-6-48 16 10 8 19 18 31 31z" fill="#e7fbff"></path><path d="M74 73c0-22 16-37 36-37s36 15 36 37v15H74z" fill="#7b8cff"></path><circle cx="88" cy="69" r="18" fill="#8fe3ff"></circle><circle cx="132" cy="69" r="18" fill="#8fe3ff"></circle><circle cx="110" cy="86" r="34" fill="#ffe7cf"></circle><circle cx="97" cy="84" r="4.5" fill="#533a71"></circle><circle cx="123" cy="84" r="4.5" fill="#533a71"></circle><path d="M99 97c6 6 16 6 22 0" fill="none" stroke="#ff7eb6" stroke-linecap="round" stroke-width="5"></path><path d="M84 126c7-8 18-12 26-12s19 4 26 12l8 38H76z" fill="#ff9fcb"></path></svg>`,
    battleAvatar: `<svg viewBox="0 0 120 120" role="img" aria-label="ルミルンのミニアイコン"><circle cx="60" cy="60" r="54" fill="#fff8fd"></circle><path d="M30 60c-12-8-16-19-8-29 8-9 20-5 27 9-8 5-11 10-19 20z" fill="#e7fbff"></path><path d="M90 60c12-8 16-19 8-29-8-9-20-5-27 9 8 5 11 10 19 20z" fill="#e7fbff"></path><circle cx="42" cy="40" r="11" fill="#8fe3ff"></circle><circle cx="78" cy="40" r="11" fill="#8fe3ff"></circle><path d="M36 52c1-18 10-29 24-29s23 11 24 29z" fill="#7b8cff"></path><circle cx="60" cy="54" r="19" fill="#ffe7cf"></circle><circle cx="53" cy="52" r="3.2" fill="#533a71"></circle><circle cx="67" cy="52" r="3.2" fill="#533a71"></circle><path d="M53 62c4 4 10 4 14 0" fill="none" stroke="#ff7eb6" stroke-linecap="round" stroke-width="3.6"></path><path d="M42 79c4-6 10-10 18-10s14 4 18 10l5 17H37z" fill="#ff9fcb"></path></svg>`,
  },
  {
    id: "yuto",
    name: "ユウト",
    title: "たんけんかの なまえ",
    attack: 135,
    heroAvatar: `<svg viewBox="0 0 220 220" role="img" aria-label="ぼうけんする ユウト"><circle cx="110" cy="110" r="92" fill="#f4f8ff" stroke="#ffffff" stroke-width="10"></circle><path d="M63 90c4-30 20-46 47-46s43 16 47 46l-14 14H77z" fill="#2e3d5c"></path><circle cx="110" cy="105" r="34" fill="#ffe3cf"></circle><circle cx="97" cy="103" r="4.5" fill="#3d2c54"></circle><circle cx="123" cy="103" r="4.5" fill="#3d2c54"></circle><path d="M98 116c6 6 18 6 24 0" fill="none" stroke="#ff8db3" stroke-linecap="round" stroke-width="5"></path><path d="M84 145c7-8 18-12 26-12s19 4 26 12l8 30H76z" fill="#5b8cff"></path><path d="M87 146l-6 20h58l-6-20" fill="#ffffff" opacity="0.75"></path></svg>`,
    battleAvatar: `<svg viewBox="0 0 120 120" role="img" aria-label="ユウトのミニアイコン"><circle cx="60" cy="60" r="54" fill="#f4f8ff"></circle><path d="M33 50c2-19 13-30 27-30s25 11 27 30l-8 8H41z" fill="#2e3d5c"></path><circle cx="60" cy="56" r="21" fill="#ffe3cf"></circle><circle cx="52" cy="54" r="3.1" fill="#3d2c54"></circle><circle cx="68" cy="54" r="3.1" fill="#3d2c54"></circle><path d="M52 64c4 4 12 4 16 0" fill="none" stroke="#ff8db3" stroke-linecap="round" stroke-width="3.5"></path><path d="M40 80c5-7 12-11 20-11s15 4 20 11l4 16H36z" fill="#5b8cff"></path></svg>`,
  },
];

const ENEMY_CHARACTERS = [
  {
    id: "nowarin",
    name: "ダークスター ノワリン",
    attack: 120,
    avatar: createAvatarImage("assets/characters/nowarin.svg", "いたずらなダークスターのキャラクター"),
  },
  {
    id: "mirarouge",
    name: "ミラルージュ",
    attack: 135,
    avatar: createAvatarImage("assets/characters/mirarouge.svg", "かがみのまほうをつかう ミラルージュ"),
  },
  {
    id: "flarebell",
    name: "フレアベル",
    attack: 145,
    avatar: createAvatarImage("assets/characters/flarebell.svg", "ほのおのリボンをまとう フレアベル"),
  },
  {
    id: "snowshell",
    name: "スノウシェル",
    attack: 130,
    avatar: createAvatarImage("assets/characters/snowshell.svg", "こおりのかけらをあやつる スノウシェル"),
  },
  {
    id: "candyarc",
    name: "キャンディアーク",
    attack: 140,
    avatar: createAvatarImage("assets/characters/candyarc.svg", "あまいまほうをつかう キャンディアーク"),
  },
  {
    id: "lunashadow",
    name: "ルナシャドウ",
    attack: 150,
    avatar: createAvatarImage("assets/characters/lunashadow.svg", "つきよのいたずらをしかける ルナシャドウ"),
  },
  {
    id: "gigagao",
    name: "ギガガオーン",
    attack: 158,
    avatar: createAvatarImage("assets/characters/gigagao.svg", "おおきなモンスターの ギガガオーン"),
  },
  {
    id: "kagekoro",
    name: "カゲコロ",
    attack: 146,
    avatar: createAvatarImage("assets/characters/kagekoro.svg", "ようかいキャラクターの カゲコロ"),
  },
  {
    id: "kakupeta",
    name: "カクペタ",
    attack: 139,
    avatar: createAvatarImage("assets/characters/kakupeta.svg", "しかくいほっぺの カクペタ"),
  },
  {
    id: "hatepyon",
    name: "ハテピョン",
    attack: 142,
    avatar: createAvatarImage("assets/characters/hatepyon.svg", "にんげんみたいな かみがたの ハテピョン"),
  },
  {
    id: "keyhoppy",
    name: "キーホッピー",
    attack: 138,
    bookDescription: "じゃらじゃら キーホルダーを あつめる モンスター。",
    bookSkill: "くるくる フックこうげき",
    bookLike: "きらきら キーホルダー",
    avatar: createAvatarImage("assets/characters/keyhoppy.svg", "キーホルダーのキャラクター キーホッピー"),
  },
  {
    id: "kanbanon",
    name: "カンバノン",
    attack: 148,
    bookDescription: "おおきな かんばんを せおった モンスター。",
    bookSkill: "どどんと サインプレス",
    bookLike: "ピカピカ ひょうしき",
    avatar: createAvatarImage("assets/characters/kanbanon.svg", "看板のモンスター カンバノン"),
  },
  {
    id: "stikelly",
    name: "スティケリー",
    attack: 152,
    bookDescription: "ながい ステッキを ふりまわす モンスター。",
    bookSkill: "くるんと ステッキまほう",
    bookLike: "ほしの かざり",
    avatar: createAvatarImage("assets/characters/stikelly.svg", "ステッキのモンスター スティケリー"),
  },
  {
    id: "sorami",
    name: "ソラミ",
    attack: 144,
    bookDescription: "えがおが まぶしい にんげんの おんなのこ。",
    bookSkill: "ハート エール",
    bookLike: "リボンと おさんぽ",
    avatar: createAvatarImage("assets/characters/sorami.svg", "人間の女の子のキャラクター ソラミ"),
  },
];

const boardElement = document.querySelector("#board");
const messageElement = document.querySelector("#message");
const comboText = document.querySelector("#comboText");
const damageText = document.querySelector("#damageText");
const turnText = document.querySelector("#turnText");
const playerHpText = document.querySelector("#playerHpText");
const enemyHpText = document.querySelector("#enemyHpText");
const playerHpBar = document.querySelector("#playerHpBar");
const enemyHpBar = document.querySelector("#enemyHpBar");
const miniPlayerHpText = document.querySelector("#miniPlayerHpText");
const miniEnemyHpText = document.querySelector("#miniEnemyHpText");
const enemyCharacterVisual = document.querySelector("#enemyCharacterVisual");
const enemyNameText = document.querySelector("#enemyName");
const enemyAttackText = document.querySelector("#enemyAttackText");
const playerAttackText = document.querySelector("#playerAttackText");
const collectionCountText = document.querySelector("#collectionCount");
const collectionTotalText = document.querySelector("#collectionTotal");
const collectibleCardsContainer = document.querySelector("#collectibleCardsContainer");
const restartButton = document.querySelector("#restartButton");
const playerCharacterSelect = document.querySelector("#playerCharacterSelect");
const playerNameInput = document.querySelector("#playerNameInput");
const playerHeroVisual = document.querySelector("#playerHeroVisual");
const playerBattleVisual = document.querySelector("#playerBattleVisual");
const playerHeroName = document.querySelector("#playerHeroName");
const playerNameLabel = document.querySelector("#playerNameLabel");
const enemyNameLabel = document.querySelector("#enemyNameLabel");
const miniPlayerNameLabel = document.querySelector("#miniPlayerNameLabel");
const miniEnemyNameLabel = document.querySelector("#miniEnemyNameLabel");
const playerNameIcon = document.querySelector("#playerNameIcon");
const enemyNameIcon = document.querySelector("#enemyNameIcon");
const miniPlayerNameIcon = document.querySelector("#miniPlayerNameIcon");
const miniEnemyNameIcon = document.querySelector("#miniEnemyNameIcon");
const enemyFriendStatus = document.querySelector("#enemyFriendStatus");
const miniEnemyFriendBadge = document.querySelector("#miniEnemyFriendBadge");
const battlePanelElement = document.querySelector(".battle-panel");
const playerFighterElement = document.querySelector(".player-fighter");
const enemyCardElement = document.querySelector(".enemy-card");
const boardResultEffectElement = document.querySelector("#boardResultEffect");

let board = [];
let playerHp = MAX_PLAYER_HP;
let enemyHp = MAX_ENEMY_HP;
let currentEnemy = ENEMY_CHARACTERS[0];
let collectedRivals = loadCollectedRivals();
let turn = 1;
let comboTotal = 0;
let damageTotal = 0;
let locked = false;
let gameOver = false;
let dragState = null;
let currentPlayer = loadPlayerCharacter();
let currentPlayerName = loadPlayerName();
const SWAP_COOLDOWN_MS = 42;

function buildPartnerFromEnemy(enemy) {
  return {
    id: enemy.id,
    name: enemy.name,
    title: "あらたな なかま",
    heroAvatar: enemy.avatar,
    battleAvatar: enemy.avatar,
    attack: enemy.attack,
  };
}

function getAvailablePlayerCharacters() {
  const baseCharacters = [...PLAYER_CHARACTERS];
  const rivalPartners = ENEMY_CHARACTERS.filter((enemy) => collectedRivals.has(enemy.id)).map(
    buildPartnerFromEnemy
  );
  return [...baseCharacters, ...rivalPartners];
}

function syncPlayerCharacterSelect() {
  const availableCharacters = getAvailablePlayerCharacters();

  playerCharacterSelect.innerHTML = availableCharacters
    .map((character) => `<option value="${character.id}">${character.name}</option>`)
    .join("");

  if (!availableCharacters.some((character) => character.id === currentPlayer.id)) {
    currentPlayer = availableCharacters[0];
    window.localStorage.setItem(PLAYER_CHARACTER_STORAGE_KEY, currentPlayer.id);
  }
}

function loadPlayerCharacter() {
  const savedId = window.localStorage.getItem(PLAYER_CHARACTER_STORAGE_KEY);
  return (
    PLAYER_CHARACTERS.find((character) => character.id === savedId) ??
    ENEMY_CHARACTERS.filter((enemy) => collectedRivals.has(enemy.id)).map(buildPartnerFromEnemy)[0] ??
    PLAYER_CHARACTERS[0]
  );
}

function normalizePlayerName(value) {
  return value.trim() || DEFAULT_PLAYER_NAME;
}

function loadPlayerName() {
  const savedName = window.localStorage.getItem(PLAYER_NAME_STORAGE_KEY);
  return normalizePlayerName(savedName ?? DEFAULT_PLAYER_NAME);
}

function savePlayerName(name) {
  currentPlayerName = normalizePlayerName(name);
  window.localStorage.setItem(PLAYER_NAME_STORAGE_KEY, currentPlayerName);
}

function applyPlayerCharacter() {
  syncPlayerCharacterSelect();
  playerCharacterSelect.value = currentPlayer.id;
  playerHeroVisual.innerHTML = currentPlayer.heroAvatar;
  playerBattleVisual.innerHTML = currentPlayer.battleAvatar;
  playerHeroName.textContent = `${currentPlayerName} の パートナー: ${currentPlayer.name}`;
  playerNameLabel.textContent = currentPlayerName;
  miniPlayerNameLabel.textContent = `${currentPlayerName} HP`;
  playerNameInput.value = currentPlayerName;
  playerNameIcon.innerHTML = currentPlayer.battleAvatar;
  miniPlayerNameIcon.innerHTML = currentPlayer.battleAvatar;
}

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
  currentEnemy = ENEMY_CHARACTERS[Math.floor(Math.random() * ENEMY_CHARACTERS.length)];
  board = createInitialBoard();
  playerHp = MAX_PLAYER_HP;
  enemyHp = MAX_ENEMY_HP;
  turn = 1;
  comboTotal = 0;
  damageTotal = 0;
  locked = false;
  gameOver = false;
  dragState = null;
  messageElement.textContent = "オーブを すーっと なぞって うごかそう！";
  boardResultEffectElement.className = "board-result-effect";
  applyPlayerCharacter();
  renderEnemyCard();
  updateCollectionUI();
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
  miniPlayerHpText.textContent = `${playerHp} / ${MAX_PLAYER_HP}`;
  miniEnemyHpText.textContent = `${enemyHp} / ${MAX_ENEMY_HP}`;
  enemyAttackText.textContent = String(currentEnemy.attack);
  playerAttackText.textContent = String(currentPlayer.attack);
  playerHpBar.style.width = `${(playerHp / MAX_PLAYER_HP) * 100}%`;
  enemyHpBar.style.width = `${(enemyHp / MAX_ENEMY_HP) * 100}%`;
}

function updateEnemyFriendStatus() {
  const isFriend = collectedRivals.has(currentEnemy.id);
  enemyFriendStatus.textContent = isFriend ? "なかまにした！" : "まだ ライバル";
  enemyFriendStatus.classList.toggle("is-friend", isFriend);
  miniEnemyFriendBadge.textContent = isFriend ? "🤝" : "👿";
  miniEnemyFriendBadge.classList.toggle("is-friend", isFriend);
  miniEnemyFriendBadge.setAttribute("aria-label", isFriend ? "なかまになった相手" : "ライバルの相手");
}

function renderEnemyCard() {
  enemyCharacterVisual.innerHTML = currentEnemy.avatar;
  enemyNameText.textContent = currentEnemy.name;
  enemyNameLabel.textContent = currentEnemy.name;
  miniEnemyNameLabel.textContent = `${currentEnemy.name} HP`;
  enemyNameIcon.innerHTML = currentEnemy.avatar;
  miniEnemyNameIcon.innerHTML = currentEnemy.avatar;
  updateEnemyFriendStatus();
}

function loadCollectedRivals() {
  const rawValue = window.localStorage.getItem(COLLECTION_STORAGE_KEY);

  if (!rawValue) {
    return new Set();
  }

  const parsedValue = JSON.parse(rawValue);
  return new Set(Array.isArray(parsedValue) ? parsedValue : []);
}

function saveCollectedRivals() {
  window.localStorage.setItem(
    COLLECTION_STORAGE_KEY,
    JSON.stringify(Array.from(collectedRivals))
  );
}

function renderCollectibleCards() {
  collectibleCardsContainer.innerHTML = ENEMY_CHARACTERS.map(
    (enemy) => `
      <article class="encyclopedia-card collectible-card is-locked" data-character-id="${enemy.id}">
        <div class="character-chip enemy-chip">ライバル</div>
        <div class="collection-badge" data-collection-badge>まだ ライバル</div>
        <div class="book-portrait villain-book">${enemy.avatar}</div>
        <h3>${enemy.name}</h3>
        <p>${enemy.bookDescription ?? "ふしぎなチカラをもつ モンスター。"}</p>
        <dl class="book-stats">
          <div><dt>いたずらパワー</dt><dd>${enemy.attack}</dd></div>
          <div><dt>とくい</dt><dd>${enemy.bookSkill ?? "わざで びっくり！"}</dd></div>
          <div><dt>すき</dt><dd>${enemy.bookLike ?? "きらきら アクセ"}</dd></div>
        </dl>
      </article>
    `
  ).join("");
}

function updateCollectionUI() {
  const validEnemyIds = new Set(ENEMY_CHARACTERS.map((enemy) => enemy.id));
  const collectedCount = Array.from(collectedRivals).filter((id) => validEnemyIds.has(id)).length;

  collectionCountText.textContent = String(collectedCount);
  collectionTotalText.textContent = String(ENEMY_CHARACTERS.length);

  const collectibleCards = document.querySelectorAll(".collectible-card");
  for (const card of collectibleCards) {
    const isCollected = collectedRivals.has(card.dataset.characterId);
    const badge = card.querySelector("[data-collection-badge]");

    card.classList.toggle("is-collected", isCollected);
    card.classList.toggle("is-locked", !isCollected);
    badge.textContent = isCollected ? "なかまにした！" : "まだ ライバル";
  }
}

function collectCurrentRival() {
  const alreadyCollected = collectedRivals.has(currentEnemy.id);
  collectedRivals.add(currentEnemy.id);
  saveCollectedRivals();
  updateCollectionUI();
  updateEnemyFriendStatus();
  syncPlayerCharacterSelect();
  return !alreadyCollected;
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
    startX: event.clientX,
    startY: event.clientY,
    lastSwapAt: 0,
    moved: false,
  };
  tile.setPointerCapture(event.pointerId);
  messageElement.textContent = "そのまま となりのマスへ うごかしてね！";
  render();
}

function onPointerMove(event) {
  if (!dragState || dragState.pointerId !== event.pointerId || locked || gameOver) {
    return;
  }

  const now = performance.now();
  if (now - dragState.lastSwapAt < SWAP_COOLDOWN_MS) {
    return;
  }

  const deltaX = event.clientX - dragState.startX;
  const deltaY = event.clientY - dragState.startY;
  const horizontalMove = Math.abs(deltaX);
  const verticalMove = Math.abs(deltaY);
  const activeTile = boardElement.querySelector(
    `.tile[data-row="${dragState.row}"][data-col="${dragState.col}"]`
  );
  const tileSize = activeTile?.getBoundingClientRect().width ?? 48;
  const moveThreshold = tileSize * 0.52;

  if (Math.max(horizontalMove, verticalMove) < moveThreshold) {
    return;
  }

  const nextCell = {
    row: dragState.row + (verticalMove > horizontalMove ? Math.sign(deltaY) : 0),
    col: dragState.col + (horizontalMove >= verticalMove ? Math.sign(deltaX) : 0),
  };
  const currentCell = {
    row: dragState.row,
    col: dragState.col,
  };

  if (
    nextCell.row < 0 ||
    nextCell.row >= ROWS ||
    nextCell.col < 0 ||
    nextCell.col >= COLS
  ) {
    return;
  }

  if (!isAdjacent(currentCell, nextCell)) {
    return;
  }

  swapCells(currentCell, nextCell);
  dragState.row = nextCell.row;
  dragState.col = nextCell.col;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;
  dragState.lastSwapAt = now;
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
    messageElement.textContent = "オーブを すーっと なぞって うごかそう！";
  boardResultEffectElement.className = "board-result-effect";
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
  messageElement.textContent = "きえてるよ... つぎは どうなるかな？";
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
    messageElement.textContent = `${comboTotal} れんさ！ ${damageTotal} パワーの こうげき！`;
    triggerDamageEffect(enemyCardElement, "is-hit");
    triggerDamageEffect(enemyHpBar, "is-hit");
    popDamage(enemyCardElement, damageTotal);
  } else {
    messageElement.textContent = "そろわなかったよ。 あいてのターン！";
  }

  updateHud();
  await wait(CASCADE_DELAY);

  if (enemyHp === 0) {
    const isNewFriend = collectCurrentRival();
    endGame(
      isNewFriend
        ? `🎉 やったー！ きみの かち！ ${currentEnemy.name} が なかまに なった！`
        : `🎉 やったー！ きみの かち！ ${currentEnemy.name} は もう なかまだよ！`
    );
    showBattleResult("win", "WIN!");
    showBoardResultEffect("win");
    return;
  }

  enemyAttack();

  if (playerHp === 0) {
    endGame("💥 やられちゃった… もういちど ちょうせんしよう！");
    showBattleResult("lose", "LOSE...");
    showBoardResultEffect("lose");
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
  const rawDamage = baseDamage + comboBonus + chainBonus;
  const powerMultiplier = currentPlayer.attack / 120;
  return Math.round(rawDamage * powerMultiplier);
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


function showBoardResultEffect(type) {
  const label = type === "win" ? "WIN!" : "LOSE...";
  boardResultEffectElement.textContent = label;
  boardResultEffectElement.className = `board-result-effect ${type}`;
  window.setTimeout(() => {
    boardResultEffectElement.className = "board-result-effect";
    boardResultEffectElement.textContent = "";
  }, 1600);
}

function showBattleResult(type, text) {
  const badge = document.createElement("div");
  badge.className = `battle-result ${type}`;
  badge.textContent = text;
  battlePanelElement.append(badge);
  window.setTimeout(() => badge.remove(), 1500);
}

function popDamage(target, value, label = "ダメージ") {
  const pop = document.createElement("div");
  pop.className = "damage-pop";
  pop.textContent = `-${value} ${label}`;
  target.append(pop);
  window.setTimeout(() => pop.remove(), 900);
}

function triggerDamageEffect(target, className) {
  target.classList.remove(className);
  void target.offsetWidth;
  target.classList.add(className);
}

function enemyAttack() {
  playerHp = Math.max(0, playerHp - currentEnemy.attack);
  messageElement.textContent += ` ${currentEnemy.name} の こうげきで ${currentEnemy.attack} へった！`;
  triggerDamageEffect(playerFighterElement, "is-hit");
  triggerDamageEffect(playerHpBar, "is-hit");
  popDamage(playerFighterElement, currentEnemy.attack);
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
playerCharacterSelect.addEventListener("change", (event) => {
  const availableCharacters = getAvailablePlayerCharacters();
  currentPlayer =
    availableCharacters.find((character) => character.id === event.target.value) ?? availableCharacters[0];
  window.localStorage.setItem(PLAYER_CHARACTER_STORAGE_KEY, currentPlayer.id);
  applyPlayerCharacter();
  updateHud();
});

playerNameInput.addEventListener("input", (event) => {
  savePlayerName(event.target.value);
  applyPlayerCharacter();
  updateHud();
});

playerNameInput.addEventListener("change", (event) => {
  savePlayerName(event.target.value);
  event.target.value = currentPlayerName;
  applyPlayerCharacter();
  updateHud();
});

renderCollectibleCards();
startGame();
