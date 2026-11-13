"use client";

import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const EASE = "power3.out";

export function Motion() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = document.documentElement;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        root.classList.remove("motion");
        return;
      }

      const trigger = (el: Element) => ({ trigger: el, start: "top 88%", once: true });
      const delay = (el: Element) => Number((el as HTMLElement).dataset.delay ?? 0);
      const show = (el: Element) => gsap.set(el, { visibility: "visible" });

      gsap.utils.toArray<HTMLElement>("[data-reveal='fade']").forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1.1, ease: EASE, delay: delay(el), scrollTrigger: trigger(el) });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='stagger']").forEach((el) => {
        show(el);
        gsap.from(el.children, { autoAlpha: 0, y: 28, duration: 1, ease: EASE, stagger: 0.09, delay: delay(el), scrollTrigger: trigger(el) });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='thread']").forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, visibility: "visible" }, { scaleX: 1, duration: 1.6, ease: "power2.inOut", scrollTrigger: trigger(el) });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='img']").forEach((el) => {
        const img = el.querySelector("img");
        const from = el.dataset.from === "left" ? "inset(0 100% 0 0)" : "inset(100% 0 0 0)";
        const tl = gsap.timeline({ delay: delay(el), scrollTrigger: trigger(el) });
        tl.fromTo(el, { clipPath: from, visibility: "visible" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.inOut" });
        if (img) tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.9, ease: "expo.out" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='lines']").forEach((el) => {
        show(el);
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.09, delay: delay(el), scrollTrigger: trigger(el) }),
        });
      });

      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 10);
          gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        });

        document.querySelectorAll<HTMLElement>("[data-pin='artistry']").forEach((section) => {
          const steps = section.querySelectorAll("[data-step]");
          const imgs = section.querySelectorAll("[data-step-img]");
          gsap.set(imgs, { autoAlpha: 0 });
          gsap.set(imgs[0], { autoAlpha: 1 });
          gsap.set([...steps].slice(1), { autoAlpha: 0.25 });
          const tl = gsap.timeline({ scrollTrigger: { trigger: section, start: "top top", end: `+=${steps.length * 70}%`, scrub: 0.6, pin: true } });
          for (let i = 1; i < steps.length; i++) {
            tl.to(imgs[i], { autoAlpha: 1, duration: 1 }, i)
              .fromTo(imgs[i].querySelector("img"), { scale: 1.12 }, { scale: 1, duration: 1.4 }, i)
              .to(steps[i - 1], { autoAlpha: 0.25, duration: 0.6 }, i)
              .to(steps[i], { autoAlpha: 1, duration: 0.6 }, i);
          }
          tl.to({}, { duration: 0.6 });
        });

        document.querySelectorAll<HTMLElement>("[data-rail]").forEach((section) => {
          const track = section.querySelector<HTMLElement>("[data-rail-track]");
          if (!track) return;
          const distance = () => Math.max(0, track.scrollWidth - section.clientWidth);
          gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: { trigger: section, start: "top top", end: () => `+=${distance()}`, scrub: 0.5, pin: true, invalidateOnRefresh: true },
          });
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-hero-out]").forEach((el) => {
        gsap.to(el, { yPercent: -18, autoAlpha: 0.2, ease: "none", scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true } });
      });
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
