/* -------------------- TEXT DATA -------------------- */

const answers_no = {
  english: [
    "No",
    "Are you sure?",
    "Are you really sure??",
    "Are you really really sure???",
    "Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, let's just start over.."
  ],
  french: [
    "Non",
    "Tu es sûr ?",
    "Tu es vraiment sûr ??",
    "Tu es vraiment vraiment sûr ???",
    "Réfléchis encore ?",
    "Tu ne crois pas aux deuxièmes chances ?",
    "Pourquoi tu es si froid ?",
    "Peut-être, on peut en parler ?",
    "Je ne vais pas demander encore une fois !",
    "Ok, maintenant ça me fait mal !",
    "Tu es juste méchant !",
    "Pourquoi tu me fais ça ?",
    "Donne-moi une chance !",
    "Je te supplie d'arrêter !",
    "Ok, recommençons.."
  ],
  thai: [
    "ไม่อ่ะ",
    "แน่ใจจริงๆหรอคะ?",
    "แน่ใจจริงๆ จริงๆนะคะ?",
    "แน่ใจสุดๆแล้วจริงๆใช่มั้ย?",
    "ลองคิดดูอีกทีนะคะ",
    "ขอโอกาสที่สองได้มั้ยคะ",
    "อย่าเย็นชาสิคะ",
    "ขอร้องนะคะ",
    "น้าาาา",
    "เราจะร้องไห้แล้วนะ",
    "ใจร้ายจัง",
    "ทำไมทำกับเราแบบนี้",
    "ขอโอกาสอีกครั้งนะ",
    "ขอร้องล่ะ",
    "โอเค งั้นเริ่มใหม่ก็ได้!"
  ]
};

const answers_yes = {
  english: "Yes",
  french: "Oui",
  thai: "เย่ คืนดีกันแล้วน้า"
};

/* -------------------- GLOBAL STATE -------------------- */

let language = "english";
let noIndex = 0;

/* -------------------- MAIN LOGIC -------------------- */

document.addEventListener("DOMContentLoaded", () => {
  const noBtn = document.getElementById("no-button");
  const yesBtn = document.getElementById("yes-button");
  const container = document.querySelector(".container");
  const banner = document.getElementById("banner");

  let tries = 0;
  let audioUnlocked = false;
  const popSound = new Audio("./public/sounds/pop.mp3");

  /* Unlock sound on first interaction (mobile-safe) */
  document.body.addEventListener(
    "touchstart",
    () => {
      if (!audioUnlocked) {
        popSound.play().then(() => popSound.pause());
        audioUnlocked = true;
      }
    },
    { once: true }
  );

  function moveNoButton() {
  const cRect = container.getBoundingClientRect();
  const bRect = noBtn.getBoundingClientRect();

  // Calculate max position within container
  const maxX = cRect.width - bRect.width;
  const maxY = cRect.height - bRect.height;

  // Random position but keep it inside container
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute"; // Ensure it can move freely
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Play sound if unlocked
  if (audioUnlocked) {
    popSound.currentTime = 0;
    popSound.play();
  }

  // Change NO text
  noIndex++;
  if (noIndex >= answers_no[language].length) noIndex = 0;
  noBtn.innerText = answers_no[language][noIndex];

  // playful guilt after some tries
  tries++;
  if (tries === 5) {
    noBtn.innerText = "Just say YES already 😜";
  }
}


  /* Events */
  noBtn.addEventListener("touchstart", moveNoButton);
  noBtn.addEventListener("mouseenter", moveNoButton);

  yesBtn.addEventListener("click", () => {
    banner.src = "public/images/yes.gif";
    refreshBanner();

    document.querySelector(".buttons").style.display = "none";
    document.querySelector(".message").style.display = "block";
  });
});

/* -------------------- HELPERS -------------------- */

function refreshBanner() {
  const banner = document.getElementById("banner");
  const src = banner.src;
  banner.src = "";
  banner.src = src;
}

/* -------------------- LANGUAGE SWITCH -------------------- */

function changeLanguage() {
  const select = document.getElementById("language-select");
  language = select.value;

  const question = document.getElementById("question-heading");
  const success = document.getElementById("success-message");

  if (language === "french") {
    question.textContent = "Tu veux être mon Valentin ?";
    success.textContent = "Yepppie, à bientôt :3";
  } else if (language === "thai") {
    question.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    success.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
  } else {
    question.textContent = "Will you be my Valentine?";
    success.textContent = "Yepppie, see you sooonnn :3";
  }

  document.getElementById("yes-button").innerText = answers_yes[language];
  document.getElementById("no-button").innerText = answers_no[language][0];
  noIndex = 0;
}
