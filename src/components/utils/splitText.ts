import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  splitChars?: HTMLElement[];
}

// Custom SplitText replacement: splits element text into <span> chars
function splitIntoChars(el: HTMLElement): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  const chars: HTMLElement[] = [];
  for (const char of text) {
    const span = document.createElement("span");
    span.textContent = char;
    span.style.display = "inline-block";
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}

function splitIntoWords(el: HTMLElement): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  const words: HTMLElement[] = [];
  text.split(" ").forEach((word, i, arr) => {
    const span = document.createElement("span");
    span.textContent = i < arr.length - 1 ? word + "\u00A0" : word;
    span.style.display = "inline-block";
    el.appendChild(span);
    words.push(span);
  });
  return words;
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    if (para.anim) {
      para.anim.progress(1).kill();
    }
    // Restore original text before re-splitting
    if (para.splitChars && para.splitChars.length > 0) {
      const text = para.splitChars.map((s) => s.textContent).join("");
      para.innerHTML = text;
    }

    const words = splitIntoWords(para);
    para.splitChars = words;

    para.anim = gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title: ParaElement) => {
    if (title.anim) {
      title.anim.progress(1).kill();
    }
    if (title.splitChars && title.splitChars.length > 0) {
      const text = title.splitChars.map((s) => s.textContent).join("");
      title.innerHTML = text;
    }

    const chars = splitIntoChars(title);
    title.splitChars = chars;

    title.anim = gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
