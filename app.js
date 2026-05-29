(function () {
  "use strict";

  const TRACK_LENGTH = 30;
  const FINISH_INDEX = TRACK_LENGTH - 1;
  const FIRST_CROSSING_INDEX = 6;
  const MOVE_OPTIONS = [1, 2, 3];
  const DIFFICULTY_POINTS = [1, 2, 3, 4, 5];
  const PLACEMENT_BONUS = [15, 8, 4, 0];
  const STORAGE_KEY = "math-gran-prix-web-records";
  const HAZARD_KEYS = ["spinner", "skipper", "sinker", "steps"];

  const PLAYER_STYLES = [
    { name: "Red Car", color: "#cd4f49" },
    { name: "Blue Car", color: "#3b6fc7" },
    { name: "Green Car", color: "#4f9b55" },
    { name: "Orange Car", color: "#db8a35" },
  ];

  const MODE_NAMES = {
    1: "Easy Add/Subtract",
    2: "Medium Add/Subtract",
    3: "Hard Add/Subtract",
    4: "Easy Multiply/Divide",
    5: "Medium Multiply/Divide",
    6: "Hard Multiply/Divide",
    7: "Easy Mixed",
    8: "Medium Mixed",
    9: "Hard Mixed",
  };

  const TRACK_LAYOUTS = {
    classic: { name: "Classic Crossing", family: "classic" },
    overpass: { name: "Overpass Weave", family: "overpass" },
    switchback: { name: "Switchback Circuit", family: "switchback" },
    random: { name: "Random Template", family: "random" },
  };

  const TRACK_LIBRARY = {
    classic: [
      createTemplate(
        "classic-a",
        [
          [92, 474], [164, 474], [236, 474], [308, 474], [380, 474], [452, 474], [524, 474],
          [596, 474], [668, 474], [740, 474], [812, 474], [884, 474], [956, 474],
          [956, 382], [956, 290], [956, 198], [884, 198], [812, 198], [740, 198], [668, 198],
          [596, 198], [524, 198], [452, 198], [380, 198], [308, 198], [236, 198], [164, 198], [92, 198], [92, 122], [92, 68],
        ],
        [6, 12, 18, 24],
        [
          { from: 0, to: 12, lanes: 2 },
          { from: 12, to: 15, lanes: 1 },
          { from: 15, to: 27, lanes: 2 },
          { from: 27, to: 29, lanes: 1 },
        ],
        [8, 9, 10, 13, 14, 19, 20, 21, 25, 26]
      ),
      createTemplate(
        "classic-b",
        [
          [100, 470], [176, 470], [252, 470], [328, 470], [404, 470], [480, 470], [556, 470],
          [632, 470], [708, 470], [784, 470], [860, 470], [936, 470], [992, 424],
          [992, 340], [992, 256], [948, 182], [872, 160], [796, 160], [720, 160], [644, 160],
          [568, 160], [492, 160], [416, 160], [340, 160], [264, 160], [188, 160], [112, 160], [84, 232], [84, 320], [84, 408],
        ],
        [6, 12, 18, 24],
        [
          { from: 0, to: 11, lanes: 2 },
          { from: 11, to: 15, lanes: 1 },
          { from: 15, to: 26, lanes: 2 },
          { from: 26, to: 29, lanes: 1 },
        ],
        [7, 8, 10, 13, 16, 17, 20, 21, 25, 27]
      ),
    ],
    overpass: [
      createTemplate(
        "overpass-a",
        [
          [92, 456], [132, 392], [190, 354], [256, 338], [322, 330], [394, 314], [466, 276],
          [534, 238], [604, 226], [678, 244], [750, 286], [818, 338], [874, 378],
          [930, 352], [968, 288], [948, 216], [892, 168], [820, 134], [740, 120], [656, 126],
          [574, 150], [500, 178], [428, 176], [354, 154], [278, 142], [204, 154], [142, 192], [104, 256], [92, 332], [92, 404],
        ],
        [6, 12, 18, 24],
        [
          { from: 0, to: 6, lanes: 1 },
          { from: 6, to: 12, lanes: 2 },
          { from: 12, to: 16, lanes: 1 },
          { from: 16, to: 24, lanes: 2 },
          { from: 24, to: 29, lanes: 1 },
        ],
        [7, 8, 10, 13, 14, 19, 20, 23, 25, 27]
      ),
      createTemplate(
        "overpass-b",
        [
          [106, 452], [164, 420], [236, 398], [318, 384], [398, 380], [474, 364], [546, 330],
          [620, 294], [700, 286], [780, 308], [854, 348], [918, 394], [970, 392],
          [988, 322], [970, 252], [928, 192], [864, 152], [788, 130], [706, 124], [620, 134],
          [538, 156], [460, 184], [386, 196], [314, 178], [242, 146], [176, 134], [126, 178], [100, 244], [94, 322], [98, 394],
        ],
        [6, 12, 18, 24],
        [
          { from: 0, to: 5, lanes: 1 },
          { from: 5, to: 12, lanes: 2 },
          { from: 12, to: 16, lanes: 1 },
          { from: 16, to: 23, lanes: 2 },
          { from: 23, to: 29, lanes: 1 },
        ],
        [7, 9, 10, 13, 15, 18, 20, 22, 25, 27]
      ),
    ],
    switchback: [
      createTemplate(
        "switchback-a",
        [
          [100, 452], [170, 426], [244, 398], [316, 360], [386, 320], [456, 314], [528, 340],
          [596, 382], [664, 420], [738, 408], [808, 370], [876, 326], [944, 284],
          [964, 212], [930, 150], [864, 120], [786, 120], [706, 136], [632, 168], [564, 202],
          [492, 204], [418, 172], [344, 136], [266, 118], [192, 132], [132, 182], [106, 252], [96, 324], [94, 388], [96, 444],
        ],
        [6, 12, 18, 24],
        [
          { from: 0, to: 4, lanes: 1 },
          { from: 4, to: 12, lanes: 2 },
          { from: 12, to: 16, lanes: 1 },
          { from: 16, to: 22, lanes: 2 },
          { from: 22, to: 29, lanes: 1 },
        ],
        [7, 8, 11, 13, 15, 19, 20, 21, 25, 27]
      ),
      createTemplate(
        "switchback-b",
        [
          [92, 458], [156, 430], [224, 396], [288, 352], [352, 306], [422, 286], [500, 302],
          [578, 340], [650, 384], [722, 426], [796, 424], [872, 390], [950, 352],
          [988, 290], [972, 216], [922, 156], [850, 124], [770, 122], [690, 138], [612, 170],
          [534, 198], [456, 190], [382, 156], [306, 126], [228, 122], [158, 150], [112, 208], [96, 280], [94, 352], [94, 420],
        ],
        [6, 12, 18, 24],
        [
          { from: 0, to: 5, lanes: 1 },
          { from: 5, to: 12, lanes: 2 },
          { from: 12, to: 16, lanes: 1 },
          { from: 16, to: 23, lanes: 2 },
          { from: 23, to: 29, lanes: 1 },
        ],
        [7, 10, 11, 13, 15, 18, 20, 22, 26, 27]
      ),
    ],
  };

  const storage = createStorageAdapter();

  const state = {
    config: {
      players: 2,
      humans: 1,
      mode: 7,
      theme: "sand",
      track: "classic",
    },
    players: [],
    activeIndex: 0,
    phase: "setup",
    currentQuestion: null,
    feedback: "Set up the race and start the prototype.",
    forceThree: false,
    highScores: storage.load().highScores,
    winners: storage.load().winners,
    placements: [],
    track: buildTrackInstance("classic"),
  };

  const els = {
    playerCount: document.querySelector("#player-count"),
    humanCount: document.querySelector("#human-count"),
    modeSelect: document.querySelector("#mode-select"),
    trackSelect: document.querySelector("#track-select"),
    themeSelect: document.querySelector("#theme-select"),
    driverConfig: document.querySelector("#driver-config"),
    startRaceBtn: document.querySelector("#start-race-btn"),
    newRaceBtn: document.querySelector("#new-race-btn"),
    resetScoresBtn: document.querySelector("#reset-scores-btn"),
    boardStage: document.querySelector("#board-stage"),
    statusSummary: document.querySelector("#status-summary"),
    driverRoster: document.querySelector("#driver-roster"),
    promptTitle: document.querySelector("#prompt-title"),
    promptBody: document.querySelector("#prompt-body"),
    moveControls: document.querySelector("#move-controls"),
    answerControls: document.querySelector("#answer-controls"),
    recordsBody: document.querySelector("#records-body"),
    driverTemplate: document.querySelector("#driver-config-template"),
  };

  function createStorageAdapter() {
    return {
      load() {
        try {
          const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
          return {
            highScores: Array.isArray(parsed.highScores) ? parsed.highScores : [],
            winners: parsed.winners && typeof parsed.winners === "object" ? parsed.winners : {},
          };
        } catch {
          return { highScores: [], winners: {} };
        }
      },
      save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      },
      clear() {
        localStorage.removeItem(STORAGE_KEY);
      },
    };
  }

  function createTemplate(key, points, safeSpots, laneSegments, hazardCandidates) {
    return {
      key,
      points,
      safeSpots,
      laneSegments,
      hazardCandidates,
    };
  }

  function buildTrackInstance(layoutKey) {
    const family = TRACK_LAYOUTS[layoutKey].family;
    const templates = family === "random"
      ? [...TRACK_LIBRARY.classic, ...TRACK_LIBRARY.overpass, ...TRACK_LIBRARY.switchback]
      : TRACK_LIBRARY[family];
    const template = templates[randInt(0, templates.length - 1)];
    const hazards = randomizeHazards(template.hazardCandidates);
    return {
      layoutKey,
      templateKey: template.key,
      points: template.points.map((point) => [...point]),
      safeSpots: new Set(template.safeSpots),
      laneSegments: template.laneSegments.map((segment) => ({ ...segment })),
      hazards,
    };
  }

  function randomizeHazards(candidates) {
    const pool = shuffle([...candidates]);
    const picks = pool.slice(0, HAZARD_KEYS.length).sort((a, b) => a - b);
    return {
      spinner: picks[0],
      skipper: picks[1],
      sinker: picks[2],
      steps: picks[3],
    };
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = randInt(0, index);
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function currentPlayer() {
    return state.players[state.activeIndex];
  }

  function hazardAt(index) {
    return Object.entries(state.track.hazards).find(([, value]) => value === index)?.[0] || null;
  }

  function initControls() {
    for (let value = 2; value <= 4; value += 1) {
      els.playerCount.append(new Option(String(value), String(value)));
    }
    for (let value = 1; value <= 4; value += 1) {
      els.humanCount.append(new Option(String(value), String(value)));
    }
    for (let value = 1; value <= 9; value += 1) {
      els.modeSelect.append(new Option(`${value}: ${MODE_NAMES[value]}`, String(value)));
    }
    Object.entries(TRACK_LAYOUTS).forEach(([key, layout]) => {
      els.trackSelect.append(new Option(layout.name, key));
    });

    els.playerCount.value = String(state.config.players);
    els.humanCount.value = String(state.config.humans);
    els.modeSelect.value = String(state.config.mode);
    els.trackSelect.value = state.config.track;
    els.themeSelect.value = state.config.theme;

    els.playerCount.addEventListener("change", () => {
      state.config.players = Number(els.playerCount.value);
      state.config.humans = clamp(state.config.humans, 1, state.config.players);
      els.humanCount.value = String(state.config.humans);
      rebuildDriverConfig();
      render();
    });

    els.humanCount.addEventListener("change", () => {
      state.config.humans = clamp(Number(els.humanCount.value), 1, state.config.players);
      rebuildDriverConfig();
      render();
    });

    els.modeSelect.addEventListener("change", () => {
      state.config.mode = Number(els.modeSelect.value);
      render();
    });

    els.trackSelect.addEventListener("change", () => {
      state.config.track = els.trackSelect.value;
      state.track = buildTrackInstance(state.config.track);
      render();
    });

    els.themeSelect.addEventListener("change", () => {
      state.config.theme = els.themeSelect.value;
      applyTheme();
      render();
    });

    els.startRaceBtn.addEventListener("click", startRace);
    els.newRaceBtn.addEventListener("click", resetToSetup);
    els.resetScoresBtn.addEventListener("click", () => {
      state.highScores = [];
      state.winners = {};
      storage.clear();
      renderRecords();
    });
  }

  function applyTheme() {
    const root = document.documentElement;
    if (state.config.theme === "midnight") {
      root.style.setProperty("--bg", "#16202a");
      root.style.setProperty("--bg-accent", "#202f3b");
      root.style.setProperty("--panel", "rgba(31, 40, 53, 0.9)");
      root.style.setProperty("--panel-border", "#8090a4");
      root.style.setProperty("--text", "#edf1f4");
      root.style.setProperty("--muted", "#b8c0ca");
      root.style.setProperty("--road", "#5d6773");
      root.style.setProperty("--road-edge", "#f1f3f6");
      root.style.setProperty("--highlight", "#ef6a61");
      root.style.setProperty("--track-bg", "linear-gradient(180deg, #35414d 0%, #2a3440 100%)");
    } else if (state.config.theme === "forest") {
      root.style.setProperty("--bg", "#dde7d6");
      root.style.setProperty("--bg-accent", "#edf4e6");
      root.style.setProperty("--panel", "rgba(250, 252, 246, 0.9)");
      root.style.setProperty("--panel-border", "#52624f");
      root.style.setProperty("--text", "#2c362c");
      root.style.setProperty("--muted", "#667364");
      root.style.setProperty("--road", "#677071");
      root.style.setProperty("--road-edge", "#f4f5ef");
      root.style.setProperty("--highlight", "#bb5a42");
      root.style.setProperty("--track-bg", "linear-gradient(180deg, #c7d0be 0%, #b8c4af 100%)");
    } else {
      root.style.removeProperty("--bg");
      root.style.removeProperty("--bg-accent");
      root.style.removeProperty("--panel");
      root.style.removeProperty("--panel-border");
      root.style.removeProperty("--text");
      root.style.removeProperty("--muted");
      root.style.removeProperty("--road");
      root.style.removeProperty("--road-edge");
      root.style.removeProperty("--highlight");
      root.style.removeProperty("--track-bg");
    }
  }

  function rebuildDriverConfig() {
    els.driverConfig.innerHTML = "";
    for (let index = 0; index < state.config.players; index += 1) {
      const player = PLAYER_STYLES[index];
      const fragment = els.driverTemplate.content.cloneNode(true);
      const card = fragment.querySelector(".driver-card");
      const swatch = fragment.querySelector(".swatch");
      const name = fragment.querySelector(".driver-name");
      const initials = fragment.querySelector(".driver-initials");
      const controller = fragment.querySelector(".driver-controller");

      swatch.style.background = player.color;
      name.textContent = player.name;
      initials.value = player.name.split(" ").map((part) => part[0]).join("").slice(0, 3).toUpperCase();
      controller.value = index < state.config.humans ? "human" : "ai";
      controller.addEventListener("change", syncHumanCountFromControllers);
      card.dataset.index = String(index);
      els.driverConfig.append(card);
    }
  }

  function syncHumanCountFromControllers() {
    const cards = [...els.driverConfig.querySelectorAll(".driver-card")];
    const humans = cards.filter((card) => card.querySelector(".driver-controller").value === "human").length;
    state.config.humans = clamp(humans, 1, state.config.players);
    els.humanCount.value = String(state.config.humans);
  }

  function startRace() {
    const cards = [...els.driverConfig.querySelectorAll(".driver-card")];
    state.players = cards.map((card, index) => {
      const style = PLAYER_STYLES[index];
      const isAi = card.querySelector(".driver-controller").value === "ai";
      const initialsValue = card.querySelector(".driver-initials").value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
      return {
        ...style,
        initials: isAi ? "CPU" : (initialsValue || style.name.slice(0, 3).toUpperCase()),
        isAi,
        timed: card.querySelector(".driver-timed").checked,
        position: 0,
        score: 0,
        correctAnswers: 0,
        shielded: false,
        brokenDown: false,
        skipNextSelection: false,
      };
    });

    state.activeIndex = 0;
    state.phase = "chooseMove";
    state.currentQuestion = null;
    state.feedback = "Race started. Choose a move.";
    state.forceThree = false;
    state.placements = [];
    state.track = buildTrackInstance(state.config.track);
    render();

    if (currentPlayer().isAi) {
      queueAiTurn();
    }
  }

  function resetToSetup() {
    state.phase = "setup";
    state.currentQuestion = null;
    state.feedback = "Set up the next prototype race.";
    state.players = [];
    state.placements = [];
    state.track = buildTrackInstance(state.config.track);
    render();
  }

  function difficultyForMove(player, spaces, repair) {
    const baseDifficulty = (state.config.mode - 1) % 3;
    if (repair) return 0;
    return clamp(baseDifficulty + (player.score > 18 ? 1 : 0) + (spaces - 1), 0, 4);
  }

  function generateQuestion(player, spaces, repair = false) {
    const group = Math.floor((state.config.mode - 1) / 3);
    const difficulty = difficultyForMove(player, spaces, repair);
    const operations = group === 0 ? ["+", "-"] : group === 1 ? ["x", "÷"] : ["+", "-", "x", "÷"];
    const operation = operations[randInt(0, operations.length - 1)];

    if (operation === "+" || operation === "-") {
      const cap = [10, 20, 50, 99, 150][difficulty];
      const a = randInt(0, cap);
      const b = randInt(0, cap);
      if (operation === "-") {
        const hi = Math.max(a, b);
        const lo = Math.min(a, b);
        return { prompt: `${hi} - ${lo} = ?`, answer: hi - lo, difficulty };
      }
      return { prompt: `${a} + ${b} = ?`, answer: a + b, difficulty };
    }

    const cap = [[3, 5], [5, 8], [7, 10], [10, 12], [12, 15]][difficulty];
    const a = randInt(0, cap[0]);
    const b = randInt(1, cap[1]);
    if (operation === "x") {
      return { prompt: `${a} x ${b} = ?`, answer: a * b, difficulty };
    }
    return { prompt: `${a * b} ÷ ${b} = ?`, answer: a, difficulty };
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function awardPoints(player, difficulty, move) {
    const score = DIFFICULTY_POINTS[difficulty] + Math.max(0, move - 1);
    player.score += score;
    player.correctAnswers += 1;
    return score;
  }

  function askQuestion(move) {
    const player = currentPlayer();
    const repair = player.brokenDown;
    state.currentQuestion = {
      ...generateQuestion(player, move, repair),
      move,
      repair,
    };
    state.phase = "answering";
    state.feedback = repair
      ? `${player.name} needs a repair answer.`
      : `${player.name} is solving for ${move} space${move === 1 ? "" : "s"}.`;
    render();
    if (player.isAi) {
      queueAiAnswer();
    }
  }

  function queueAiTurn() {
    setTimeout(() => {
      if (state.phase !== "chooseMove" || !currentPlayer().isAi) return;
      askQuestion(chooseAiMove(currentPlayer()));
    }, 550);
  }

  function queueAiAnswer() {
    setTimeout(() => {
      if (state.phase !== "answering" || !currentPlayer().isAi) return;
      const difficulty = state.currentQuestion.difficulty;
      const accuracy = clamp(0.9 - difficulty * 0.12, 0.24, 0.97);
      const answer = Math.random() < accuracy
        ? state.currentQuestion.answer
        : Math.max(0, state.currentQuestion.answer + [-3, -2, -1, 1, 2, 3][randInt(0, 5)]);
      submitAnswer(String(answer));
    }, 850);
  }

  function chooseAiMove(player) {
    if (state.forceThree) return 3;
    if (player.brokenDown) return 1;

    let bestMove = 1;
    let bestScore = -Infinity;
    for (const move of MOVE_OPTIONS) {
      const target = Math.min(FINISH_INDEX, player.position + move);
      const hazard = hazardAt(target);
      let score = move * 4 + (move === 1 ? 2 : 0);
      if (hazard === "spinner") score += 10;
      if (hazard === "skipper") score += 12;
      if (hazard === "sinker") score += 8;
      if (hazard === "steps") score += 5;
      if (target >= FIRST_CROSSING_INDEX && !state.track.safeSpots.has(target)) {
        score += state.players.filter((other) => other !== player && other.position === target && !other.brokenDown).length * 9;
      }
      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    }
    return bestMove;
  }

  function submitAnswer(rawValue) {
    const player = currentPlayer();
    const expected = state.currentQuestion.answer;
    const numeric = Number(rawValue);
    const correct = numeric === expected;

    if (correct) {
      const points = awardPoints(player, state.currentQuestion.difficulty, state.currentQuestion.move);
      if (state.currentQuestion.repair) {
        player.brokenDown = false;
        state.feedback = `${player.name} repaired the car. +${points} points.`;
      } else {
        applyMove(player, state.currentQuestion.move, points);
      }
    } else {
      state.feedback = `Incorrect. Correct answer: ${expected}.`;
    }

    state.currentQuestion = null;
    if (state.phase !== "gameOver") {
      nextTurn();
    }
    render();
  }

  function applyMove(player, move, points) {
    player.position = Math.min(FINISH_INDEX, player.position + move);
    const target = player.position;
    const opponents = state.players.filter((other) => other !== player && other.position === target);

    if (target >= FIRST_CROSSING_INDEX && !state.track.safeSpots.has(target)) {
      opponents.forEach((opponent) => {
        if (opponent.brokenDown) return;
        if (opponent.shielded) {
          opponent.shielded = false;
        } else {
          opponent.brokenDown = true;
        }
      });
    }

    const hazard = hazardAt(target);
    if (hazard === "spinner") {
      const jump = randInt(1, 4);
      player.position = Math.min(FINISH_INDEX, player.position + jump);
      state.feedback = `${player.name} hit Spinner and jumped ${jump} more spaces. +${points} points.`;
    } else if (hazard === "skipper") {
      player.skipNextSelection = true;
      state.feedback = `${player.name} hit Skipper and earns an extra turn. +${points} points.`;
    } else if (hazard === "sinker") {
      player.shielded = true;
      state.feedback = `${player.name} hit Sinker and gained one bump shield. +${points} points.`;
    } else if (hazard === "steps") {
      state.forceThree = true;
      state.feedback = `${player.name} reached Steps. Only 3-space moves remain. +${points} points.`;
    } else {
      state.feedback = `${player.name} advanced ${move} space${move === 1 ? "" : "s"}. +${points} points.`;
    }

    if (player.position >= FINISH_INDEX) {
      finishRace(player);
    }
  }

  function finishRace(winner) {
    state.phase = "gameOver";
    state.placements = [...state.players].sort((a, b) => {
      if (b.position !== a.position) return b.position - a.position;
      return b.score - a.score;
    });

    state.placements.forEach((player, index) => {
      player.score += PLACEMENT_BONUS[index] || 0;
    });

    state.feedback = `${winner.name} wins the race on ${TRACK_LAYOUTS[state.config.track].name}.`;
    state.highScores.push(...state.placements.map((player, index) => ({
      initials: player.initials,
      score: player.score,
      place: index + 1,
      name: player.name,
      mode: state.config.mode,
      track: state.track.templateKey,
    })));
    state.highScores.sort((a, b) => b.score - a.score);
    state.highScores = state.highScores.slice(0, 20);
    state.winners[winner.initials] = (state.winners[winner.initials] || 0) + 1;
    storage.save({ highScores: state.highScores, winners: state.winners });
  }

  function nextTurn() {
    const player = currentPlayer();
    if (player.skipNextSelection) {
      player.skipNextSelection = false;
      state.phase = "chooseMove";
    } else {
      state.activeIndex = (state.activeIndex + 1) % state.players.length;
      state.phase = "chooseMove";
    }
    if (currentPlayer().isAi) {
      queueAiTurn();
    }
  }

  function renderBoard() {
    const points = state.track.points;
    const path = points.map((point) => point.join(",")).join(" ");
    const laneMarkup = state.track.laneSegments.map((segment) => laneSegmentSvg(points, segment)).join("");
    const hazardMarkup = Object.entries(state.track.hazards)
      .map(([key, index]) => hazardSvg(points[index], key))
      .join("");
    const playerMarkup = state.players.map((player, index) => {
      const point = points[player.position] || points[0];
      const offsets = [[-20, -20], [20, -20], [-20, 20], [20, 20]];
      const [ox, oy] = offsets[index] || [0, 0];
      return carSvg(point[0] + ox, point[1] + oy, player.color);
    }).join("");

    els.boardStage.innerHTML = `
      <svg viewBox="0 0 1040 560" aria-label="Math Gran Prix track">
        <defs>
          <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="rgba(0,0,0,0.18)"></feDropShadow>
          </filter>
        </defs>
        <g filter="url(#softShadow)">
          <polyline points="${path}" fill="none" stroke="var(--road)" stroke-width="82" stroke-linecap="round" stroke-linejoin="round"></polyline>
          <polyline points="${path}" fill="none" stroke="var(--road-edge)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
          ${laneMarkup}
        </g>
        <g>
          <rect x="36" y="34" width="132" height="84" rx="18" fill="rgba(255,251,241,0.92)" stroke="var(--panel-border)" stroke-width="2"></rect>
          <text x="54" y="66" fill="var(--text)" font-size="20" font-weight="700">FINISH</text>
          <g transform="translate(52 88)">
            ${[0, 1, 2, 3].map((i) => `<rect x="${i * 18}" y="0" width="10" height="32" fill="${i % 2 === 0 ? "#222" : "#f2f2f2"}"></rect>`).join("")}
          </g>
        </g>
        ${points.map((point, index) => nodeSvg(point, index)).join("")}
        ${hazardMarkup}
        ${playerMarkup}
      </svg>
    `;
  }

  function laneSegmentSvg(points, segment) {
    const subset = points.slice(segment.from, segment.to + 1).map((point) => point.join(",")).join(" ");
    const dividerWidth = segment.lanes === 2 ? 22 : 0;
    return `
      <g>
        <polyline points="${subset}" fill="none" stroke="var(--road)" stroke-width="${segment.lanes === 2 ? 92 : 64}" stroke-linecap="round" stroke-linejoin="round"></polyline>
        ${dividerWidth ? `<polyline points="${subset}" fill="none" stroke="rgba(255,255,255,0.28)" stroke-dasharray="14 14" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>` : ""}
      </g>
    `;
  }

  function nodeSvg(point, index) {
    const hazard = hazardAt(index);
    const fills = {
      spinner: "#ffe07f",
      skipper: "#87d8ff",
      sinker: "#bea0e9",
      steps: "#ffb56e",
    };
    const fill = fills[hazard] || (state.track.safeSpots.has(index) ? "#d9e6c5" : "#fbfbfb");
    return `
      <g>
        <circle cx="${point[0]}" cy="${point[1]}" r="26" fill="${fill}" stroke="rgba(0,0,0,0.18)" stroke-width="1"></circle>
        <text x="${point[0]}" y="${point[1] + 6}" text-anchor="middle" fill="#2d2d2d" font-size="18">${index}</text>
      </g>
    `;
  }

  function hazardSvg(point, key) {
    const spec = {
      spinner: { label: "Spinner", color: "#ffd96b", icon: "star" },
      skipper: { label: "Skipper", color: "#7fd3ff", icon: "flag" },
      sinker: { label: "Sinker", color: "#bb9ae6", icon: "shield" },
      steps: { label: "Steps", color: "#ffb057", icon: "stairs" },
    }[key];

    const iconMarkup = spec.icon === "star"
      ? `<path d="M0,-13 L4,-4 L14,-4 L6,2 L9,12 L0,6 L-9,12 L-6,2 L-14,-4 L-4,-4 Z" fill="${spec.color}" stroke="#6b685d" stroke-width="1.5"></path>`
      : spec.icon === "flag"
        ? `<path d="M-2,-14 L-2,12 M-2,-12 L14,-8 L-2,-2" fill="none" stroke="${spec.color}" stroke-width="4" stroke-linecap="round"></path>`
        : spec.icon === "shield"
          ? `<path d="M0,-13 L12,-8 L10,6 L0,14 L-10,6 L-12,-8 Z" fill="${spec.color}" stroke="#6b685d" stroke-width="1.5"></path>`
          : `<path d="M-10,10 L-10,2 L-3,2 L-3,-6 L4,-6 L4,-14 L12,-14" fill="none" stroke="${spec.color}" stroke-width="4" stroke-linecap="round"></path>`;
    return `
      <g transform="translate(${point[0]} ${point[1] - 42})">
        ${iconMarkup}
        <text x="0" y="-20" text-anchor="middle" fill="${spec.color}" font-size="12" font-weight="700">${spec.label.toUpperCase()}</text>
      </g>
    `;
  }

  function carSvg(x, y, color) {
    return `
      <g transform="translate(${x} ${y})">
        <rect x="-17" y="-10" width="34" height="20" rx="6" fill="#1f1f1f"></rect>
        <rect x="-14" y="-8" width="28" height="16" rx="5" fill="${color}"></rect>
        <rect x="-7" y="-15" width="14" height="10" rx="4" fill="#1f1f1f"></rect>
        <rect x="-5" y="-13" width="10" height="6" rx="3" fill="#edf6ff"></rect>
        <circle cx="-10" cy="12" r="5" fill="#1f1f1f"></circle>
        <circle cx="10" cy="12" r="5" fill="#1f1f1f"></circle>
        <circle cx="-10" cy="12" r="2" fill="#ffffff"></circle>
        <circle cx="10" cy="12" r="2" fill="#ffffff"></circle>
      </g>
    `;
  }

  function renderStatus() {
    const player = currentPlayer();
    const rows = [
      `Turn: ${player ? player.name : "No race running"}`,
      `Mode: ${MODE_NAMES[state.config.mode]}`,
      `Track Family: ${TRACK_LAYOUTS[state.config.track].name}`,
      `Template: ${state.track.templateKey}`,
      `Hazards: S ${state.track.hazards.spinner}, K ${state.track.hazards.skipper}, N ${state.track.hazards.sinker}, T ${state.track.hazards.steps}`,
      state.forceThree ? "Steps is active. Only 3-space moves remain." : "Choose 1, 2, or 3 spaces before solving.",
      state.feedback,
    ];

    els.statusSummary.innerHTML = rows.map((line, index) => `
      <div class="info-card">${index === 0 ? `<strong>${escapeHtml(line)}</strong>` : escapeHtml(line)}</div>
    `).join("");
  }

  function renderRoster() {
    els.driverRoster.innerHTML = state.players.map((player, index) => `
      <div class="driver-row${index === state.activeIndex && state.phase !== "setup" ? " active" : ""}">
        <div class="driver-row-title">
          <span style="color:${player.color}">${player.name} [${player.initials}]</span>
          <span class="badge">${player.isAi ? "AI" : "Human"}</span>
        </div>
        <div class="driver-meta">Position ${player.position} | Score ${player.score} | Correct ${player.correctAnswers}</div>
        <div class="driver-meta">${player.brokenDown ? "Broken down" : player.shielded ? "Shielded" : "Rolling"} | ${player.timed ? "Timed" : "Untimed"}</div>
      </div>
    `).join("");
  }

  function renderPrompt() {
    els.moveControls.innerHTML = "";
    els.answerControls.innerHTML = "";
    els.promptBody.innerHTML = "";

    if (state.phase === "setup") {
      els.promptTitle.textContent = "Ready";
      els.promptBody.innerHTML = `
        <div class="info-card">Configure the race, then start the browser prototype.</div>
        <div class="info-card">The “Random Template” option now chooses among multiple authored track designs and re-randomizes the hazard markers each race.</div>
      `;
      return;
    }

    if (state.phase === "chooseMove") {
      els.promptTitle.textContent = "Choose Distance";
      els.promptBody.innerHTML = `
        <div class="info-card">Smaller moves mean easier questions and lower scoring. Larger moves mean tougher questions and higher scoring.</div>
      `;
      if (!currentPlayer().isAi) {
        MOVE_OPTIONS.forEach((move) => {
          const button = document.createElement("button");
          button.className = "primary-btn move-btn";
          button.textContent = `${move} Space${move === 1 ? "" : "s"}`;
          button.disabled = state.forceThree && move !== 3;
          button.addEventListener("click", () => askQuestion(move));
          els.moveControls.append(button);
        });
      } else {
        els.promptBody.innerHTML += `<div class="info-card muted">AI is choosing a move...</div>`;
      }
      return;
    }

    if (state.phase === "answering") {
      els.promptTitle.textContent = "Solve";
      els.promptBody.innerHTML = `
        <div class="info-card">
          <strong>${escapeHtml(state.currentQuestion.prompt)}</strong>
          <div class="muted">Difficulty ${state.currentQuestion.difficulty + 1} | Move ${state.currentQuestion.move}</div>
        </div>
      `;
      if (!currentPlayer().isAi) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Enter answer";
        input.inputMode = "numeric";
        const button = document.createElement("button");
        button.className = "primary-btn";
        button.textContent = "Submit";
        const submit = () => submitAnswer(input.value.trim());
        button.addEventListener("click", submit);
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") submit();
        });
        els.answerControls.append(input, button);
        input.focus();
      } else {
        els.answerControls.innerHTML = `<div class="muted">AI is solving...</div>`;
      }
      return;
    }

    if (state.phase === "gameOver") {
      els.promptTitle.textContent = "Results";
      const results = state.placements.map((player, index) => `<li>${index + 1}. ${player.initials} ${player.name} - ${player.score} pts</li>`).join("");
      els.promptBody.innerHTML = `
        <div class="info-card"><strong>${escapeHtml(state.feedback)}</strong></div>
        <div class="score-list">
          <h3>Final Standings</h3>
          <ol>${results}</ol>
        </div>
      `;
    }
  }

  function renderRecords() {
    const topScores = state.highScores.length
      ? `<ol>${state.highScores.slice(0, 8).map((record) => `<li>${record.initials} - ${record.score} pts (${record.track})</li>`).join("")}</ol>`
      : `<p class="muted">No scores saved yet.</p>`;
    const winners = Object.entries(state.winners).sort((a, b) => b[1] - a[1]).slice(0, 6);
    const winsMarkup = winners.length
      ? `<ul>${winners.map(([initials, wins]) => `<li>${initials} - ${wins} win${wins === 1 ? "" : "s"}</li>`).join("")}</ul>`
      : `<p class="muted">No winners recorded yet.</p>`;

    els.recordsBody.innerHTML = `
      <div class="score-list">
        <h3>High Scores</h3>
        ${topScores}
      </div>
      <div class="score-list">
        <h3>Winner Tracking</h3>
        ${winsMarkup}
      </div>
      <div class="info-card muted">
        Records are persistent through the storage adapter now. For Pi hosting, replace the adapter with HTTP or WebSocket-backed server persistence instead of localStorage.
      </div>
    `;
  }

  function render() {
    applyTheme();
    renderBoard();
    renderStatus();
    renderRoster();
    renderPrompt();
    renderRecords();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  window.addEventListener("error", (event) => {
    showError(`${event.message}`);
  });

  window.addEventListener("unhandledrejection", (event) => {
    showError(String(event.reason || "Unhandled promise rejection"));
  });

  function showError(message) {
    els.promptTitle.textContent = "Error";
    els.promptBody.innerHTML = `<div class="error-banner">${escapeHtml(message)}</div>`;
  }

  initControls();
  rebuildDriverConfig();
  applyTheme();
  render();
}());
