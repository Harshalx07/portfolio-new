import gsap from "gsap";
import { smoother } from "../Navbar";

// Custom char splitter (replaces the paid SplitText plugin)
function splitChars(selector: string | string[]): HTMLElement[] {
  const selectors = Array.isArray(selector) ? selector : [selector];
  const allChars: HTMLElement[] = [];
  selectors.forEach((sel) => {
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      const text = el.innerText;
      el.innerHTML = "";
      for (const char of text) {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.display = "inline-block";
        el.appendChild(span);
        allChars.push(span);
      }
    });
  });
  return allChars;
}

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");

  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  const landingChars = splitChars([
    ".landing-info h3",
    ".landing-intro h2",
    ".landing-intro h1",
  ]);

  gsap.fromTo(
    landingChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  const landingH2Chars = splitChars(".landing-h2-info");
  gsap.fromTo(
    landingH2Chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    ".landing-info-h2",
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );

  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  const landingH2InfoChars = splitChars(".landing-h2-info");
  const landingH2Info1Chars = splitChars(".landing-h2-info-1");
  const landingH21Chars = splitChars(".landing-h2-1");
  const landingH22Chars = splitChars(".landing-h2-2");

  LoopText(landingH2InfoChars, landingH2Info1Chars);
  LoopText(landingH21Chars, landingH22Chars);
}

function LoopText(chars1: HTMLElement[], chars2: HTMLElement[]) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  tl.fromTo(
    chars2,
    { opacity: 0, y: 80 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut",
      y: 0,
      stagger: 0.1,
      delay: delay,
    },
    0
  )
    .fromTo(
      chars1,
      { y: 80 },
      {
        duration: 1.2,
        ease: "power3.inOut",
        y: 0,
        stagger: 0.1,
        delay: delay2,
      },
      1
    )
    .fromTo(
      chars1,
      { y: 0 },
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay,
      },
      0
    )
    .to(
      chars2,
      {
        y: -80,
        duration: 1.2,
        ease: "power3.inOut",
        stagger: 0.1,
        delay: delay2,
      },
      1
    );
}
