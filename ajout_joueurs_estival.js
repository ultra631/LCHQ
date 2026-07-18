// ============================================================
// LCHQ — AJOUT DES INSCRITS SAISON ESTIVALE 2026
// À coller dans la console (F12) sur le site, connecté en admin
// 114 inscrits: 90 patineurs + 24 gardiens
// Tous sans équipe (team: '') — répartition dans les pays plus tard
// Anti-doublon: si le nom existe déjà (patineur OU gardien), il est skippé
// Relançable sans danger.
// ============================================================
(function() {
  // Patineurs: [gamertag, position principale, secondaire, tertiaire, console]
  const SKATERS = [
    // --- Photo 1 ---
    ['Cmplxcty', 'C', 'A', 'D', 'Xbox'],
    ['iR0sty', 'C', 'A', 'D', 'Xbox'],
    ['Lxnctot', 'A', 'G', 'C', 'Xbox'],
    ['Wigy1x', 'C', '', '', 'Ps5'],
    ['LCHQ_Lazanic', 'D', 'C', 'A', 'Ps5'],
    ['NitroQc x 10', 'C', 'A', 'G', 'Xbox'],
    ['CodNath01', 'D', '', '', 'Ps5'],
    ['KnGKushh x 8', 'C', 'A', 'G', 'Ps5'],
    ['TiZz_Creepy', 'A', '', '', 'Ps5'],
    ['Tanguay l40l', 'C', 'A', 'D', 'Xbox'],
    ['Naxpy', 'C', 'A', 'D', 'Xbox'],
    ['B470n3Y123_Qc', 'C', 'A', 'D', 'Ps5'],
    ['X7_Pietrxngelo-7', 'D', 'C', 'A', 'Ps5'],
    ['xZhxrovskyy_-', 'C', 'A', 'G', 'Ps5'],
    ['NitrousClutch', 'D', 'C', 'A', 'Ps5'],
    ['Timine2347112', 'A', 'C', 'D', 'Xbox'],
    ['XxfroadenxX', 'C', 'A', 'D', 'Xbox'],
    ['xRanger97x', 'C', 'D', 'G', 'Ps5'],
    ['LCHQ_D1ablo2508', 'A', 'C', 'G', 'Ps5'],
    ['Thxmpson x48', 'A', 'C', 'G', 'Xbox'],
    ['x_Hxdl_9x', 'A', 'C', '', 'Ps5'],
    ['Elbouch1987', 'C', 'D', '', 'Ps5'],
    ['UNFAZED_QC', 'D', 'A', '', 'Ps5'],
    ['FL_ULTRA-', 'A', 'C', 'G', 'Ps5'],
    ['McXpiche', 'C', 'A', 'D', 'Xbox'],
    ['Qc famous777', 'C', 'A', 'D', 'Xbox'],
    ['Azgod_02', 'A', '', '', 'Ps5'],
    // --- Photo 2 ---
    ['La-_-Coquina', 'A', 'C', '', 'Ps5'],
    ['X-_brownie-_-X', 'C', 'G', '', 'Ps5'],
    ['xOshie-77', 'A', 'C', 'G', 'Ps5'],
    ['Hughes x 43', 'A', 'C', '', 'Xbox'],
    ['Zhxrovskyy', 'A', 'C', 'G', 'Xbox'],
    ['i-KINGKONGX', 'A', 'D', 'G', 'Ps5'],
    ['ToXiC_CARRY166l', 'D', 'G', 'A', 'Ps5'],
    ['xx Bob xx04x', 'A', 'C', 'D', 'Xbox'],
    ['Alee-kush-qc', 'A', 'C', 'D', 'Ps5'],
    ['XxHutson48xX', 'D', 'A', 'C', 'Xbox'],
    ['achillex87', 'D', 'A', 'C', 'Ps5'],
    ['Diam_Clap_You', 'A', 'D', '', 'Ps5'],
    ['Xslafkovskyx20', 'A', 'C', 'D', 'Xbox'],
    ['TomyHabs11', 'C', 'A', 'G', 'Ps5'],
    ['SpaceLtm', 'C', 'A', '', 'Xbox'],
    ['Jeanphiff', 'C', 'A', '', 'Xbox'],
    ['xl_Lxxse_lx', 'A', 'C', 'D', 'Ps5'],
    ['LEPASDOUX14', 'A', 'C', 'G', 'Ps5'],
    ['The_amazing_qc77', 'A', 'C', 'D', 'Ps5'],
    ['Purplekush420_Qc', 'A', 'C', '', 'Ps5'],
    ['Tock-tock-tock', 'D', '', '', 'Ps5'],
    ['NitrousVAZZ', 'A', 'C', 'D', 'Ps5'],
    // --- Photo 3 ---
    ['LCHQ-SAKIC_19_QC', 'A', 'D', 'C', 'Ps5'],
    ['Kuze_majestic', 'A', 'C', 'D', 'Ps5'],
    ['Dodo x l3ll', 'C', 'A', '', 'Xbox'],
    ['Le_Tenebreux9', 'C', 'A', '', 'Ps5'],
    ['Mickannick11', 'C', 'A', 'D', 'Ps5'],
    ['Carlcoreqc', 'A', 'D', 'C', 'Ps5'],
    ['I Getpozz I', 'A', 'C', '', 'Xbox'],
    ['JonathanQC', 'A', '', '', 'Xbox'],
    ['Dj_lavabo', 'A', 'C', 'G', 'Ps5'],
    ['LCHQ EPONA', 'D', 'G', '', 'Xbox'],
    ['damphousse25ch', 'C', 'D', '', 'Ps5'],
    ['LCHQ_l9ll-xHamxL', 'A', 'C', 'D', 'Ps5'],
    ['NitrousBiGGy', 'D', 'A', '', 'Ps5'],
    ['Blade_250', 'C', 'A', '', 'Ps5'],
    ['Legrandgillo', 'D', 'A', '', 'Ps5'],
    ['Ti-Quik21', 'A', '', '', 'Ps5'],
    ['DemonicParrot75', 'D', 'A', 'C', 'Xbox'],
    // --- Photo 4 ---
    ['Oque26', 'A', 'C', 'D', 'Ps5'],
    ['Drxgneel_95', 'A', 'G', 'C', 'Ps5'],
    ['Iboeserlx6', 'A', 'C', 'D', 'Xbox'],
    ['Sparix', 'D', 'A', 'G', 'Ps5'],
    ['OrgeNote7940l27', 'C', 'A', 'D', 'Xbox'],
    ['Courchxsne', 'D', 'G', 'A', 'Ps5'],
    ['Clutch98Qc', 'D', 'A', 'C', 'Xbox'],
    ['Pat-alias-poulin', 'A', 'D', '', 'Ps5'],
    ['JT TREMBLAY07', 'A', 'G', '', 'Ps5'],
    ['XX_Fowler_32xx', 'A', '', '', 'Ps5'],
    ['KnightHoly25', 'D', '', '', 'Xbox'],
    ['Wolf L3nCu13uR', 'A', 'D', 'G', 'Xbox'],
    // --- Photo 5 ---
    ['Edronan', 'D', 'G', 'C', 'Ps5'],
    ['Eric74robert', 'D', 'A', '', 'Xbox'],
    ['LCHQ_NineTaile', 'A', 'G', '', 'Xbox'],
    ['Willox18', 'C', 'D', 'G', 'Xbox'],
    ['Deadpan_piton', 'A', 'C', '', 'Ps5'],
    ['Mathst0126', 'C', 'A', 'G', 'Ps5'],
    ['YONGDEADZ', 'A', 'G', 'C', 'Ps5'],
    ['xlepine13x', 'A', '', '', 'Xbox'],
    ['Sweettyboy20', 'A', 'C', '', 'Xbox'],
    ['Bergie-Qc', 'D', 'A', 'C', 'Ps5'],
    ['xMichkov39', 'D', 'G', 'A', 'Ps5'],
    ['Alexi_Hockey', 'A', 'C', 'G', 'Ps5']
  ];

  // Gardiens (G en 1ère position): [gamertag, pos secondaire, pos tertiaire, console]
  const GOALIES = [
    // --- Photo 1 ---
    ['DUCAS I8I', 'C', 'D', 'Xbox'],
    // --- Photo 2 ---
    ['LooKEazY', 'D', 'A', 'Ps5'],
    ['Mamanetore', 'D', 'C', 'Xbox'],
    ['The_Chad_is_gr8', 'D', 'A', 'Ps5'],
    ['Coyote_fastueux', 'D', 'A', 'Ps5'],
    ['Kickurass9260', 'C', 'A', 'Xbox'],
    ['LCHQ_alex234543', 'C', 'D', 'Ps5'],
    ['BLACK SHADOW48I', 'A', '', 'Xbox'],
    // --- Photo 3 ---
    ['xPrycei', 'A', '', 'Ps5'],
    ['nhlfalken', 'D', '', 'Ps5'],
    ['TNT_ZachOnfire13', 'A', 'C', 'Ps5'],
    ['Ghostyy-_-Qc', 'D', '', 'Ps5'],
    // --- Photo 4 ---
    ['Cabrkn', 'A', 'C', 'Xbox'],
    ['LXCLERC-97', 'C', 'A', 'Ps5'],
    ['Louisquev951', 'D', 'A', 'Ps5'],
    ['TICL x BIO', '', '', 'Xbox'],
    ['Ladou__', 'D', '', 'Ps5'],
    // --- Photo 5 ---
    ['LCHQ Titou05', 'A', '', 'Xbox'],
    ['LCHQ_purplelight', '', '', 'Ps5'],
    ['BabyGirl210503', 'A', '', 'Ps5'],
    ['Hapou5645', 'C', 'A', 'Xbox'],
    ['jxstt_aly_', '', '', 'Ps5'],
    ['QuinnQueenBee93', '', '', 'Ps5'],
    ['Homicideqc', 'D', 'C', 'Xbox']
  ];

  // --- Préparation des structures ---
  if (!DATA.summer_2026) { console.error('❌ DATA.summer_2026 introuvable! Es-tu sur le bon site avec les données chargées?'); return; }
  if (!Array.isArray(DATA.summer_2026.players)) DATA.summer_2026.players = [];
  if (!Array.isArray(DATA.summer_2026.goalies)) DATA.summer_2026.goalies = [];

  const norm = (s) => (s || '').toLowerCase().trim();
  const existingNames = new Set([
    ...DATA.summer_2026.players.map(p => norm(p.name)),
    ...DATA.summer_2026.goalies.map(g => norm(g.name))
  ]);

  // Prochains IDs disponibles (est_N pour patineurs, estg_N pour gardiens)
  let nextP = Math.max(0, ...DATA.summer_2026.players.map(p => parseInt(String(p.id).replace('est_', '')) || 0)) + 1;
  let nextG = Math.max(0, ...DATA.summer_2026.goalies.map(g => parseInt(String(g.id).replace('estg_', '')) || 0)) + 1;

  // Stats à zéro — même patron que le 6S
  const zeroSkater = {
    gp: 0, g: 0, a: 0, pts: 0, plusminus: 0, hits: 0, toi: '0:00',
    tb: 0, mjg: 0, mjf: 0, fopct: 0, pt: 0, pr: 0, passpct: 0,
    intc: 0, prises: 0, pert: 0
  };
  const zeroGoalie = {
    gp: 0, sa: 0, sv: 0, ga: 0, gaa: 0, svpct: 0,
    w: 0, l: 0, otl: 0, so: 0, g: 0, a: 0, pts: 0, toi: '0:00'
  };

  let addedP = 0, addedG = 0;
  const skipped = [];

  // --- Ajout des patineurs ---
  for (const [name, p1, p2, p3, cons] of SKATERS) {
    if (existingNames.has(norm(name))) { skipped.push(name); continue; }
    DATA.summer_2026.players.push({
      id: 'est_' + (nextP++),
      name: name,
      team: '',
      status: 'regular',
      console: cons,
      position: p1,
      position_main: p1,
      position_sec: p2 || '',
      position_ter: p3 || '',
      ...zeroSkater
    });
    existingNames.add(norm(name));
    addedP++;
  }

  // --- Ajout des gardiens ---
  for (const [name, p2, p3, cons] of GOALIES) {
    if (existingNames.has(norm(name))) { skipped.push(name); continue; }
    DATA.summer_2026.goalies.push({
      id: 'estg_' + (nextG++),
      name: name,
      team: '',
      status: 'regular',
      console: cons,
      position: 'G',
      position_main: 'G',
      position_sec: p2 || '',
      position_ter: p3 || '',
      ...zeroGoalie
    });
    existingNames.add(norm(name));
    addedG++;
  }

  // --- Sauvegarde ---
  saveToFirebase();
  if (typeof rerenderAll === 'function') rerenderAll();

  console.log('✅ SAISON ESTIVALE — AJOUT TERMINÉ');
  console.log('🏒 Patineurs ajoutés: ' + addedP + ' (total: ' + DATA.summer_2026.players.length + ')');
  console.log('🥅 Gardiens ajoutés: ' + addedG + ' (total: ' + DATA.summer_2026.goalies.length + ')');
  if (skipped.length) console.log('⏭️ Skippés (déjà existants): ' + skipped.join(', '));
  console.log('💾 saveToFirebase() appelé — vérifie qu\'il n\'y a pas d\'erreur rouge ci-dessus (QuotaExceededError = bénin, ignore-le).');
})();
