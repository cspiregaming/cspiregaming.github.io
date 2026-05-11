/* C Spire Gaming — playful effects layer.
   - Drift sprites in the hero (Tetris tetrominoes in brand colors + FA gaming icons)
   - Konami code easter egg: achievement toast + Tetris piece rain
   No frameworks; runs vanilla on DOMContentLoaded. */

(function () {
  'use strict';

  // ── Sprite palette — everything renders in Kinetic Orange ─────────
  var ORANGE = '#FF6720';

  // Tetrominoes encoded as cell coordinates
  var TETROMINOES = {
    i: { cells: [[0,1],[1,1],[2,1],[3,1]], w: 4 },
    o: { cells: [[0,0],[1,0],[0,1],[1,1]], w: 2 },
    t: { cells: [[0,1],[1,1],[2,1],[1,0]], w: 3 },
    l: { cells: [[0,1],[1,1],[2,1],[2,0]], w: 3 },
    j: { cells: [[0,1],[1,1],[2,1],[0,0]], w: 3 },
    s: { cells: [[1,0],[2,0],[0,1],[1,1]], w: 3 },
    z: { cells: [[0,0],[1,0],[1,1],[2,1]], w: 3 }
  };

  // Pixel-art sprites — Space Invaders + iconic game silhouettes.
  // All rendered in Kinetic Orange. ASCII grids: 'X' = filled, '.' = empty.
  var PIXEL_ART = {
    // ─── Space Invaders ───
    squid: [
      '...XX...',
      '..XXXX..',
      '.XXXXXX.',
      'XX.XX.XX',
      'XXXXXXXX',
      '..X..X..',
      '.X.XX.X.',
      'X.X..X.X'
    ],
    crab: [
      '.X.....X.',
      '..X...X..',
      '.XXXXXXX.',
      'XX.XXX.XX',
      'XXXXXXXXX',
      'X.XXXXX.X',
      'X.X...X.X',
      '...XXX...'
    ],
    octopus: [
      '..XXXXXX..',
      'XXXXXXXXXX',
      'XXXXXXXXXX',
      'XXX....XXX',
      'XXXXXXXXXX',
      '...XXXX...',
      '..XX..XX..',
      'XX......XX'
    ],
    ufo: [
      '....XXXXXX.....',
      '..XXXXXXXXXX...',
      '.XXXXXXXXXXXX..',
      'XX.XX.XX.XX.XX.',
      'XXXXXXXXXXXXXXX',
      '..XXX..XXX.....'
    ],

    // ─── 80s arcade ───
    pacman: [
      '.XXXXX..',
      'XXXXXXX.',
      'XX.XXX..',
      'XXXXX...',
      'XXXX....',
      'XXXXX...',
      'XXXXXXX.',
      '.XXXXX..'
    ],
    ghost: [
      '.XXXXX..',
      'XXXXXXX.',
      'XX.XX.X.',
      'XX.XX.X.',
      'XXXXXXX.',
      'XXXXXXX.',
      'XXXXXXX.',
      'X.X.X.X.'
    ],
    galaga: [
      '....X....',
      '...XXX...',
      '...XXX...',
      '..XXXXX..',
      '.XX.X.XX.',
      'XXXXXXXXX',
      'X.XXXXX.X',
      'X.X...X.X'
    ],
    asteroids: [
      '....X....',
      '...XXX...',
      '...XXX...',
      '..XXXXX..',
      '..XXXXX..',
      '.XXXXXXX.',
      'XXX...XXX',
      'X.X...X.X'
    ],
    frogger: [
      '.X....X.',
      '.X....X.',
      '.XXXXXX.',
      'XXXXXXXX',
      'XXXXXXXX',
      '.X.XX.X.',
      'XXX..XXX',
      '.X....X.'
    ],

    // ─── Nintendo classics ───
    mushroom: [
      '..XXXXXX..',
      '.XXXXXXXX.',
      'XXXXXXXXXX',
      'X..XXXX..X',
      'XX.XXXX.XX',
      'XX.XXXX.XX',
      '.XXXXXXXX.',
      '.XXXXXXXX.',
      '.XX.XX.XX.'
    ],
    triforce: [
      '......X......',
      '.....XXX.....',
      '....XXXXX....',
      '...XXXXXXX...',
      '...X.....X...',
      '..XXX...XXX..',
      '.XXXXX.XXXXX.',
      'XXXXXXXXXXXXX'
    ],
    pokeball: [
      '..XXXX..',
      '.X....X.',
      'X..XX..X',
      'X.XXXX.X',
      'XXXXXXXX',
      'X......X',
      '.X....X.',
      '..XXXX..'
    ],
    masterSword: [
      '..X..',
      '..X..',
      '..X..',
      '..X..',
      '..X..',
      'XXXXX',
      '.X.X.',
      '.XXX.',
      '.XXX.',
      '..X..'
    ],

    // ─── Modern hits ───
    rlBall: [
      '..XXXX..',
      '.XXXXXX.',
      'XXX..XXX',
      'XX....XX',
      'XX....XX',
      'XXX..XXX',
      '.XXXXXX.',
      '..XXXX..'
    ],
    amongUs: [
      '.XXXXXX.',
      'XXXXXXXX',
      'XXX..XXX',
      'XXX..XXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXXXXXXX',
      'XXX..XXX',
      'XX....XX'
    ],
    creeper: [
      'XX..XX',
      'XX..XX',
      '..XX..',
      '..XX..',
      '.XXXX.',
      '.X..X.',
      'XX..XX'
    ],
    llama: [
      '.....XX',
      '.....XX',
      '....XXX',
      '.XXXXXX',
      'XXXXXXX',
      'XXXXXXX',
      'XXXXXXX',
      '.X.X.X.',
      '.X.X.X.'
    ],

    // ─── MMO / RPG / Indie ───
    scimitar: [
      '.....X..',
      '....XX..',
      '...XX...',
      '..XX....',
      '..XX....',
      '.XXX....',
      'XXXX....',
      '.XX.....',
      '..X.....',
      '..X.....'
    ],
    greatsword: [
      '..X..',
      '.XXX.',
      '.XXX.',
      '.XXX.',
      '.XXX.',
      '.XXX.',
      '.XXX.',
      '.XXX.',
      'XXXXX',
      '..X..',
      '..X..',
      '..X..'
    ],
    plumbob: [
      '..X..',
      '.XXX.',
      'XXXXX',
      'XXXXX',
      '.XXX.',
      '..X..'
    ],
    hollowKnight: [
      '..XX..',
      '.XXXX.',
      'XXXXXX',
      'XX..XX',
      'XXXXXX',
      '.XXXX.',
      '.X.XX.',
      '.X..X.'
    ],
    strawberry: [
      '..X.X.',
      '.XXXXX',
      'XXXXXX',
      'XXXXXX',
      'XXXXXX',
      '.XXXX.',
      '..XX..'
    ],

    // ─── Scene-only sprites ───
    mario: [
      '.XXXX.',
      'XXXXXX',
      'XXXXXX',
      '.XXXX.',
      'XXXXXX',
      'X.XX.X',
      '.XXXX.',
      '.X..X.',
      'XX..XX'
    ],
    pipe: [
      'XXXXXXXX',
      'XXXXXXXX',
      '.XXXXXX.',
      '.XXXXXX.',
      '.XXXXXX.',
      '.XXXXXX.'
    ],
    fallGuy: [
      '.XXXX.',
      'XXXXXX',
      'X.XX.X',
      'XXXXXX',
      'XXXXXX',
      'XXXXXX',
      'XXXXXX',
      'XXXXXX',
      'XX..XX'
    ]
  };

  function tetrominoSVG(type, cellSize) {
    var t = TETROMINOES[type];
    var size = cellSize || 9;
    var width = t.w * size;
    var height = 2 * size;
    var rects = '';
    t.cells.forEach(function (c) {
      rects += '<rect x="' + (c[0] * size) + '" y="' + (c[1] * size) +
               '" width="' + size + '" height="' + size +
               '" fill="' + ORANGE +
               '" stroke="rgba(0,0,0,0.18)" stroke-width="0.6"/>';
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + width + ' ' + height +
           '" width="' + width + '" height="' + height + '" aria-hidden="true">' + rects + '</svg>';
  }

  // Render any ASCII pixel grid as an orange SVG sprite
  function pixelArtSVG(grid, cellSize) {
    var size = cellSize || 3;
    var w = grid[0].length * size;
    var h = grid.length * size;
    var rects = '';
    grid.forEach(function (row, y) {
      for (var x = 0; x < row.length; x++) {
        if (row.charAt(x) === 'X') {
          rects += '<rect x="' + (x * size) + '" y="' + (y * size) +
                   '" width="' + size + '" height="' + size + '" fill="' + ORANGE + '"/>';
        }
      }
    });
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h +
           '" width="' + w + '" height="' + h + '" aria-hidden="true">' + rects + '</svg>';
  }

  // ── Hero scene stage + sprite helpers ────────────────────────────
  // Scenes don't auto-play; they're triggered one-at-a-time by the
  // Konami code (see initKonami). State is kept in the closure below.
  var sceneStage = null;
  var sceneIndex = 0;
  var sceneFiring = false;
  var SCENE_LIST = null;

  function initHeroScenes() {
    var hero = document.querySelector('.section-header');
    if (!hero) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    sceneStage = document.createElement('div');
    sceneStage.className = 'hero-stage';
    sceneStage.setAttribute('aria-hidden', 'true');
    hero.appendChild(sceneStage);

    SCENE_LIST = [
      { name: 'Pac-Man Chase',         fn: scenePacmanChase },
      { name: 'Mario Steals Triforce', fn: sceneMarioStealsTriforce },
      { name: 'Among Us × Fall Guy',   fn: sceneAmongUsFallGuys },
      { name: 'Tetris Drop',           fn: sceneTetrisStack },
      { name: 'Invader March',         fn: sceneInvaderMarch }
    ];
  }

  function playNextScene() {
    if (!sceneStage || !SCENE_LIST || sceneFiring) return;
    var scene = SCENE_LIST[sceneIndex];
    sceneFiring = true;
    showAchievement(scene.name, 'Scene ' + (sceneIndex + 1) + ' of ' + SCENE_LIST.length + ' — code unlocked');
    scene.fn(sceneStage, function () {
      sceneFiring = false;
      sceneIndex = (sceneIndex + 1) % SCENE_LIST.length;
    });
  }

  function makeSceneSprite(stage, kind, type, initial) {
    var el = document.createElement('span');
    el.className = 'hero-scene-sprite';
    if (kind === 'tetro') {
      el.innerHTML = tetrominoSVG(type);
      el.classList.add('hero-scene-sprite--tetro');
    } else if (kind === 'pixel') {
      el.innerHTML = pixelArtSVG(PIXEL_ART[type]);
      el.classList.add('hero-scene-sprite--pixel');
      el.classList.add('hero-scene-sprite--' + type);
    } else if (kind === 'fa') {
      el.innerHTML = '<i class="fas ' + type + '"></i>';
      el.classList.add('hero-scene-sprite--icon');
    }
    if (initial) {
      Object.keys(initial).forEach(function (k) { el.style[k] = initial[k]; });
    }
    stage.appendChild(el);
    return el;
  }

  function cleanup(els, done, after) {
    setTimeout(function () {
      els.forEach(function (e) { if (e && e.parentNode) e.remove(); });
      done();
    }, after);
  }

  // ── Scene 1: Pac-Man chases Ghost ────────────────────────────────
  function scenePacmanChase(stage, done) {
    var ghost = makeSceneSprite(stage, 'pixel', 'ghost', { top: '70%', left: '-10vw' });
    var pac = makeSceneSprite(stage, 'pixel', 'pacman', { top: '72%', left: '-22vw' });
    ghost.animate(
      [{ left: '-10vw' }, { left: '110vw' }],
      { duration: 5500, easing: 'linear', fill: 'forwards' }
    );
    pac.animate(
      [{ left: '-22vw' }, { left: '105vw' }],
      { duration: 5500, easing: 'linear', fill: 'forwards' }
    );
    cleanup([ghost, pac], done, 6000);
  }

  // ── Scene 2: Mario steals the Triforce via warp pipe ─────────────
  // Beats:
  //   0.0s  Triforce drops in centre-left (~30vw)
  //   1.5s  Triforce settled, hovering
  //   3.0s  Mario arrives at the Triforce from the left
  //   3.0s  Pipe starts rising on the right (~74vw)
  //   3.5s  Pipe fully risen
  //   3.5s  Mario picks up the Triforce; both head right toward the pipe
  //   7.0s  Mario reaches the pipe (Triforce trailing just behind)
  //   7.5s  Mario starts descending into the pipe
  //   8.5s  Triforce follows Mario down into the pipe
  //   10s   Pipe sinks back below the bottom edge
  function sceneMarioStealsTriforce(stage, done) {
    var DURATION = 11000;

    // Triforce — drops in, hovers, then trails Mario into the pipe
    var tri = makeSceneSprite(stage, 'pixel', 'triforce', { top: '-15%', left: '30vw' });
    tri.animate(
      [
        { top: '-15%', left: '30vw', opacity: 0, offset: 0 },
        { top: '62%',  left: '30vw', opacity: 1, offset: 0.14 },  // dropped in by 1.5s
        { top: '62%',  left: '30vw', opacity: 1, offset: 0.32 },  // hover until 3.5s
        { top: '62%',  left: '72vw', opacity: 1, offset: 0.64 },  // arrives near pipe at 7s
        { top: '62%',  left: '72vw', opacity: 1, offset: 0.77 },  // trailing pause at 8.5s
        { top: '120%', left: '72vw', opacity: 1, offset: 0.94 },  // descends after Mario by 10.3s
        { top: '120%', left: '72vw', opacity: 0, offset: 1 }
      ],
      { duration: DURATION, easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)', fill: 'forwards' }
    );

    // Mario — walks in from the left, picks up the Triforce, walks to the pipe, descends
    var mario = makeSceneSprite(stage, 'pixel', 'mario', { top: '78%', left: '-12vw' });
    mario.animate(
      [
        { top: '78%',  left: '-12vw', offset: 0 },
        { top: '78%',  left: '26vw',  offset: 0.27 },             // arrives at Triforce at 3s
        { top: '78%',  left: '26vw',  offset: 0.32 },             // pickup pause
        { top: '78%',  left: '76vw',  offset: 0.63 },             // walks to pipe by 7s
        { top: '78%',  left: '76vw',  offset: 0.68 },             // brief stop on top of pipe
        { top: '120%', left: '76vw',  opacity: 1, offset: 0.85 }, // descends into pipe by 9.5s
        { top: '120%', left: '76vw',  opacity: 0, offset: 1 }
      ],
      { duration: DURATION, easing: 'cubic-bezier(0.5, 0, 0.5, 1)', fill: 'forwards' }
    );

    // Pipe — hidden until Mario picks up Triforce, then rises on the right, holds, sinks
    var pipe = makeSceneSprite(stage, 'pixel', 'pipe', { bottom: '-25%', left: '74vw' });
    pipe.animate(
      [
        { bottom: '-25%', offset: 0 },
        { bottom: '-25%', offset: 0.27 },                          // hidden until 3s
        { bottom: '0%',   offset: 0.40 },                          // risen by 4.4s
        { bottom: '0%',   offset: 0.92 },                          // hold until 10s
        { bottom: '-25%', offset: 1 }                              // sunk by 11s
      ],
      { duration: DURATION, easing: 'cubic-bezier(0.16, 0.8, 0.3, 1)', fill: 'forwards' }
    );

    cleanup([tri, mario, pipe], done, DURATION + 500);
  }

  // ── Scene 3: Among Us + Fall Guy meet, run upward ────────────────
  // (They start below the wordmark, meet, then bolt up off the top.)
  function sceneAmongUsFallGuys(stage, done) {
    var au = makeSceneSprite(stage, 'pixel', 'amongUs', { top: '78%', left: '-10vw' });
    var fg = makeSceneSprite(stage, 'pixel', 'fallGuy', { top: '78%', left: '110vw' });
    au.animate(
      [
        { left: '-10vw', top: '78%', offset: 0 },
        { left: '40vw',  top: '78%', offset: 0.45 },
        { left: '40vw',  top: '78%', offset: 0.55 },   // greet
        { left: '40vw',  top: '-20%', opacity: 1, offset: 0.95 },
        { left: '40vw',  top: '-20%', opacity: 0 }
      ],
      { duration: 6500, easing: 'cubic-bezier(0.5, 0, 0.5, 1)', fill: 'forwards' }
    );
    fg.animate(
      [
        { left: '110vw', top: '78%', offset: 0 },
        { left: '52vw',  top: '78%', offset: 0.45 },
        { left: '52vw',  top: '78%', offset: 0.55 },
        { left: '52vw',  top: '-20%', opacity: 1, offset: 0.95 },
        { left: '52vw',  top: '-20%', opacity: 0 }
      ],
      { duration: 6500, easing: 'cubic-bezier(0.5, 0, 0.5, 1)', fill: 'forwards' }
    );
    cleanup([au, fg], done, 7000);
  }

  // ── Scene 4: Tetris pieces fall + stack, then clear ──────────────
  function sceneTetrisStack(stage, done) {
    var pieces = [];
    var seq = [
      { type: 'l', col: '38vw', land: '70%', delay: 0 },
      { type: 't', col: '46vw', land: '64%', delay: 1000 },
      { type: 'i', col: '54vw', land: '70%', delay: 2000 }
    ];
    seq.forEach(function (s) {
      var p = makeSceneSprite(stage, 'tetro', s.type, { top: '-15%', left: s.col });
      p.animate(
        [
          { top: '-15%', opacity: 1 },
          { top: s.land, opacity: 1, offset: 0.55 },
          { top: s.land, opacity: 1, offset: 0.92 },
          { top: s.land, opacity: 0 }
        ],
        { duration: 4500, delay: s.delay, easing: 'cubic-bezier(0.5, 0, 0.7, 0.6)', fill: 'forwards' }
      );
      pieces.push(p);
    });
    cleanup(pieces, done, 7500);
  }

  // ── Scene 5: Space Invaders march down in formation ──────────────
  // (Start at the very top, march down past the wordmark to the bottom.)
  function sceneInvaderMarch(stage, done) {
    var formation = ['squid', 'crab', 'octopus', 'crab', 'squid'];
    var invaders = [];
    formation.forEach(function (type, idx) {
      var startCol = 18 + idx * 13;
      var inv = makeSceneSprite(stage, 'pixel', type, { top: '4%', left: startCol + 'vw' });
      inv.animate(
        [
          { left: startCol + 'vw',         top: '4%',  offset: 0 },
          { left: (startCol + 8) + 'vw',   top: '4%',  offset: 0.22 },
          { left: (startCol + 8) + 'vw',   top: '78%', offset: 0.30 },
          { left: startCol + 'vw',         top: '78%', offset: 0.52 },
          { left: startCol + 'vw',         top: '92%', offset: 0.60 },
          { left: (startCol + 8) + 'vw',   top: '92%', offset: 0.82 },
          { left: (startCol + 8) + 'vw',   top: '120%', opacity: 1, offset: 1 }
        ],
        { duration: 6500, easing: 'steps(10, end)', fill: 'forwards' }
      );
      invaders.push(inv);
    });
    cleanup(invaders, done, 7000);
  }

  // ── Konami code easter egg — advances through hero scenes ───────
  function initKonami() {
    // Sequence stored already-lowercased so comparison is dead simple.
    var seq = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown',
               'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    var pos = 0;

    function handler(e) {
      // Skip auto-repeat (holding a key shouldn't advance the sequence)
      if (e.repeat) return;

      // Don't capture when typing in inputs
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) {
        return;
      }

      // Lowercase both sides — `e.key` for arrow keys is "ArrowUp" (multi-char),
      // for letters it's already "b"/"a" (or uppercase if Shift held).
      var key = (e.key || '').toLowerCase();
      if (!key) return;

      if (key === seq[pos]) {
        pos++;
        if (pos === seq.length) {
          playNextScene();
          pos = 0;
        }
      } else {
        // Allow restart if this key happens to be the first key of the sequence
        pos = (key === seq[0]) ? 1 : 0;
      }
    }

    // Capture phase so we get the event before any other handler can stop it.
    document.addEventListener('keydown', handler, true);
  }

  function showAchievement(title, sub) {
    var toast = document.createElement('div');
    toast.className = 'konami-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML =
      '<div class="konami-toast__icon" aria-hidden="true">⚡</div>' +
      '<div class="konami-toast__body">' +
        '<div class="konami-toast__eyebrow">CHEAT CODE ACTIVATED</div>' +
        '<div class="konami-toast__title">' + title + '</div>' +
        '<div class="konami-toast__sub">' + sub + '</div>' +
      '</div>';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.classList.add('konami-toast--out');
      setTimeout(function () { toast.remove(); }, 600);
    }, 3800);
  }

  // ── Boot ────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initHeroScenes();
      initKonami();
    });
  } else {
    initHeroScenes();
    initKonami();
  }
})();
