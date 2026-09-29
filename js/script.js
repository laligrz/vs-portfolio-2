/* ---------- Project data: edit titles, descriptions or add items here ---------- */
const PROJECTS = [
  { img: "16-event-ticket.jpg", title: "Race to Space 4 event ticket", desc: "Boarding-pass style ticket with QR code for Quanta Club's two-day space event at the University of Algiers 1.", cat: "print" },
  { img: "08-kids-series-1.jpg", title: "\"Did you know?\" series, cover", desc: "Scroll-stopping cover for a kids' science page, with a swipe cue for the carousel.", cat: "social" },
  { img: "09-kids-series-2.jpg", title: "\"Did you know?\" series, answer slide", desc: "Simple fact cards in a consistent frame so the series is recognisable in the feed.", cat: "social" },
  { img: "02-curie-program.jpg", title: "Little World workshops", desc: "Programme poster for Curie IT Club science workshops for ages 8 to 12, with QR registration.", cat: "print" },
  { img: "01-first-november.jpg", title: "1st November commemoration", desc: "Illustrated national-day post celebrating Algeria's history and its young generation.", cat: "social" },
  { img: "03-logo-curie-it.png", title: "Curie IT logo", desc: "Logo for a scientific club that simplifies physics and chemistry through experiments.", cat: "brand", logo: true },
  { img: "04-logo-pop-sci.png", title: "POP_SCI Darija logo", desc: "Logo for a science-simplification competition, combining a speech bubble, atom and DNA.", cat: "brand", logo: true },
  { img: "07-pop-sci-competition.jpg", title: "POP_SCI competition, 2nd edition", desc: "Announcement flyer explaining topics, two-round format and what participants learn.", cat: "print" },
  { img: "15-roller-banner.jpg", title: "Curie IT Club roll-up banner", desc: "Vertical banner for club stands and events, with social links and a QR code.", cat: "print" },
  { img: "06-school-program.jpg", title: "Small steps in a big world", desc: "Summer programme flyer for a school partnership, split by primary and middle levels.", cat: "print" },
  { img: "12-camp-flyer.jpg", title: "Little World camp flyer", desc: "Camp flyer for ages 9 to 12 combining entrepreneurship, experiments and English.", cat: "print" },
  { img: "11-support-courses.jpg", title: "Free support session", desc: "Announcement for a free physics and maths session for middle school students.", cat: "print" },
  { img: "05-space-coming-soon.jpg", title: "Space theme, coming soon", desc: "Teaser post with a glitch-text effect to build anticipation for a space-themed launch.", cat: "social" },
  { img: "10-ramadan-series.jpg", title: "Ramadan series for an association", desc: "Golden-on-plum seasonal post that keeps the association's colours and logo in place.", cat: "social" },
  { img: "13-diy-kit-1.jpg", title: "DIY kit post (sample design)", desc: "Sample Instagram post for Maher's educational kits, highlighting age, pieces and 3D format.", cat: "social", concept: true },
  { img: "14-diy-kit-2.jpg", title: "Play with Maher (sample design)", desc: "Sample lifestyle product post showing the kit in a child's room, with three action tags.", cat: "social", concept: true }
];

const LABELS = { social: "Social media", print: "Print & events", brand: "Brand identity" };
const grid = document.getElementById("grid");
let visible = [];
let current = 0;

function render(filter = "all") {
  visible = PROJECTS.filter(p => filter === "all" || p.cat === filter);
  grid.innerHTML = "";
  visible.forEach((p, i) => {
    const card = document.createElement("button");
    card.className = "card" + (p.logo ? " logo" : "");
    card.type = "button";
    card.setAttribute("aria-label", "Open " + p.title);
    card.innerHTML =
      `<div class="frame"><img src="images/${p.img}" alt="${p.title}" loading="lazy"></div>` +
      `<div class="meta"><h3>${p.title}</h3><p>${p.desc}</p><span class="tag ${p.cat}">${LABELS[p.cat]}</span>${p.concept ? '<span class="tag concept">Sample / not a client project</span>' : ""}</div>`;
    card.addEventListener("click", () => openBox(i));
    grid.appendChild(card);
  });
}

/* ---------- Filters ---------- */
document.querySelectorAll(".chip").forEach(chip => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("on"));
    chip.classList.add("on");
    render(chip.dataset.filter);
  });
});

/* ---------- Lightbox ---------- */
const box = document.getElementById("lightbox");
const boxImg = box.querySelector("img");
const boxCap = box.querySelector("figcaption");
let lastFocus = null;

function show(i) {
  current = (i + visible.length) % visible.length;
  const p = visible[current];
  boxImg.src = "images/" + p.img;
  boxImg.alt = p.title;
  boxCap.textContent = p.title + ": " + p.desc;
}
function openBox(i) {
  lastFocus = document.activeElement;
  show(i);
  box.hidden = false;
  document.body.style.overflow = "hidden";
  box.querySelector(".lb-close").focus();
}
function closeBox() {
  box.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus();
}
box.querySelector(".lb-close").addEventListener("click", closeBox);
box.querySelector(".prev").addEventListener("click", () => show(current - 1));
box.querySelector(".next").addEventListener("click", () => show(current + 1));
box.addEventListener("click", e => { if (e.target === box) closeBox(); });
document.addEventListener("keydown", e => {
  if (box.hidden) return;
  if (e.key === "Escape") closeBox();
  if (e.key === "ArrowLeft") show(current - 1);
  if (e.key === "ArrowRight") show(current + 1);
});

/* ---------- Contact form: opens the visitor's email app, no server needed ---------- */
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target;
  const note = document.getElementById("form-note");
  if (!f.checkValidity()) { note.textContent = "Please fill in all fields with a valid email."; return; }
  const subject = encodeURIComponent("Project enquiry from " + f.name.value);
  const body = encodeURIComponent(f.message.value + "\n\nFrom: " + f.name.value + " (" + f.email.value + ")");
  note.textContent = "Opening your email app...";
  window.location.href = `mailto:lallagaragouze@gmail.com?subject=${subject}&body=${body}`;
});

/* ---------- Init ---------- */
document.getElementById("count-works").textContent = PROJECTS.length;
document.getElementById("year").textContent = new Date().getFullYear();
render();
