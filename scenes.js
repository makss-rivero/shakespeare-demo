/* The 35 verse lines in content.md, in their original order.
 * All visible artwork is SVG; all choreography lives in styles.css.
 * The quotations are used only for screen-reader descriptions.
 */
(() => {
  const use = (id, x, y, scale = 1, cls = '') =>
    `<g transform="translate(${x} ${y}) scale(${scale})"><use href="#${id}" class="${cls}"/></g>`;
  const move = (name, art, extra = '') => `<g class="motion ${name}" ${extra}>${art}</g>`;
  const line = (d, cls = 'ink-line') => `<path d="${d}" class="${cls}"/>`;
  const circle = (x, y, r, cls = 'fine-line') => `<circle cx="${x}" cy="${y}" r="${r}" class="${cls}"/>`;
  const person = (x = 450, y = 395, s = 1.2) => use('person', x, y, s);
  const portal = (x = 620, y = 309, s = 1) => use('portal', x, y, s);
  const bed = () => use('bed', 450, 368, 1.15);
  const wave = (y, cls = '') => `<path class="wave ${cls}" d="M180 ${y} Q210 ${y-38} 240 ${y} T360 ${y} T480 ${y} T600 ${y} T720 ${y}"/>`;
  const stars = (cls = 'gold') => [[340,180,0.5],[528,146,0.8],[566,238,0.45],[381,265,0.4]].map(([x,y,s],i) => move(`twinkle twinkle-${i}`, use('star',x,y,s,cls))).join('');
  const clock = (x,y,s=1) => use('clock',x,y,s) + `<g transform="translate(${x} ${y}) scale(${s})">${move('clock-hand',line('M0 0 V-24 M0 0 L17 9'))}</g>`;
  const thorns = (x,y) => `<g transform="translate(${x} ${y})">${line('M-32 0 L-17-11 L-22-30 L0-20 L18-35 L19-13 L38-4 L20 8 L25 28 L2 19 L-17 32 L-17 11Z','red-line')}</g>`;
  const burden = (x=438,y=292) => use('stone',x,y,0.9,'red');
  const bent = () => `<g transform="translate(450 391) rotate(27)">${use('person',0,0,1.15)}</g>`;
  const fork = () => line('M450 399 Q450 333 304 250 M450 399 Q450 333 596 250','faint-line');

  window.HAMLET_SCENES = [
    {
      line: 'To be, or not to be: that is the question:',
      description: 'A living figure hesitates between a golden sun and a dark skull. A balance tips between them.',
      art: circle(450,253,149,'orbit') + move('life-orb',use('sun',286,231,1.1,'gold')) + move('death-orb',use('skull',614,231,1.05)) + move('hesitate',person()) + move('balance',line('M300 305 Q450 340 600 305','fine-line')) + circle(450,322,4,'gold-fill'),
    },
    {
      line: 'Whether ’tis nobler in the mind to suffer',
      description: 'A figure stays upright beneath a golden crown while a red storm gathers inside the circle around its head.',
      art: move('endure',person()) + circle(450,265,71,'orbit') + move('noble',use('crown',450,153,0.52,'gold')) + move('mind-storm',line('M414 263 L432 247 L440 275 L457 250 L467 276 L485 261','red-line')) + [0,1,2,3,4].map(i=>move(`rain rain-${i}`,line(`M${342+i*55} 175 l-12 36`,'faint-line'))).join(''),
    },
    {
      line: 'The slings and arrows of outrageous fortune,',
      description: 'A wheel of fortune turns overhead. Arrows strike toward the figure from both sides.',
      art: `<g transform="translate(450 178)">${move('fortune-wheel',circle(0,0,42,'fine-line') + line('M-42 0 H42 M0-42 V42 M-30-30 L30 30 M-30 30 L30-30','fine-line') + circle(0,0,6,'red-fill'))}</g>` + move('flinch',person()) + [0,1,2].map(i=>move(`arrow-left arrow-${i}`,use('arrow',240,272+i*36,0.9,'red'))).join('') + move('arrow-right',`<g transform="translate(666 315) rotate(180)">${use('arrow',0,0,1,'red')}</g>`),
    },
    {
      line: 'Or to take arms against a sea of troubles,',
      description: 'The figure raises a sword and advances against three rising waves.',
      art: move('advance',person(332,393)+move('raise-sword',use('sword',365,327,0.85,'gold'))) + move('sea-one',wave(324)) + move('sea-two',wave(355)) + move('sea-three',wave(383)),
    },
    {
      line: 'And by opposing end them? To die: to sleep;',
      description: 'The waves settle into a straight line. A skull turns into a crescent moon above a sleeping body.',
      art: move('settle-sea',wave(360)+wave(386)) + move('sleep-appear',bed()) + move('death-to-sleep',use('skull',450,210,0.95)) + move('moon-appear',use('moon',450,209,0.95,'gold')),
    },
    {
      line: 'No more; and by a sleep to say we end',
      description: 'The sleeper becomes still. A jagged red pulse quiets into a level line.',
      art: move('breathe',bed()) + use('moon',450,185,0.7,'gold') + move('pulse-quiet',line('M272 273 H363 L380 250 L395 299 L415 231 L438 289 L454 273 H628','red-line')) + move('rest-line',line('M272 273 H628','fine-line')),
    },
    {
      line: 'The heart-ache and the thousand natural shocks',
      description: 'A red heart breaks down its middle as sharp shocks radiate toward it.',
      art: move('heart-shock',use('heart',450,270,1.8,'red')) + move('heart-crack',line('M451 217 L436 248 L461 269 L442 295 L451 322','paper-line')) + [0,1,2,3,4,5,6,7].map(i=>`<g transform="translate(450 270) rotate(${i*45})">${move(`shock shock-${i}`,line('M0-91 L-7-111 L6-129 L0-148','fine-line'))}</g>`).join(''),
    },
    {
      line: 'That flesh is heir to, ’tis a consummation',
      description: 'Three generations inherit the same red wound. A circle closes around the last, fragile body.',
      art: person(302,392,0.85) + person(450,392,1.2) + person(595,392,0.7) + line('M302 316 Q373 272 450 286 Q535 302 595 329','faint-line') + move('inherit-wound',use('heart',302,343,0.24,'red')) + move('close-circle',circle(595,349,67,'gold-line')),
    },
    {
      line: 'Devoutly to be wish’d. To die, to sleep;',
      description: 'Two upturned hands reach for peaceful sleep. A skull fades into a warm moon above the bed.',
      art: bed() + move('wish',line('M325 301 Q350 247 390 270 M575 301 Q550 247 510 270','fine-line')) + move('death-to-sleep',use('skull',450,200,0.8)) + move('moon-appear',use('moon',450,200,0.85,'gold')) + move('wish-stars',stars()),
    },
    {
      line: 'To sleep: perchance to dream: ay, there’s the rub;',
      description: 'A golden dream rises from the sleeper, then catches on a sharp red thorn.',
      art: bed() + circle(396,290,4,'faint-line') + circle(418,254,8,'faint-line') + move('dream-rise',circle(452,207,33,'gold-fill')) + move('dream-snag',thorns(483,188)) + move('dream-jolt',line('M512 145 l13-12 M525 177 h20 M513 206 l14 11','red-line')),
    },
    {
      line: 'For in that sleep of death what dreams may come',
      description: 'Above a skull, dream bubbles grow into watching eyes and a jagged, unknown darkness.',
      art: use('skull',450,352,0.8) + move('nightmare-grow',circle(413,285,7,'fine-line')+circle(445,251,12,'fine-line')+circle(450,170,65,'orbit')+use('eye',435,161,0.49)+thorns(483,200)) + move('nightmare-drift',use('moon',507,137,0.45,'red')),
    },
    {
      line: 'When we have shuffled off this mortal coil,',
      description: 'A golden light leaves the body. The spiral binding the body uncoils and falls away.',
      art: move('shed-body',person()) + move('uncoil',line('M404 370 C521 398 523 328 430 341 C371 350 386 285 465 302 C526 315 511 252 423 271','fine-line')) + move('spirit-rise',circle(450,304,13,'gold-fill')),
    },
    {
      line: 'Must give us pause: there’s the respect',
      description: 'The figure approaches a dark doorway, then freezes at its edge. Two upright strokes interrupt the path.',
      art: portal(620,309,0.85) + move('approach-stop',person(328,395)) + move('pause-mark',line('M471 238 V279 M489 238 V279','gold-line')) + move('stopped-path',line('M370 396 H548','faint-line')),
    },
    {
      line: 'That makes calamity of so long life;',
      description: 'A burdened figure is tethered to a long chain of hourglasses that keeps circling back.',
      art: move('weary',bent()) + `<g transform="translate(450 262)">${move('long-cycle',circle(0,0,126,'orbit')+use('hourglass',0,-126,0.55,'red')+use('hourglass',126,0,0.55,'red')+use('hourglass',-126,0,0.55,'red'))}</g>` + line('M443 321 Q339 372 324 269','fine-line'),
    },
    {
      line: 'For who would bear the whips and scorns of time,',
      description: 'Clock hands race while a lash swings past the figure and mocking masks close in.',
      art: move('flinch',person()) + clock(450,173,1.08) + move('whip',line('M276 225 C399 193 322 312 413 333','red-line')) + move('mock-left',use('mask',281,293,0.62)) + move('mock-right',use('mask',619,293,0.62)),
    },
    {
      line: 'The oppressor’s wrong, the proud man’s contumely,',
      description: 'An enormous crown presses a small person down. A taller figure on a pedestal turns its back.',
      art: move('oppressed',person(367,395,0.92)) + move('oppressor-crown',use('crown',367,231,1.6,'gold')) + line('M526 395 V340 H634 V395','fine-line') + move('proud-turn',person(580,340,1.3)) + use('crown',580,182,0.45,'gold'),
    },
    {
      line: 'The pangs of despised love, the law’s delay,',
      description: 'An offered heart falls as its recipient turns away. Beside it, justice hangs motionless under a turning hourglass.',
      art: person(274,395,0.88) + move('reject-love',person(386,395,0.88)) + move('heart-fall',use('heart',329,295,0.55,'red')) + use('scales',593,325,0.84) + move('law-delay',use('hourglass',593,193,0.67)),
    },
    {
      line: 'The insolence of office and the spurns',
      description: 'A high seat of power towers over a petitioner. A rigid arm dismisses the smaller figure.',
      art: line('M480 392 V229 H615 V392 M497 246 H598 M469 331 H625','fine-line') + person(548,373,1.16) + use('crown',548,226,0.44,'gold') + move('dismiss-arm',line('M523 307 H469','ink-line')) + move('spurned',person(365,395,0.88)) + move('spurn-lines',line('M428 311 L410 301 M426 327 H404 M428 343 L410 353','red-line')),
    },
    {
      line: 'That patient merit of the unworthy takes,',
      description: 'A patient figure offers a golden laurel. It is taken by a crowned figure who leaves the giver empty-handed.',
      art: person(330,395) + person(586,395) + use('crown',586,250,0.47) + move('stolen-merit',use('laurel',384,309,0.8,'gold')) + line('M346 334 L385 321','fine-line') + move('empty-hands',line('M346 341 L379 341','red-line')),
    },
    {
      line: 'When he himself might his quietus make',
      description: 'A figure contemplates ending its own tangled thread. The knot becomes still; a small blade appears at a distance.',
      art: person(397,395) + move('tangled-life',line('M414 334 C464 228 570 368 481 360 C407 351 527 236 556 309 C576 363 507 374 504 319','red-line')) + move('blade-thought',use('sword',602,320,0.45)) + move('quietus-ring',circle(511,323,67,'orbit')),
    },
    {
      line: 'With a bare bodkin? who would fardels bear,',
      description: 'A solitary dagger hangs in empty space. Beside it, a figure bends under a heavy red burden.',
      art: move('bodkin',use('sword',308,324,0.86)) + move('burden-appear',`<g transform="translate(75 0)">${bent()+burden()}</g>`) + move('burden-rope',line('M487 305 Q553 331 542 369','fine-line')),
    },
    {
      line: 'To grunt and sweat under a weary life,',
      description: 'The loaded figure trudges forward, bowing with every step, while drops of sweat fall.',
      art: move('trudge',bent()+burden()+line('M420 279 Q492 326 466 368','fine-line')) + [0,1,2].map(i=>move(`sweat sweat-${i}`,`<path d="M${501+i*11} ${319+i*8} q-9 14 0 14 q9 0 0-14Z" class="gold-fill"/>`)).join('') + move('moving-ground',line('M286 397 H324 M365 397 H403 M444 397 H482 M523 397 H561 M602 397 H640','faint-line')),
    },
    {
      line: 'But that the dread of something after death,',
      description: 'The burdened figure recoils from a dark doorway. A skull and an enormous eye emerge beyond the threshold.',
      art: portal(617,309) + move('dread-recoil',`<g transform="translate(-85 0)">${bent()+burden()}</g>`) + move('beyond-death',use('skull',617,324,0.56,'paper')+use('eye',617,232,0.67,'paper')) + move('fear-ray',line('M473 263 L451 249 M473 288 H446 M474 311 L453 327','red-line')),
    },
    {
      line: 'The undiscover’d country from whose bourn',
      description: 'A doorway opens onto an unfamiliar landscape. Its dark hills drift beyond a boundary that cannot be seen through.',
      art: portal(450,304,1.32) + move('unknown-land',line('M366 357 L406 293 L448 324 L493 266 L534 351','paper-line')+circle(478,211,11,'gold-fill')) + move('border-mist',line('M353 389 Q398 372 450 389 T549 389','red-line')) + stars('ink'),
    },
    {
      line: 'No traveller returns, puzzles the will',
      description: 'A traveller crosses the dark threshold and disappears. Footprints enter but none return; the waiting figure hesitates.',
      art: portal(584,308) + move('traveller',person(414,394,0.77)) + move('waiting',person(288,395)) + move('footprints',line('M383 397 H396 M412 397 H425 M441 397 H454 M470 397 H483 M499 397 H512','red-line')) + move('puzzle',circle(288,226,26,'orbit')+line('M275 226 H287 M298 226 H301','fine-line')),
    },
    {
      line: 'And makes us rather bear those ills we have',
      description: 'Turning away from the dark doorway, the figure returns to its familiar red burden and picks it up.',
      art: `<g opacity=".25">${portal(624,309,0.83)}</g>` + move('return-to-pain',person(481,395)) + move('take-burden',use('stone',366,369,0.62,'red')) + move('accept-pain',line('M381 328 Q352 335 349 356','fine-line')),
    },
    {
      line: 'Than fly to others that we know not of?',
      description: 'At a fork, familiar pain lies to the left and unknown threats to the right. A tentative flight toward the unknown turns back.',
      art: fork() + use('stone',304,232,0.6,'red') + move('unseen-ills',thorns(594,230)+use('eye',607,174,0.4)) + move('failed-flight',person(450,395,0.92)) + move('flight-arc',line('M451 312 Q480 191 538 221','gold-line')),
    },
    {
      line: 'Thus conscience does make cowards of us all;',
      description: 'A huge watching eye opens. Under its gaze, three upright figures shrink and their golden courage fades.',
      art: move('conscience-eye',use('eye',450,183,1.35)) + [310,450,590].map((x,i)=>move(`cower cower-${i}`,person(x,395,1.02))+move('courage-fades',circle(x,255,8,'gold-fill'))).join('') + line('M383 219 L310 276 M450 225 V272 M517 219 L590 276','faint-line'),
    },
    {
      line: 'And thus the native hue of resolution',
      description: 'A vivid golden sun expands behind a raised sword. A figure stands tall with purpose.',
      art: move('resolve-sun',circle(450,258,96,'gold-fill')) + move('resolve-person',person(450,395,1.3)) + move('resolve-sword',use('sword',500,315,1.05)) + move('resolve-rays',line('M450 126 V112 M341 173 L330 162 M559 173 L570 162 M314 258 H298 M586 258 H602','gold-line')),
    },
    {
      line: 'Is sicklied o’er with the pale cast of thought,',
      description: 'A pale cloud spreads over the golden resolve. Its color drains away and the raised sword droops.',
      art: move('resolve-drain',circle(450,258,96,'gold-fill')) + person(450,395,1.3) + move('sword-droop',use('sword',500,315,1.05)) + move('thought-cloud',use('cloud',450,227,1.48,'mist')) + move('thought-rain',line('M408 277 l-9 25 M451 289 l-9 25 M494 277 l-9 25','faint-line')),
    },
    {
      line: 'And enterprises of great pith and moment',
      description: 'A ship with full golden sails begins a purposeful voyage toward a distant sun.',
      art: use('sun',670,177,0.69,'gold') + move('voyage-course',line('M260 368 Q430 348 633 210','faint-line')) + move('set-sail',use('boat',350,325,1.15)) + move('gentle-sea',wave(380)) + move('voyage-star',use('star',517,206,0.65,'gold')),
    },
    {
      line: 'With this regard their currents turn awry,',
      description: 'The ship is pulled away from its destination by a current that twists into a whirlpool.',
      art: use('sun',670,177,0.69,'gold') + line('M260 368 Q430 348 633 210','faint-line') + move('wrong-current',line('M260 375 C356 355 575 353 588 293 C602 230 477 224 468 287 C460 343 558 340 558 294 C559 259 499 263 503 294','red-line')) + move('ship-awry',use('boat',416,325,0.95)),
    },
    {
      line: 'And lose the name of action.—Soft you now!',
      description: 'Forward movement dwindles and stops short. The figure turns as a gentle golden light arrives from the side.',
      art: move('action-stops',line('M262 338 H543','gold-line')+use('arrow',526,338,0.55,'gold')) + move('turn-to-ophelia',person(424,395)) + move('soft-arrival',use('flower',646,298,0.62,'gold')) + move('soft-rings',circle(646,281,59,'orbit')),
    },
    {
      line: 'The fair Ophelia! Nymph, in thy orisons',
      description: 'Ophelia appears with joined hands and a flower. Hamlet bows toward her as a gentle halo forms around her prayer.',
      art: move('hamlet-bows',person(340,395)) + move('ophelia-enters',use('ophelia',565,395,1.2)) + move('prayer-halo',circle(565,266,63,'gold-line')) + move('prayer-flower',use('flower',497,303,0.47,'gold')) + move('prayer-rises',use('star',565,163,0.6,'gold')),
    },
    {
      line: 'Be all my sins remember’d.',
      description: 'Hamlet bows. His red burdens rise into Ophelia’s circle of prayer, held around a flower as the motion settles into remembrance.',
      art: move('last-bow',person(322,395)) + use('ophelia',590,395,1.2) + move('remembrance-circle',circle(463,248,83,'gold-line')) + move('last-flower',use('flower',463,247,0.72,'gold')) + [[347,338,397,219],[359,358,493,176],[344,318,531,275]].map(([x,y,tx,ty],i)=>move(`remember-sin sin-${i}`,circle(x,y,5,'red-fill'),`style="--sin-x:${tx-x}px;--sin-y:${ty-y}px"`)).join('') + move('final-star',use('star',463,121,0.5,'gold')),
    },
  ];
})();
