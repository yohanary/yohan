const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const cursorGlow = document.getElementById("cursorGlow");

year.textContent = new Date().getFullYear();

menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("mousemove", (e) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener("click", (e) => e.preventDefault());
});


document.querySelectorAll(".copy-card").forEach(card => {
  card.addEventListener("click", async () => {
    const text = card.dataset.copy;
    const label = card.querySelector(".copy-label");

    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = "Copied!";
      setTimeout(() => {
        if (label) label.textContent = "Copy";
      }, 1400);
    } catch (err) {
      if (label) label.textContent = text;
    }
  });
});
