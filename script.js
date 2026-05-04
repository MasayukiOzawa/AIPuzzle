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
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="いたずらなダークスターのキャラクター">
        <defs>
          <linearGradient id="villainHat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8d6bff"></stop>
            <stop offset="100%" stop-color="#ff6fb5"></stop>
          </linearGradient>
          <linearGradient id="villainCape" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5b467f"></stop>
            <stop offset="100%" stop-color="#332243"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#fff1f8"></circle>
        <path d="M28 48c7-22 24-32 32-32s25 10 32 32l-9 10H37z" fill="url(#villainHat)"></path>
        <path d="M44 31l16-12 16 12-4 10H48z" fill="#ffd86f"></path>
        <circle cx="60" cy="57" r="26" fill="#ffe1d3"></circle>
        <circle cx="49" cy="55" r="4" fill="#533a71"></circle>
        <circle cx="71" cy="55" r="4" fill="#533a71"></circle>
        <path d="M48 69c8-10 16-10 24 0" fill="none" stroke="#ff5c9f" stroke-linecap="round" stroke-width="5"></path>
        <path d="M34 89c7-10 17-16 26-16s19 6 26 16l6 16H28z" fill="url(#villainCape)"></path>
        <circle cx="32" cy="81" r="5" fill="#8fe3ff"></circle>
        <circle cx="88" cy="81" r="5" fill="#ffcf5c"></circle>
      </svg>
    `,
  },
  {
    id: "mirarouge",
    name: "ミラルージュ",
    attack: 135,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="かがみのまほうをつかう ミラルージュ">
        <defs>
          <linearGradient id="mirrorHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5ed4ff"></stop>
            <stop offset="100%" stop-color="#9b5de5"></stop>
          </linearGradient>
          <linearGradient id="mirrorDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4b3f72"></stop>
            <stop offset="100%" stop-color="#22304f"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#eef7ff"></circle>
        <path d="M31 46c6-18 16-27 29-27s23 9 29 27l-10 10H41z" fill="url(#mirrorHair)"></path>
        <circle cx="60" cy="54" r="24" fill="#ffe8dd"></circle>
        <circle cx="50" cy="53" r="3.8" fill="#533a71"></circle>
        <circle cx="70" cy="53" r="3.8" fill="#533a71"></circle>
        <path d="M49 67c7-6 15-6 22 0" fill="none" stroke="#7b8cff" stroke-linecap="round" stroke-width="4.5"></path>
        <path d="M37 88c6-11 15-16 23-16s17 5 23 16l4 16H33z" fill="url(#mirrorDress)"></path>
        <path d="M25 43l14 9-14 9 4-9z" fill="#8fe3ff"></path>
        <path d="M95 43l-14 9 14 9-4-9z" fill="#ff9fcb"></path>
        <circle cx="36" cy="80" r="5" fill="#ffd86f"></circle>
        <circle cx="84" cy="80" r="5" fill="#8fe3ff"></circle>
      </svg>
    `,
  },
  {
    id: "flarebell",
    name: "フレアベル",
    attack: 145,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="ほのおのリボンをまとう フレアベル">
        <defs>
          <linearGradient id="flareHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff9a44"></stop>
            <stop offset="100%" stop-color="#ff4f81"></stop>
          </linearGradient>
          <linearGradient id="flareDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7e2d56"></stop>
            <stop offset="100%" stop-color="#ff7a59"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#fff3f0"></circle>
        <path d="M30 46c6-19 17-29 30-29s24 10 30 29l-9 11H39z" fill="url(#flareHair)"></path>
        <circle cx="60" cy="55" r="24" fill="#ffe1d3"></circle>
        <circle cx="50" cy="54" r="3.8" fill="#533a71"></circle>
        <circle cx="70" cy="54" r="3.8" fill="#533a71"></circle>
        <path d="M49 68c7-7 15-7 22 0" fill="none" stroke="#ff5c9f" stroke-linecap="round" stroke-width="4.6"></path>
        <path d="M37 88c6-11 15-16 23-16s17 5 23 16l4 16H33z" fill="url(#flareDress)"></path>
        <path d="M36 31l11 9-13 6 2-10z" fill="#ffd86f"></path>
        <path d="M84 31l-11 9 13 6-2-10z" fill="#ffd86f"></path>
        <circle cx="37" cy="81" r="5" fill="#ffd86f"></circle>
        <circle cx="83" cy="81" r="5" fill="#ff9fcb"></circle>
      </svg>
    `,
  },
  {
    id: "snowshell",
    name: "スノウシェル",
    attack: 130,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="こおりのかけらをあやつる スノウシェル">
        <defs>
          <linearGradient id="snowHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#a9f1ff"></stop>
            <stop offset="100%" stop-color="#6f8fff"></stop>
          </linearGradient>
          <linearGradient id="snowDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5c70b8"></stop>
            <stop offset="100%" stop-color="#7de2d1"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#eefcff"></circle>
        <path d="M30 46c7-18 18-28 30-28s23 10 30 28l-10 10H40z" fill="url(#snowHair)"></path>
        <circle cx="60" cy="55" r="24" fill="#fff0e8"></circle>
        <circle cx="50" cy="54" r="3.8" fill="#533a71"></circle>
        <circle cx="70" cy="54" r="3.8" fill="#533a71"></circle>
        <path d="M48 68c8-5 16-5 24 0" fill="none" stroke="#5ed4ff" stroke-linecap="round" stroke-width="4.2"></path>
        <path d="M37 88c6-10 15-15 23-15s17 5 23 15l4 16H33z" fill="url(#snowDress)"></path>
        <path d="M26 46l10-8 6 11-13 3z" fill="#ffffff"></path>
        <path d="M94 46l-10-8-6 11 13 3z" fill="#ffffff"></path>
        <circle cx="38" cy="81" r="5" fill="#8fe3ff"></circle>
        <circle cx="82" cy="81" r="5" fill="#ffffff"></circle>
      </svg>
    `,
  },
  {
    id: "candyarc",
    name: "キャンディアーク",
    attack: 140,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="あまいまほうをつかう キャンディアーク">
        <defs>
          <linearGradient id="candyHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ff8cc6"></stop>
            <stop offset="100%" stop-color="#ffcf5c"></stop>
          </linearGradient>
          <linearGradient id="candyDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#8f3f7c"></stop>
            <stop offset="100%" stop-color="#ff8cb8"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#fff7ef"></circle>
        <path d="M30 47c7-19 18-29 30-29s23 10 30 29l-10 10H40z" fill="url(#candyHair)"></path>
        <circle cx="60" cy="55" r="24" fill="#ffe7d7"></circle>
        <circle cx="50" cy="54" r="3.8" fill="#533a71"></circle>
        <circle cx="70" cy="54" r="3.8" fill="#533a71"></circle>
        <path d="M48 68c8-6 16-6 24 0" fill="none" stroke="#ff6fb5" stroke-linecap="round" stroke-width="4.5"></path>
        <path d="M37 88c6-11 15-16 23-16s17 5 23 16l4 16H33z" fill="url(#candyDress)"></path>
        <circle cx="32" cy="40" r="8" fill="#8fe3ff"></circle>
        <circle cx="88" cy="40" r="8" fill="#ffd86f"></circle>
        <path d="M28 40h8M84 40h8" stroke="#ffffff" stroke-linecap="round" stroke-width="3"></path>
        <circle cx="37" cy="81" r="5" fill="#ffd86f"></circle>
        <circle cx="83" cy="81" r="5" fill="#8fe3ff"></circle>
      </svg>
    `,
  },
  {
    id: "lunashadow",
    name: "ルナシャドウ",
    attack: 150,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="つきよのいたずらをしかける ルナシャドウ">
        <defs>
          <linearGradient id="lunaHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#7b8cff"></stop>
            <stop offset="100%" stop-color="#4a2b72"></stop>
          </linearGradient>
          <linearGradient id="lunaDress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#1f2748"></stop>
            <stop offset="100%" stop-color="#6e56a0"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#f1f1ff"></circle>
        <path d="M30 46c7-19 18-29 30-29s23 10 30 29l-10 10H40z" fill="url(#lunaHair)"></path>
        <circle cx="60" cy="55" r="24" fill="#ffe8dd"></circle>
        <circle cx="50" cy="54" r="3.8" fill="#533a71"></circle>
        <circle cx="70" cy="54" r="3.8" fill="#533a71"></circle>
        <path d="M48 69c8-8 16-8 24 0" fill="none" stroke="#8fe3ff" stroke-linecap="round" stroke-width="4.3"></path>
        <path d="M37 88c6-11 15-16 23-16s17 5 23 16l4 16H33z" fill="url(#lunaDress)"></path>
        <path d="M80 26a10 10 0 1 0 0 20 12 12 0 1 1 0-20z" fill="#ffd86f"></path>
        <circle cx="37" cy="81" r="5" fill="#8fe3ff"></circle>
        <circle cx="83" cy="81" r="5" fill="#ffd86f"></circle>
      </svg>
    `,
  },
  {
    id: "gigagao",
    name: "ギガガオーン",
    attack: 158,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="おおきなモンスターの ギガガオーン">
        <circle cx="60" cy="60" r="52" fill="#f3fff1"></circle>
        <ellipse cx="60" cy="70" rx="34" ry="30" fill="#76c96f"></ellipse>
        <ellipse cx="60" cy="46" rx="30" ry="24" fill="#8de081"></ellipse>
        <circle cx="48" cy="50" r="4.5" fill="#2f4f3a"></circle>
        <circle cx="72" cy="50" r="4.5" fill="#2f4f3a"></circle>
        <rect x="45" y="61" width="30" height="14" rx="7" fill="#f7fff5"></rect>
        <rect x="47" y="63" width="4" height="8" rx="2" fill="#ffffff"></rect>
        <rect x="55" y="63" width="4" height="8" rx="2" fill="#ffffff"></rect>
        <rect x="63" y="63" width="4" height="8" rx="2" fill="#ffffff"></rect>
        <rect x="71" y="63" width="4" height="8" rx="2" fill="#ffffff"></rect>
        <path d="M32 86c7-9 17-14 28-14s21 5 28 14l4 14H28z" fill="#4f8f56"></path>
        <path d="M36 33l8-10 7 12-9 6z" fill="#b2f4a4"></path>
        <path d="M84 33l-8-10-7 12 9 6z" fill="#b2f4a4"></path>
      </svg>
    `,
  },
  {
    id: "kagekoro",
    name: "カゲコロ",
    attack: 146,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="ようかいキャラクターの カゲコロ">
        <circle cx="60" cy="60" r="52" fill="#f5f1ff"></circle>
        <path d="M60 20c18 0 32 15 32 33 0 20-12 35-32 47-20-12-32-27-32-47 0-18 14-33 32-33z" fill="#6e56a0"></path>
        <circle cx="49" cy="56" r="4" fill="#ffffff"></circle>
        <circle cx="71" cy="56" r="4" fill="#ffffff"></circle>
        <path d="M49 72c7-5 15-5 22 0" fill="none" stroke="#8fe3ff" stroke-linecap="round" stroke-width="4"></path>
        <circle cx="60" cy="38" r="9" fill="#8b6dff"></circle>
        <path d="M26 52l12 8-12 8 3-8z" fill="#b5a2ff"></path>
        <path d="M94 52l-12 8 12 8-3-8z" fill="#b5a2ff"></path>
        <circle cx="40" cy="86" r="5" fill="#8fe3ff"></circle>
        <circle cx="80" cy="86" r="5" fill="#ffd86f"></circle>
      </svg>
    `,
  },
  {
    id: "kakupeta",
    name: "カクペタ",
    attack: 139,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="しかくいほっぺの カクペタ">
        <circle cx="60" cy="60" r="52" fill="#fff8ef"></circle>
        <rect x="30" y="26" width="60" height="52" rx="14" fill="#ffd9b8"></rect>
        <rect x="40" y="48" width="8" height="8" rx="2" fill="#533a71"></rect>
        <rect x="72" y="48" width="8" height="8" rx="2" fill="#533a71"></rect>
        <path d="M48 66c8 6 16 6 24 0" fill="none" stroke="#ff8db3" stroke-linecap="round" stroke-width="4"></path>
        <rect x="36" y="58" width="12" height="12" rx="2" fill="#ffb3c7"></rect>
        <rect x="72" y="58" width="12" height="12" rx="2" fill="#ffb3c7"></rect>
        <path d="M34 88c7-10 16-15 26-15s19 5 26 15l5 14H29z" fill="#7de2d1"></path>
        <rect x="52" y="80" width="16" height="10" rx="2" fill="#ffffff" opacity="0.85"></rect>
      </svg>
    `,
  },
  {
    id: "hatepyon",
    name: "ハテピョン",
    attack: 142,
    avatar: `
      <svg viewBox="0 0 120 120" role="img" aria-label="にんげんみたいな かみがたの ハテピョン">
        <defs>
          <linearGradient id="hateHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#5d4a85"></stop>
            <stop offset="100%" stop-color="#2f224c"></stop>
          </linearGradient>
          <linearGradient id="hateJacket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#67a7ff"></stop>
            <stop offset="100%" stop-color="#8b6dff"></stop>
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r="52" fill="#f3f5ff"></circle>
        <path d="M25 49c4-21 18-34 35-34 18 0 30 13 35 34l-7 10H32z" fill="url(#hateHair)"></path>
        <path d="M39 40c6-8 12-13 21-13 8 0 14 4 21 13l-2 9H41z" fill="#24183f"></path>
        <path d="M40 53c2-6 7-9 12-9h16c5 0 10 3 12 9-8-4-16-5-24-5s-16 1-16 5z" fill="#6c5b9b"></path>
        <circle cx="60" cy="56" r="24" fill="#ffe5d6"></circle>
        <circle cx="50" cy="55" r="3.8" fill="#3f315e"></circle>
        <circle cx="70" cy="55" r="3.8" fill="#3f315e"></circle>
        <path d="M49 68c7 6 15 6 22 0" fill="none" stroke="#ff7eb6" stroke-linecap="round" stroke-width="4.5"></path>
        <path d="M36 88c6-11 15-16 24-16 8 0 17 5 24 16l4 16H32z" fill="url(#hateJacket)"></path>
        <path d="M54 77h12l2 11H52z" fill="#ffffff" opacity="0.9"></path>
        <circle cx="37" cy="81" r="5" fill="#8fe3ff"></circle>
        <circle cx="83" cy="81" r="5" fill="#ffd86f"></circle>
      </svg>
    `,
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
const collectibleCards = document.querySelectorAll(".collectible-card");
const restartButton = document.querySelector("#restartButton");
const playerCharacterSelect = document.querySelector("#playerCharacterSelect");
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

function applyPlayerCharacter() {
  syncPlayerCharacterSelect();
  playerCharacterSelect.value = currentPlayer.id;
  playerHeroVisual.innerHTML = currentPlayer.heroAvatar;
  playerBattleVisual.innerHTML = currentPlayer.battleAvatar;
  playerHeroName.textContent = `${currentPlayer.title}: ${currentPlayer.name}`;
  playerNameLabel.textContent = currentPlayer.name;
  miniPlayerNameLabel.textContent = `${currentPlayer.name} HP`;
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

function updateCollectionUI() {
  const validEnemyIds = new Set(ENEMY_CHARACTERS.map((enemy) => enemy.id));
  const collectedCount = Array.from(collectedRivals).filter((id) => validEnemyIds.has(id)).length;

  collectionCountText.textContent = String(collectedCount);
  collectionTotalText.textContent = String(ENEMY_CHARACTERS.length);

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

startGame();
