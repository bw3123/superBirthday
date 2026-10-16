const BASE = "https://raw.githubusercontent.com/bw3123/superBirthday/main/songs/";

// Songs
const audio = document.getElementById("audio");
const lyricsEl = document.getElementById("lyrics");
const player = document.getElementById("player");

document.querySelectorAll(".opt").forEach((btn) => {
  btn.addEventListener("click", async () => {
    document.querySelectorAll(".opt").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const n = btn.dataset.song;
    setSong(n);
    player.classList.remove("hidden");
    audio.play().catch(() => {});
    lyricsEl.textContent = "Loading lyrics...";
    lyricsEl.textContent = await loadLyrics(n);
  });
});

function setSong(n) {
  audio.pause();
  audio.innerHTML = "";
  const src = document.createElement("source");
  src.setAttribute("src", BASE + n + "/song.mp3");
  src.setAttribute("type", "audio/mpeg");
  audio.appendChild(src);
  audio.load();
}

async function loadLyrics(n) {
  for (const file of ["lyrics.mp3", "lyrics.txt"]) {
    try {
      const res = await fetch(BASE + n + "/" + file);
      if (res.ok) return await res.text();
    } catch (e) {}
  }
  return "Lyrics coming soon 💕";
}

// Redeem codes
const codes = {
  "starving": { text: "Here's where we're going 🍽️", map: "https://maps.app.goo.gl/U6itYHSSUAyExry97" },
  "4h5ap45p54545y564bi4": { text: "hi there" },
  "rth4d54a5y3b54ar5544a": { text: "h5i there" },
  "4n!1w4is5h465u65al4l6t": { text: "hi th4ere" },
  "h4e6h55a44p4p5i5n4es5s6i": { text: "hi the8re" },
  "n65th4e56w54or4l5d35c4": { text: "h8i there" },
  "u4s556y4o4u6d5e4se45r4ve56it": { text: "hi there", video: "6xIfyolbCJ8" },
};

const result = document.getElementById("result");
document.getElementById("redeem").addEventListener("submit", (e) => {
  e.preventDefault();
  const value = document.getElementById("code").value.trim();
  const match = codes[value] || codes[value.toLowerCase()];
  result.className = "";
  result.innerHTML = "";
  if (!match) {
    result.classList.add("error");
    result.innerHTML = "<p>Oops, that code isn't right. Try again 💌</p>";
    return;
  }
  const p = document.createElement("p");
  p.textContent = match.text;
  result.appendChild(p);
  if (match.map) {
    const a = document.createElement("a");
    a.href = match.map; a.target = "_blank"; a.rel = "noopener";
    a.textContent = "📍 Open the location";
    result.appendChild(a);
  }
  if (match.video) {
    const f = document.createElement("iframe");
    f.src = "https://www.youtube.com/embed/" + match.video;
    f.allow = "autoplay; encrypted-media; picture-in-picture";
    f.allowFullscreen = true;
    result.appendChild(f);
  }
});

// Floating hearts
const hearts = document.getElementById("hearts");
setInterval(() => {
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = ["⚛️", "🧬", "🔭", "⚗️", "🧪", "✨"][Math.floor(Math.random() * 6)];
  h.style.left = Math.random() * 100 + "vw";
  h.style.fontSize = 14 + Math.random() * 22 + "px";
  h.style.animationDuration = 6 + Math.random() * 6 + "s";
  hearts.appendChild(h);
  setTimeout(() => h.remove(), 13000);
}, 600);
