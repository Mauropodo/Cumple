/* global gsap, ScrollTrigger */

if (window.gsap) {
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const media = gsap.matchMedia();

  media.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      mobile: "(max-width: 720px)",
      desktop: "(min-width: 721px)"
    },
    (context) => {
      const { reduceMotion, mobile, desktop } = context.conditions;
      const duration = reduceMotion ? 0 : 0.9;
      const entranceY = mobile ? 18 : 28;

      const timeline = gsap.timeline({ defaults: { duration, ease: "power3.out" } });
      timeline
        .from(".background--clouds, .background--texture", { autoAlpha: 0, duration: reduceMotion ? 0 : 1.1 })
        .from(".poster-stage", { autoAlpha: 0, scale: 0.975, transformOrigin: "center center" }, "-=0.5")
        .from(".cloud, .sun, .tarot", { autoAlpha: 0, y: entranceY, scale: 0.96, stagger: 0.055 }, "-=0.55")
        .from(".eyebrow, .divider--hero", { autoAlpha: 0, y: entranceY, stagger: 0.1 }, "-=0.45")
        .from(".birthday-title > img, .title-line img", { autoAlpha: 0, y: entranceY, stagger: 0.09 }, "-=0.42")
        .from(".hero-message", { autoAlpha: 0, y: entranceY }, "-=0.4")
        .from(".detail", { autoAlpha: 0, y: entranceY, stagger: 0.12 }, "-=0.22")
        .from(".detail-separator", { autoAlpha: 0, scaleY: 0, transformOrigin: "center top" }, "<+0.12")
        .from(".contact", { autoAlpha: 0, y: entranceY }, "-=0.3");

      if (!reduceMotion) {
        gsap.to(".sparkles", { rotation: 6, transformOrigin: "center", duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
        gsap.to(".constellation--top", { x: 10, y: 5, duration: 5.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

        if (mobile) {
          gsap.to(".sun", { y: -5, rotation: -1.2, transformOrigin: "center", duration: 4.6, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".tarot", { x: -5, y: 6, rotation: 0.8, transformOrigin: "center", duration: 5.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".cloud--top-left, .cloud--bottom-right", { y: -5, duration: 5.1, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.3 });
          gsap.to(".cloud--top-right, .cloud--bottom-left, .cloud--bottom-middle", { y: 4, duration: 5.7, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.25 });

          const chevrons = gsap.utils.toArray(".mobile-chevron");
          if (chevrons.length) {
            gsap.set(chevrons, { autoAlpha: 0, y: -3 });
            gsap.timeline({ repeat: -1, repeatDelay: 0.25 })
              .to(chevrons, { autoAlpha: 1, y: 2, duration: 0.35, stagger: 0.18, ease: "power1.out" })
              .to(chevrons, { autoAlpha: 0, y: 5, duration: 0.3, stagger: 0.18, ease: "power1.in" }, "+=0.25")
              .set(chevrons, { y: -3 });
          }
        }

        if (desktop) {
          // Independent, low-amplitude movement gives the HD artwork depth without changing its layout.
          gsap.to(".background--clouds", {
            xPercent: -2.2,
            yPercent: 1.2,
            scale: 1.09,
            transformOrigin: "center center",
            duration: 12,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
          });
          gsap.to(".poster-stage", { scale: 1.003, transformOrigin: "center center", duration: 4.8, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".sun", { rotation: -2, y: -9, transformOrigin: "center", duration: 5.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".tarot", { x: -9, y: 12, rotation: 1.1, transformOrigin: "center", duration: 6.4, yoyo: true, repeat: -1, ease: "sine.inOut" });
          gsap.to(".cloud--top-left, .cloud--bottom-right", { y: -9, duration: 5.7, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.35 });
          gsap.to(".cloud--top-right, .cloud--bottom-left, .cloud--bottom-middle", { y: 8, duration: 6.3, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.28 });
          gsap.to(".dust", { autoAlpha: 0.45, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut", stagger: 0.5 });
          gsap.to(".birthday-title", { scale: 1.012, transformOrigin: "center", duration: 3.8, yoyo: true, repeat: -1, ease: "sine.inOut" });

          if (window.ScrollTrigger) {
            const parallax = {
              trigger: ".invitation",
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            };

            gsap.to(".background--clouds", {
              x: 48,
              y: -86,
              ease: "none",
              scrollTrigger: parallax
            });
            gsap.to(".background--texture", {
              x: 14,
              y: -26,
              ease: "none",
              scrollTrigger: { ...parallax }
            });
          }
        }
      }
    }
  );
}
