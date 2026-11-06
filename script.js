// ------------------------
// script.js
// ------------------------

// Allgemeine Konfiguration
const POINTS_7 = [4, 2, 1, 0, 1, 2, 4]; // für Fragen mit 7 Optionen
const POINTS_6 = [5, 3, 1, 1, 3, 5]; // für die speziellen 7. Fragen (6 Optionen) -> indices 0..5
const CENTER_7 = 3; // mittlere Position bei 7-Optionen

// Blocks-Definition: jede Dimension mit Fragen und Buchstaben (primary = left in Q1-3)
const blocks = [
  {
    // Block 1: A vs O
    id: "quiz-1",
    questions: [
      "Mich inspirieren bei Bewegungen vor allem einzelne charismatische Akteure",
      "Social Media leistet wichtigere Überzeugungsarbeit als Haustürgespräche",
      "Alleine arbeiten ergibt für mich am meisten Sinn",
      "Ich bin Teil einer politischen Gruppe",
      "Das Kollektiv ist wichtiger als das Individuum",
      "Ich würde auch Beschlüsse meiner Gruppe nach außen vertreten, selbst wenn ich nicht zu 100% dahinter stehe",
      "Wenn du ehrlich bist, ist ein Teil deiner politischen Meinung durch andere wie Politiker*innen, Influencer*innen und dein Umfeld geformt worden oder ist deine Meinung immer primär aus dir selbst heraus entstanden?",
    ],
    primary: "A",
    secondary: "O",
    lastQuestionLabels: {
      left: "Immer aus mir selbst",
      right: "Auch durch andere",
    },
  },
  {
    // Block 2: R vs F
    id: "quiz-2",
    questions: [
      "Das Parlament ist nur dafür da, Aktivist*innen vor Ort Gelder zukommen zu lassen",
      "Nur die Revolution kann uns aus dem Kapitalismus befreien",
      "Es braucht eine möglichst strenge und weite Arbeiter*innen-Quote bei der Listenwahl für den Bundestag",
      "Menschen wie Gregor Gysi oder Heidi Reichinnek leisten wichtige Arbeit",
      "Parlamentarische Arbeit muss bei Linken auch Beachtung finden",
      "Es ist in Ordnung, wenn Abgeordnete länger als acht Jahre im Parlament sitzen",
      "Würdest du eher eine kämpferische Demonstration mit über 2.000 Menschen organisieren oder stattdessen eine Marxismus-Professur an deiner Uni durchsetzen?",
    ],
    primary: "R",
    secondary: "F",
    lastQuestionLabels: { left: "Demo", right: "Professur" },
  },
  {
    // Block 3: T vs P
    id: "quiz-3",
    questions: [
      "Ich lese gerne",
      "Ich habe „Das Kapital“ von Karl Marx gelesen oder würde es gerne lesen",
      "Ich kann Begriffe wie Anti-Kapitalismus, Sozialismus und Kommunismus auseinanderhalten und notfalls auch erklären",
      "Ich war schon bei einem Aktionstraining oder würde gerne eines besuchen",
      "Ich habe mir schon mal eine EA-Nummer der Roten Hilfe aufgeschrieben",
      "Ich achte darauf, oft auf Demonstrationen zu sein",
      "Wirst du durch Worte oder Taten von der Sache überzeugt?",
    ],
    primary: "T",
    secondary: "P",
    lastQuestionLabels: { left: "Worte", right: "Taten" },
  },
  {
    // Block 4: U vs R (Utopist vs Realist)
    id: "quiz-4",
    questions: [
      "Ich brauche eine Zukunftsvision für den politischen Kampf",
      "Ich habe insgesamt mehr Hoffnung als Pessimismus, wenn ich an die Zukunft denke",
      "Ich male mir öfters in Gedanken eine andere Gesellschaft aus",
      "Der Kapitalismus wird noch Jahrzehnte existieren",
      "Die Ideen von Karl Marx sind mittlerweile veraltet",
      "Kleine Veränderungen im Kapitalismus sind große Erfolge für die Bewegung",
      "Irgendwo auf einem anderen Planeten existiert der perfekte Kommunismus und du bist zufällig dorthin teleportiert worden. Was meinst du, werden deine neuen Mitmenschen merken, dass du kapitalistisch sozialisiert bist oder würden keine Zweifel aufkommen?",
    ],
    primary: "U",
    secondary: "R",
    lastQuestionLabels: {
      left: "Ich bin einer von ihnen!",
      right: "Sie wissen es",
    },
  },
];

// Tiebreaker-Fragen (bei Gleichstand in einer Dimension)
const tiebreakerQuestions = {
  0: {
    question:
      "Würdest du die nächsten 10 Jahre entweder alleine wohnen oder in einer Fünfer-WG leben?",
    left: { label: "Alleine", letter: "A" },
    right: { label: "Fünfer-WG", letter: "O" },
  },
  1: {
    question:
      "Würdest du in deinem Garten entweder einen Baum selbst pflanzen und ihm beim Wachsen zusehen oder einen bereits ausgewachsenen Baum einpflanzen?",
    left: { label: "Selbst pflanzen", letter: "R" },
    right: { label: "Ausgewachsenen Baum einpflanzen", letter: "F" },
  },
  2: {
    question: "Macht dir Denkarbeit oder Handarbeit mehr Spaß?",
    left: { label: "Denkarbeit", letter: "T" },
    right: { label: "Handarbeit", letter: "P" },
  },
  3: {
    question:
      "Der Favorit der Liga spielt gegen den Underdog. Auf welches Team setzt du?",
    left: { label: "Favorit", letter: "R" },
    right: { label: "Underdog", letter: "U" },
  },
};

// Ergebnisprofile
const resultProfiles = {
  ORTU: {
    title:
      "Organisiert, Revolutionär, Theorie, Utopist*in - Der*Die Theoriegetreue",
    persons: ["Angela Davis"],
    text: "Du bist, was du liest. Unbeeindruckt von allem, was in unserer Welt passiert, weißt du, dass eine bessere Welt möglich ist. Deswegen sprichst und diskutierst du mit deinen Mitmenschen in und außerhalb der Gruppe, damit sie auch den Funken entwickeln, der dir einst verliehen wurde.",
    image: "Bilder/AngelaDavisORTU.jpg",
  },
  ORPU: {
    title:
      "Organisiert, Revolutionär, Praxis, Utopist*in - Der*Die Dauerdemogänger*in",
    persons: ["Rosa Luxemburg", "Che Guevara", "Mao Zedong"],
    text: "Mit dir steht der Revolution praktisch nichts mehr im Weg! Unbeirrt von all den Steinen, die dir in den Weg gelegt werden, kämpfst du weiter für die Sache. Lass sie eines Tages wahr werden.",
    image: "Bilder/CheGuevaraORPU.jpg",
  },
  ORTR: {
    title:
      "Organisiert, Revolutionär, Theorie, Realist*in - Der*Die Leitfadenentwickler*in",
    persons: ["Abdullah Öcalan"],
    text: "Du hast den großen Plan im Auge und erklärst deinen Genoss*innen, wie sie tagtäglich darauf hinarbeiten können. Als würdest du dich in einem Schachspiel befinden, denkst du schon über den nächsten Zug nach. Doch wie wird die Partie ausgehen?",
    image: "Bilder/AbdullahÖcalanORTR.jpg",
  },
  ORPR: {
    title:
      "Organisiert, Revolutionär, Praxis, Realist*in - Der*Die mit dem harten Fell",
    persons: ["Josef Stalin"],
    text: "Es ist ein harter Kampf, dessen du dir vollends bewusst bist. Und genau deswegen bist du bereit für die Drecksarbeit, das, was eben getan werden muss. Doch pass ja auf, nicht das langfristige Ziel aus den Augen zu verlieren.",
    image: "Bilder/JosefStalinORPR.jpg",
  },
  OFPU: {
    title:
      "Organisiert, Reformistisch, Praxis, Utopist*in - Der*Die Langfristige",
    persons: ["Ines Schwerdtner"],
    text: "Du bist im Parlament. Endlich hast du es geschafft! Doch hier ist nicht Schluss: Langfristige Verankerung und größtmöglicher Druck auf die Regierung sind das Ziel. Und vielleicht hört es da nicht auf. Wirst du die Regierungsfrage stellen?",
    image: "Bilder/InesSchwerdtnerOFPU.jpg",
  },
  OFTU: {
    title:
      "Organisiert, Reformistisch, Theorie, Utopist*in - Der*Die mit dem Plan",
    persons: ["Eduard Bernstein"],
    text: "Jede Aufgabe muss auf ein Ziel hinarbeiten. Nichts passiert einfach so. Du willst deine Träume greifbar machen und entwickelst deswegen eine Strategie, auf die deine Genoss*innen zurückgreifen sollen. Doch hört es beim Parlament auf?",
    image: "Bilder/EduardBernsteinOFTU.jpg",
  },
  OFPR: {
    title:
      "Organisiert, Reformistisch, Praxis, Realist*in - Der*Die im Hier und Jetzt",
    persons: ["Heidi Reichinnek", "Bernie Sanders", "Michail Gorbatschow"],
    text: "Du kennst die Grenzen deines Handelns. Jetzt sitzt du im Parlament, doch was ist möglich? Die einen mögen dich eine*n Karrierist*in nennen, doch die anderen wissen von deinen ehrlichen Zielen, nämlich einer besseren Gesellschaft, die du sofort angehen möchtest, nicht irgendwann.",
    image: "Bilder/HeidiReichinnekOFPR.jpg",
  },
  OFTR: {
    title:
      "Organisiert, Reformistisch, Theorie, Realist*in - Der*Die Enttäuschte",
    persons: ["FFF"],
    text: "Ist eine systematische Veränderung über das Parlament möglich? Du hast lange daran geglaubt, doch die letzten Jahre haben dir das Gegenteil bewiesen. Jetzt musst du dich entscheiden: Stillstand oder Revolution?",
    image: "Bilder/FFFOFTR.jpg",
  },
  ARTR: {
    title:
      "Alleingänger*in, Revolutionär, Theorie, Realist*in - Der*Die Stubenhocker*in",
    persons: ["Wolfgang M. Schmitt", "Hasan Abi", "Antonio Gramsci"],
    text: "Du sitzt zuhause und denkst darüber nach, wie eine bessere Welt entstehen kann. Schnell schnappst du dir das Handy und fängst an, die ersten Videos zu drehen. Du hast das Wissen und nun ist es deine Mission, es zu den Menschen zu bringen!",
    image: "Bilder/WolfgangMSchmittARTR.jpg",
  },
  ARPR: {
    title:
      "Alleingänger*in, Revolutionär, Praxis, Realist*in - Der*Die Saboteur*in",
    persons: ["Georg Elser"],
    text: "Alleine führst du den Kampf gegen die tagtäglichen Auswüchse der kapitalistischen Ordnung. ‘Selbst ist der Mann’ hieß es früher und so begibst du dich in risikoreiche Aktionen. Die Gefahr ist zu groß, um andere mitzunehmen, doch wann wirst du an dich selber denken?",
    image: "Bilder/GeorgElserARPR.jpg",
  },
  ARTU: {
    title:
      "Alleingänger*in, Revolutionär, Theorie, Utopist*in - Der*Die Erschaffer*in",
    persons: ["Karl Marx", "Fabian Lehr", "99zu"],
    text: "Große Taten brauchen einen großen Geist. Du hast all die Theorie gelesen … nein … du bist die Theorie! Viele werden sich auf deine Ideen stützen, doch wann wirst du sie selbst versuchen umzusetzen?",
    image: "Bilder/KarlMarxARTU.jpg",
  },
  ARPU: {
    title:
      "Alleingänger*in, Revolutionär, Praxis, Utopist*in - Der*Die Flyerverteiler*in",
    persons: ["Punk Band (Slime)"],
    text: "Immer wieder siehst du hoffnungsvolle Menschen auf Demonstrationen. Doch nach der Demo gehen sie nach Hause und nichts ändert sich. Aber nicht mit dir! Mit deinen selbst erstellten Flyern, die von revolutionärer Praxis handeln und ab sofort auf jeder Demo verteilt werden, versuchst du die anderen von der Sache zu überzeugen. Doch wann überzeugst du dich selbst und organisierst dich?",
    image: "Bilder/PunkBandARPU.jpg",
  },
  AFPR: {
    title:
      "Alleingänger*in, Reformistisch, Praxis, Realist*in - Der*Die mit den Bauchschmerzen",
    persons: ["Luisa Neubauer"],
    text: "Du fragst dich selbst manchmal, ob dein Weg die Lösung ist. Zwar kann deine Stimme Gehör finden, doch was verändert sie? Wirst du deine wahren politischen Ziele jemals erreichen?",
    image: "Bilder/LuisaNeubauerAFPR.jpg",
  },
  AFTR: {
    title:
      "Alleingänger*in, Reformistisch, Theorie, Realist*in - Der*Die Naive",
    persons: ["Rezo"],
    text: "Du hast gelesen, dass das Grundgesetz kein Wirtschaftssystem festlegt. Nun bist du voller Euphorie und verkündest ein mögliches Ende des Kapitalismus. Doch in deinem Inneren weißt du, dass ein, zwei Gesetze nicht das Ende des Kapitalismus bringen werden. Was bedeutet das für dich?",
    image: "Bilder/RezoAFTR.jpg",
  },
  AFPU: {
    title: "Alleingänger*in, Reformistisch, Praxis, Utopist*in - Der Sisyphos",
    persons: ["Greta Thunberg"],
    text: "Du weißt es und dennoch gibst du nicht auf! Sie da oben hören nicht auf dich, die Zwänge sind systematisch und dennoch versuchst du die Aufmerksamkeit auf dich zu lenken, damit sich endlich etwas ändert. Wie weit bist du bereit, dafür zu gehen?",
    image: "Bilder/GretaThunbergAFPU.jpg",
  },
  AFTU: {
    title:
      "Alleingänger*in, Reformistisch, Theorie, Utopist*in - Der*Die Zurückhaltende",
    persons: ["Alle progressiven Influencer*innen (Papaplatte)"],
    text: "Du hast das Richtige gelesen, vielleicht ist es auch nur ein Bauchgefühl von dir. Irgendetwas muss sich ändern! Doch es passiert nicht. Hast du den Mut, die Probleme laut auszusprechen?",
    image: "Bilder/PapaplatteAFTU.jpg",
  },
};

// DOM Shortcuts
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const finalLetters = document.getElementById("finalLetters");
const finalMessage = document.getElementById("finalMessage");
const resultDetails = document.getElementById("resultDetails");
const profileImage = document.getElementById("profileImage");
const showFinalResultBtn = document.getElementById("showFinalResultBtn");
const tiebreakerContainer = document.getElementById("tiebreaker-questions");

// Buchstaben nach der Auswertung der 4 Blöcke ("X" = Gleichstand)
let baseLetters = [];

// Zähler, damit veraltete Ergebnisse nicht über den Browser-Verlauf
// wieder angezeigt werden, nachdem Antworten geändert wurden.
let quizVersion = 0;
let tbVersion = 0;
let tiebreakerFor = null; // quizVersion, für die der Tiebreaker erzeugt wurde
let resultFor = null; // "quizVersion:tbVersion" des angezeigten Ergebnisses

// ------------------------
// Navigation (inkl. Zurück-Taste von Browser/Handy)
// ------------------------
// Jeder Bildschirmwechsel bekommt einen Eintrag im Browser-Verlauf.
// So führt die Zurück-Taste bzw. Zurück-Geste auf dem Handy zur vorherigen
// Seite des Tests, statt die Website zu verlassen.

if ("scrollRestoration" in history) history.scrollRestoration = "manual";

let navIndex = 0;
const navStack = ["intro"];
history.replaceState({ screen: "intro", idx: 0 }, "");

function showScreen(id) {
  const el = document.getElementById(id);
  if (!el) return;
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  el.classList.add("active");
  window.scrollTo(0, 0);
}

// neuen Bildschirm öffnen (Vorwärts)
function navigate(id) {
  navIndex++;
  navStack.length = navIndex;
  navStack.push(id);
  history.pushState({ screen: id, idx: navIndex }, "");
  showScreen(id);
}

// "Zurück"-Button auf der Seite: verhält sich wie die Zurück-Taste
function goBack(target) {
  if (navIndex > 0 && navStack[navIndex - 1] === target) {
    history.back();
  } else {
    navigate(target);
  }
}

function canShow(id) {
  if (id === "tiebreaker") return tiebreakerFor === quizVersion;
  if (id === "result") return resultFor === `${quizVersion}:${tbVersion}`;
  return true;
}

window.addEventListener("popstate", (e) => {
  const state = e.state || { screen: "intro", idx: 0 };
  navIndex = state.idx || 0;
  let id = state.screen;
  if (!document.getElementById(id)) id = "intro";
  if (!canShow(id)) {
    // Ergebnis passt nicht mehr zu den Antworten -> zurück zum Fragebogen
    id = allBlocksAnswered() ? blocks[blocks.length - 1].id : "intro";
    history.replaceState({ screen: id, idx: navIndex }, "");
  }
  navStack[navIndex] = id;
  showScreen(id);
});

// ------------------------
// Rendering
// ------------------------

// Alle Fragenblöcke einmalig aufbauen. Die Antworten bleiben dadurch
// erhalten, wenn man zurück- und wieder vorwärtsgeht.
function renderAllBlocks() {
  blocks.forEach((block, blockIndex) => {
    const container = document.getElementById(`questions-${blockIndex + 1}`);
    if (!container) return;
    container.innerHTML = "";
    block.questions.forEach((qText, qIdx) => {
      const isLast = qIdx === block.questions.length - 1;
      const optionCount = isLast ? 6 : 7;
      const leftLabel = isLast
        ? block.lastQuestionLabels.left
        : "Ich stimme zu";
      const rightLabel = isLast
        ? block.lastQuestionLabels.right
        : "Ich stimme nicht zu";
      const name = `b${blockIndex}q${qIdx}`;

      const qWrap = document.createElement("div");
      qWrap.className = "question";
      qWrap.dataset.name = name;
      qWrap.innerHTML = scaleHtml({
        text: `${qIdx + 1}. ${qText}`,
        name,
        leftLabel,
        rightLabel,
        values: Array.from({ length: optionCount }, (_, i) => String(i)),
      });
      container.appendChild(qWrap);
    });
  });
}

// HTML für eine Frage mit Skala.
// values: Werte der Radio-Buttons von links nach rechts
// dFixed: optional feste relative Größe aller Kreise (0 = klein, 1 = groß)
function scaleHtml({ text, name, leftLabel, rightLabel, values, dFixed }) {
  const count = values.length;
  const center = (count - 1) / 2;
  let dSum = 0;
  let options = "";

  values.forEach((value, i) => {
    const d = dFixed ?? (center > 0 ? Math.abs(i - center) / center : 0);
    dSum += d;
    let aria = `${i + 1} von ${count}`;
    if (i === 0) aria += ` – ${leftLabel}`;
    if (i === count - 1) aria += ` – ${rightLabel}`;
    options += `
      <label class="option" style="--d:${d.toFixed(3)}">
        <input type="radio" name="${name}" value="${escapeHtml(
      value
    )}" aria-label="${escapeHtml(aria)}" />
      </label>`;
  });

  return `
    <div class="q-text">${escapeHtml(text)}</div>
    <div class="scale">
      <div class="scale-row">
        <div class="scale-label scale-left-label" aria-hidden="true">${escapeHtml(
          leftLabel
        )}</div>
        <div class="options" role="radiogroup" aria-label="${escapeHtml(
          text
        )}" style="--count:${count};--dsum:${dSum.toFixed(3)}">
          ${options}
        </div>
        <div class="scale-label scale-right-label" aria-hidden="true">${escapeHtml(
          rightLabel
        )}</div>
      </div>
    </div>`;
}

// Tiebreaker-Seite aufbauen
function renderTiebreakerScreen(letters) {
  tiebreakerContainer.innerHTML = "";
  letters.forEach((letter, index) => {
    if (letter !== "X") return;
    const tb = tiebreakerQuestions[index];
    const name = `tb${index}`;
    const qWrap = document.createElement("div");
    qWrap.className = "question";
    qWrap.dataset.name = name;
    qWrap.dataset.block = index;
    qWrap.innerHTML = scaleHtml({
      text: tb.question,
      name,
      leftLabel: tb.left.label,
      rightLabel: tb.right.label,
      values: [tb.left.letter, tb.right.letter],
      dFixed: 0.5,
    });
    tiebreakerContainer.appendChild(qWrap);
  });
  tbVersion++;
  tiebreakerFor = quizVersion;
}

// Auswahl hervorheben (funktioniert für Maus, Touch und Tastatur)
document.addEventListener("change", (e) => {
  const input = e.target;
  if (!input.matches('.option input[type="radio"]')) return;
  const question = input.closest(".question");
  question
    .querySelectorAll(".option")
    .forEach((o) => o.classList.toggle("selected", o.contains(input)));
  question.classList.remove("missing");

  const screen = input.closest(".screen");
  if (screen && !screen.querySelector(".question.missing")) hideError(screen);

  if (input.name.startsWith("tb")) tbVersion++;
  else quizVersion++;
});

// ------------------------
// Prüfen, ob alles beantwortet ist
// ------------------------

function isAnswered(name) {
  return !!document.querySelector(`input[name="${name}"]:checked`);
}

function blockComplete(blockIndex) {
  return blocks[blockIndex].questions.every((_, q) =>
    isAnswered(`b${blockIndex}q${q}`)
  );
}

function allBlocksAnswered() {
  return blocks.every((_, b) => blockComplete(b));
}

// Markiert unbeantwortete Fragen eines Bildschirms und scrollt zur ersten.
function checkScreen(screenEl, message) {
  const missing = [];
  screenEl.querySelectorAll(".question").forEach((q) => {
    const answered = isAnswered(q.dataset.name);
    q.classList.toggle("missing", !answered);
    if (!answered) missing.push(q);
  });
  if (missing.length === 0) {
    hideError(screenEl);
    return true;
  }
  showError(
    screenEl,
    missing.length === 1
      ? message.one
      : message.many.replace("{n}", missing.length)
  );
  missing[0].scrollIntoView({ behavior: "smooth", block: "center" });
  return false;
}

const MISSING_MSG = {
  one: "Bitte beantworte noch die markierte Frage.",
  many: "Bitte beantworte noch die {n} markierten Fragen.",
};

function showError(screenEl, text) {
  let box = screenEl.querySelector(".form-error");
  if (!box) {
    box = document.createElement("p");
    box.className = "form-error";
    box.setAttribute("role", "alert");
    const actions = screenEl.querySelector(".actions");
    actions.parentNode.insertBefore(box, actions);
  }
  box.textContent = text;
  box.hidden = false;
}

function hideError(screenEl) {
  const box = screenEl.querySelector(".form-error");
  if (box) box.hidden = true;
}

// ------------------------
// Buttons
// ------------------------

startBtn.addEventListener("click", () => navigate(blocks[0].id));

document.addEventListener("click", (e) => {
  const back = e.target.closest(".btn-back");
  const next = e.target.closest(".btn-next");

  if (back && back.dataset.target) {
    goBack(back.dataset.target);
    return;
  }

  if (next) {
    const screen = next.closest(".screen");
    if (!checkScreen(screen, MISSING_MSG)) return;

    const nextId = next.dataset.next;
    if (nextId === "result") {
      // Falls über den Verlauf ein Block übersprungen wurde
      const firstOpen = blocks.findIndex((_, b) => !blockComplete(b));
      if (firstOpen >= 0) {
        const target = document.getElementById(blocks[firstOpen].id);
        navigate(blocks[firstOpen].id);
        checkScreen(target, MISSING_MSG);
        return;
      }
      computeAndShowResults();
    } else {
      navigate(nextId);
    }
  }
});

restartBtn.addEventListener("click", () => {
  document
    .querySelectorAll('input[type="radio"]')
    .forEach((r) => (r.checked = false));
  document
    .querySelectorAll(".option.selected")
    .forEach((o) => o.classList.remove("selected"));
  document
    .querySelectorAll(".question.missing")
    .forEach((q) => q.classList.remove("missing"));
  document.querySelectorAll(".form-error").forEach((b) => (b.hidden = true));
  tiebreakerContainer.innerHTML = "";
  finalLetters.textContent = "----";
  finalMessage.textContent = "";
  resultDetails.innerHTML = "";
  profileImage.innerHTML = "";
  baseLetters = [];
  quizVersion++;
  tiebreakerFor = null;
  resultFor = null;

  // zurück zum Anfang des Verlaufs, damit "Zurück" nicht ins alte Ergebnis führt
  if (navIndex > 0) history.go(-navIndex);
  else showScreen("intro");
});

showFinalResultBtn.addEventListener("click", () => {
  const screen = document.getElementById("tiebreaker");
  if (
    !checkScreen(screen, {
      one: "Bitte beantworte noch die markierte Entscheidungsfrage.",
      many: "Bitte beantworte noch die {n} markierten Entscheidungsfragen.",
    })
  )
    return;

  const letters = [...baseLetters];
  tiebreakerContainer.querySelectorAll(".question").forEach((q) => {
    const blockIndex = parseInt(q.dataset.block, 10);
    const selected = q.querySelector('input[type="radio"]:checked');
    letters[blockIndex] = selected.value;
  });

  displayFinalResult(letters.join(""));
  navigate("result");
});

// ------------------------
// Auswertung
// ------------------------

function computeAndShowResults() {
  const letters = [];
  for (let b = 0; b < blocks.length; b++) {
    const block = blocks[b];
    let scorePrimary = 0;
    let scoreSecondary = 0;

    for (let q = 0; q < block.questions.length; q++) {
      const sel = document.querySelector(`input[name="b${b}q${q}"]:checked`);
      const val = parseInt(sel.value, 10);
      const isLast = q === block.questions.length - 1;

      if (!isLast) {
        // Fragen 1-3: Zustimmung zählt für den ersten Buchstaben,
        // Fragen 4-6: Zustimmung zählt für den zweiten Buchstaben
        if (q <= 2) {
          if (val < CENTER_7) scorePrimary += POINTS_7[val];
          else if (val > CENTER_7) scoreSecondary += POINTS_7[val];
        } else {
          if (val < CENTER_7) scoreSecondary += POINTS_7[val];
          else if (val > CENTER_7) scorePrimary += POINTS_7[val];
        }
      } else {
        if (val <= 2) scorePrimary += POINTS_6[val];
        else scoreSecondary += POINTS_6[val];
      }
    }
    if (scorePrimary > scoreSecondary) letters.push(block.primary);
    else if (scoreSecondary > scorePrimary) letters.push(block.secondary);
    else letters.push("X");
  }

  baseLetters = letters;

  if (letters.includes("X")) {
    renderTiebreakerScreen(letters);
    hideError(document.getElementById("tiebreaker"));
    navigate("tiebreaker");
  } else {
    displayFinalResult(letters.join(""));
    navigate("result");
  }
}

function displayFinalResult(code) {
  finalLetters.textContent = code;
  finalMessage.textContent = "";

  const profile = resultProfiles[code];
  let html = "";
  if (profile) {
    html += `<div class="profile"><strong>${escapeHtml(
      profile.title
    )}</strong></div>`;
    if (profile.text) html += `<p>${escapeHtml(profile.text)}</p>`;
    if (profile.persons && profile.persons.length)
      html += `<p><em>Persönlichkeiten:</em> ${escapeHtml(
        profile.persons.join(", ")
      )}</p>`;
  } else {
    html += `<div class="profile"><strong>Typ ${escapeHtml(
      code
    )}</strong><p>Beschreibung folgt.</p></div>`;
  }

  profileImage.innerHTML = "";
  if (profile && profile.image) {
    profileImage.innerHTML = `<img src="${escapeHtml(
      profile.image
    )}" alt="${escapeHtml(profile.persons.join(", "))}">`;
  }

  resultDetails.innerHTML = html;
  resultFor = `${quizVersion}:${tbVersion}`;
}

// kleiner Helfer gegen HTML-Injection
function escapeHtml(s) {
  if (s === undefined || s === null) return "";
  return s
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

renderAllBlocks();
