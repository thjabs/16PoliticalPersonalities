// ------------------------
// script.js (final)
// ------------------------

// Allgemeine Konfiguration
const BASE_SIZE = 34;
const MAX_MULT = 2;
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
      "Wenn du ehrlich bist, ist ein Teil deiner politischen Meinung durch andere wie Politiker*innen, Influencer*innen und deinem Umfeld geformt worden oder ist deine Meinung immer primär aus dir selbst heraus entstanden?",
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
      "Ich habe oder würde gerne das Kapitel von Karl Marx lesen",
      "Ich kann Begriffe wie Anti-Kapitalismus, Sozialismus und Kommunismus auseinanderhalten und Notfalls auch erklären",
      "Ich war oder würde gerne ein Aktionstraining besuchen",
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
      "Karl Marx seine Ideen sind mittlerweile veraltet",
      "Kleine Veränderungen im Kapitalismus sind große Erfolge für die Bewegung",
      "Irgendwo auf einem anderen Planeten existiert der perfekte Kommunismus und du bist dort zufällig hin teleportiert worden. Was meinst du, werden deine neuen Mitmenschen merken, dass du kapitalistisch sozialisiert bist oder würden keine Zweifel aufkommen?",
    ],
    primary: "U",
    secondary: "R",
    lastQuestionLabels: {
      left: "Ich bin einer von Ihnen!",
      right: "Sie wissen es",
    },
  },
];

// Ergebnisprofile (alle 16) inklusive Bild-Pfad (jpg in Ordner "Bilder")
const resultProfiles = {
  ORTU: {
    title:
      "Organisiert, Revolutionär, Theorie, Utopist*in — Der*Die Theoriegetreue",
    persons: ["Angela Davis"],
    text: "Du bist, was du liest. Unbeeindruckt von allem was in unserer Welt passiert, weißt du, dass eine bessere Welt möglich ist. Deswegen sprichst und diskutierst du mit deinen Mitmenschen in und außerhalb der Gruppe, damit sie auch den Funken entwickeln, der dir einst verliehen wurde.",
    image: "Bilder/AngelaDavisORTU.jpg",
  },
  ORPU: {
    title:
      "Organisiert, Revolutionär, Praxis, Utopist*in — Der*Die Dauerdemogänger*in",
    persons: ["Rosa Luxemburg", "Che Guevara", "Mao Zedong"],
    text: " Mit dir steht der Revolution praktisch nichts mehr im Weg! Unbeirrt von all den Steinen, die dir in den Weg gelegt werden, kämpfst du weiter für die Sache. Lass sie eines Tages wahr werden.",
    image: "Bilder/CheGuevaraORPU.jpg",
  },
  ORTR: {
    title:
      "Organisiert, Revolutionär, Theorie, Realist*in — Der*Die Leitfadenentwickler*in",
    persons: ["Abdullah Öcalan"],
    text: "Du hast den großen Plan im Auge und erklärst deinen Genoss*innen wie sie tagtäglich darauf hinarbeiten können. Als würdest du dich in einem Schachspiel befinden, denkst du schon über den nächsten Zug nach. Doch wie wird die Partie ausgehen?",
    image: "Bilder/AbdullahÖcalanORTR.jpg",
  },
  ORPR: {
    title:
      "Organisiert, Revolutionär, Praxis, Realist*in — Der*Die mit dem harten Fell",
    persons: ["Josef Stalin"],
    text: "Es ist ein harter Kampf, dem du dir vollends bewusst bist. Und genau deswegen bist du bereit für die Drecksarbeit, das was eben getan werden muss. Doch pass ja auf, nicht das langfristige Ziel aus den Augen zu verlieren.",
    image: "Bilder/JosefStalinORPR.jpg",
  },

  OFPU: {
    title:
      "Organisiert, Reformistisch, Praxis, Utopist*in — Der*Die Langfristige",
    persons: ["Ines Schwerdtner"],
    text: "Du bist im Parlament. Endlich hast du es geschafft! Doch hier ist nicht Schluss: Langfristige Verankerung und größtmöglicher Druck auf die Regierung sind das Ziel. Und vielleicht hört es da nicht auf. Wirst du die Regierungsfrage stellen?",
    image: "Bilder/InesSchwerdtnerOFPU.jpg",
  },
  OFTU: {
    title:
      "Organisiert, Reformistisch, Theorie, Utopist*in — Der*Die mit dem Plan",
    persons: ["Eduard Bernstein"],
    text: "Jede Aufgabe muss auf ein Ziel hinarbeiten. Nichts passiert einfach so. Du willst deine Träume greifbar machen und entwickelst deswegen eine Strategie, auf die deine Genoss*innen zurückgreifen sollen. Doch hört es beim Parlament auf?",
    image: "Bilder/EduardBernsteinOFTU.jpg",
  },
  OFPR: {
    title:
      "Organisiert, Reformistisch, Praxis, Realist*in — Der*Die im Hier und Jetzt",
    persons: ["Heidi Reichninnek", "Bernie Sanders", "Michail Gorbatschow"],
    text: "Du weißt die Grenzen deines Handels. Jetzt sitzt du im Parlament, doch was ist möglich? Die einen mögen dich eine*n Karrierist* nennen, doch die anderen wissen von deinen ehrlichen Zielen, nämlich einer besseren Gesellschaft, die du sofort angehen möchtest, nicht irgendwann.",
    image: "Bilder/HeidiReichinnekOFPR.jpg",
  },
  OFTR: {
    title:
      "Organisiert, Reformistisch, Theorie, Realist*in — Der*Die Enttäuschte",
    persons: ["FFF"],
    text: "Ist eine systematische Veränderung über das Parlament möglich? Du hast lange daran geglaubt, doch die letzten Jahre haben dir das Gegenteil bewiesen. Jetzt musst du dich entscheiden: Stillstand oder Revolution?",
    image: "Bilder/FFFOFTR.jpg",
  },

  ARTR: {
    title:
      "Alleingänger*in, Revolutionär, Theorie, Realist*in — Der*Die Stubenhocker*in",
    persons: ["Wolfgang M. Schmitt", "Hasan Abi", "Antonio Gramsci"],
    text: "Du sitzt zuhause und denkst darüber nach, wie eine bessere Welt entstehen kann. Schnell schnappst du dir das Handy und fängst an die ersten Videos zu drehen. Du hast das Wissen und nun ist es deine Mission sie an den Mensch zu bringen!",
    image: "Bilder/WolfgangMSchmittARTR.jpg",
  },
  ARPR: {
    title:
      "Alleingänger*in, Revolutionär, Praxis, Realist*in — Der*Die Saboteur*in",
    persons: ["Georg Elser"],
    text: "Alleine führst du den Kampf gegen die tagtäglichen Auswüsche der kapitalistischen Ordnung. ‘Selbst ist der Mann’ hieß es früher und so begehst du dich auf risikoreiche Aktionen. Die Gefahr ist zu groß, um andere mitzunehmen, doch wann wirst du an dich selber denken?",
    image: "Bilder/GeorgElserARPR.jpg",
  },
  ARTU: {
    title:
      "Alleingänger*in, Revolutionär, Theorie, Utopist*in — Der*Die Erschaffer*in",
    persons: ["Karl Marx", "Fabian Lehr", "99zu"],
    text: "Große Taten brauchen einen großen Geist. Du hast all die Theorie gelesen… nein …. du bist die Theorie! Viele werden sich auf deine Ideen stützen, doch wann wirst du sie selbst versuchen umzusetzen?",
    image: "Bilder/KarlMarxARTU.jpg",
  },
  ARPU: {
    title:
      "Alleingänger*in, Revolutionär, Praxis, Utopist*in — Der*Die Flyerverteiler*in",
    persons: ["Punk Band (Slime)"],
    text: "Immer wieder siehst du hoffnungsvolle Menschen auf Demonstrationen. Doch nach der Demo gehen sie nach Hause und nichts ändert sich. Aber nicht mit dir! Mit deinen eigen erstellen Flyern, die über revolutionäre Praxis handeln und ab sofort auf jeder Demo verteilt werden, versuchst du die anderen von der Sache zu überzeugen. Doch wann überzeugst du dich selbst und organisierst dich?",
    image: "Bilder/PunkBandARPU.jpg",
  },

  AFPR: {
    title:
      "Alleingänger*in, Reformistisch, Praxis, Realist*in — Der*Die mit den Bauschmerzen",
    persons: ["Luisa Neubauer"],
    text: "Du fragst dich selbst manchmal, ob dein Weg die Lösung ist. Zwar kann deine Stimme Gehör finden, doch was verändert sie? Wird sie deine wahren politischen Ziele jemals erreichen?",
    image: "Bilder/LuisaNeubauerAFPR.jpg",
  },
  AFTR: {
    title:
      "Alleingänger*in, Reformistisch, Theorie, Realist*in — Der*Die Naive",
    persons: ["Rezo"],
    text: "Du hast gelesen, dass das Grundgesetz sein Wirtschaftssystem nicht festgelegt hat. Nun bist du voller Euphorie und verkündest ein mögliches Ende des Kapitalismus. Doch in deinem inneren weißt du, dass ein, zwei Gesetze nicht das Ende des Kapitalismus bringen werden. Was bedeutet das für dich?",
    image: "Bilder/RezoAFTR.jpg",
  },
  AFPU: {
    title: "Alleingänger*in, Reformistisch, Praxis, Utopist*in — Der Sisyphos",
    persons: ["Greta Thunberg"],
    text: "Du weißt es und dennoch gibst du nicht auf! Sie da oben hören nicht auf dich, die Zwänge sind systematisch und dennoch versuchst du die Aufmerksamkeit auf dich zu lenken, damit sich endlich etwas ändert. Wie weit bist du bereit dafür zu gehen?",
    image: "Bilder/GretaThunbergAFPU.jpg",
  },
  AFTU: {
    title:
      "Alleingänger*in, Reformistisch, Theorie, Utopist*in — Der*Die Zurückhaltende",
    persons: ["Alle progressiven Influencer*innen (Papaplatte)"],
    text: "Du hast das richtige gelesen, vielleicht ist es auch nur ein Bauchgefühl von dir. Irgendetwas muss sich ändern! Doch es passiert nicht. Hast du den Mut, die Probleme laut auszusprechen?",
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

// show / hide screens
function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Start
startBtn.addEventListener("click", () => {
  showScreen(blocks[0].id);
  renderBlock(0);
});

// Back / Next buttons (delegation)
document.addEventListener("click", (e) => {
  const back = e.target.closest(".btn-back");
  const next = e.target.closest(".btn-next");
  if (back) {
    const target = back.dataset.target;
    if (target) {
      showScreen(target);
    }
  }
  if (next) {
    const nextId = next.dataset.next;
    if (nextId === "result") {
      const valid = validateAllAnswered();
      if (!valid) {
        alert(
          "Bitte beantworte alle Fragen in allen Blöcken, bevor du abschließt."
        );
        return;
      }
      computeAndShowResults();
    } else {
      showScreen(nextId);
      const idx = blocks.findIndex((b) => b.id === nextId);
      if (idx >= 0) renderBlock(idx);
    }
  }
});

// Restart
restartBtn.addEventListener("click", () => {
  document
    .querySelectorAll('input[type="radio"]')
    .forEach((r) => (r.checked = false));
  document
    .querySelectorAll(".option.selected")
    .forEach((o) => o.classList.remove("selected"));
  finalLetters.textContent = "----";
  finalMessage.textContent = "";
  resultDetails.innerHTML = "";
  profileImage.innerHTML = "";
  showScreen("intro");
});

// render a block (index)
function renderBlock(blockIndex) {
  const block = blocks[blockIndex];
  const container = document.getElementById(`questions-${blockIndex + 1}`);
  if (!container) return;
  container.innerHTML = "";
  block.questions.forEach((qText, qIdx) => {
    const isLast = qIdx === block.questions.length - 1;
    const optionCount = isLast ? 6 : 7;
    const leftLabel =
      isLast && block.lastQuestionLabels
        ? block.lastQuestionLabels.left
        : "Ich stimme zu";
    const rightLabel =
      isLast && block.lastQuestionLabels
        ? block.lastQuestionLabels.right
        : "Ich stimme nicht zu";

    const qWrap = document.createElement("div");
    qWrap.className = "question";
    qWrap.innerHTML = `
      <div class="q-text">${qIdx + 1}. ${qText}</div>
      <div class="scale" data-block="${blockIndex}" data-q="${qIdx}">
        <div class="scale-row">
          <div class="scale-left-label" aria-hidden="true">${escapeHtml(
            leftLabel
          )}</div>
          <div class="options" role="radiogroup" aria-label="Antwortmöglichkeiten Frage ${
            qIdx + 1
          }">
            ${renderOptionsHtml(blockIndex, qIdx, optionCount)}
          </div>
          <div class="scale-right-label" aria-hidden="true">${escapeHtml(
            rightLabel
          )}</div>
        </div>
      </div>
    `;
    container.appendChild(qWrap);

    // click listeners
    qWrap.querySelectorAll(".option").forEach((opt) => {
      opt.addEventListener("click", () => {
        const name = opt.getAttribute("data-name");
        const parent = opt.closest(".question");
        const group = parent.querySelectorAll(`.option[data-name="${name}"]`);
        group.forEach((o) => o.classList.remove("selected"));
        opt.classList.add("selected");
        const input = parent.querySelector(
          `input[name="${name}"][value="${opt.dataset.value}"]`
        );
        if (input) input.checked = true;
      });
    });
  });
}

// render HTML for options with size scaling (optionCount: 7 or 6)
function renderOptionsHtml(blockIndex, qIdx, optionCount = 7) {
  let html = "";
  const name = `b${blockIndex}q${qIdx}`;
  const center = (optionCount - 1) / 2; // 3 for 7, 2.5 for 6
  for (let i = 0; i < optionCount; i++) {
    const dist = Math.abs(i - center);
    const mul = 1 + (MAX_MULT - 1) * (dist / center);
    const size = Math.round(BASE_SIZE * mul);
    html += `
      <label class="option" data-value="${i}" data-name="${name}" style="width:${size}px;height:${size}px;">
        <input type="radio" name="${name}" value="${i}" />
      </label>
    `;
  }
  return html;
}

// validate all answered: each block each question must have checked input
function validateAllAnswered() {
  for (let b = 0; b < blocks.length; b++) {
    for (let q = 0; q < blocks[b].questions.length; q++) {
      const sel = document.querySelector(`input[name="b${b}q${q}"]:checked`);
      if (!sel) return false;
    }
  }
  return true;
}

// Compute scores for each block and determine letters
function computeAndShowResults() {
  const letters = [];
  for (let b = 0; b < blocks.length; b++) {
    const block = blocks[b];
    let scorePrimary = 0;
    let scoreSecondary = 0;
    const qCount = block.questions.length; // 7

    for (let q = 0; q < qCount; q++) {
      const name = `b${b}q${q}`;
      const sel = document.querySelector(`input[name="${name}"]:checked`);
      const val = parseInt(sel.value, 10);
      const isLast = q === qCount - 1;
      if (!isLast) {
        // 7-option logic: center index = 3
        if (q <= 2) {
          if (val < CENTER_7) scorePrimary += POINTS_7[val];
          else if (val > CENTER_7) scoreSecondary += POINTS_7[val];
        } else {
          // q 3..5 inverted
          if (val < CENTER_7) scoreSecondary += POINTS_7[val];
          else if (val > CENTER_7) scorePrimary += POINTS_7[val];
        }
      } else {
        // special 6-option (no middle). left/right mapping: left->primary, right->secondary for q7
        // indices 0..5 mapped to POINTS_6
        if (val <= 2) {
          // left side (0,1,2)
          scorePrimary += POINTS_6[val];
        } else {
          // right side (3,4,5)
          scoreSecondary += POINTS_6[val];
        }
      }
    }

    if (scorePrimary > scoreSecondary) letters.push(block.primary);
    else if (scoreSecondary > scorePrimary) letters.push(block.secondary);
    else letters.push("X");
  }

  // If any X present -> undetermined result
  if (letters.includes("X")) {
    finalLetters.textContent = letters.join("");
    finalMessage.textContent =
      "Es konnte kein Ergebnis ermittelt werden. Versuche den Test noch mal!";
    resultDetails.innerHTML = "";
    profileImage.innerHTML = "";
    showScreen("result");
    return;
  }

  const code = letters.join("");
  finalLetters.textContent = code;
  finalMessage.textContent = "";

  // lookup profile
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

  // Bild anzeigen (falls vorhanden)
  profileImage.innerHTML = "";
  if (profile && profile.image) {
    // Bild-Datei liegt im Ordner "Bilder/" und ist .jpg
    // Beachte: Pfad ist case-sensitive auf GitHub Pages
    profileImage.innerHTML = `<img src="${profile.image}" alt="${escapeHtml(
      profile.title
    )}" loading="lazy">`;
  }

  resultDetails.innerHTML = html;
  showScreen("result");
}

// small helper to avoid HTML injection (basic)
function escapeHtml(s) {
  if (!s) return "";
  return s
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
