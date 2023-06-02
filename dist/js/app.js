(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            } else {
                bodyUnlock();
                document.documentElement.classList.remove("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("mousemove", parallax);
    function parallax(event) {
        this.querySelectorAll(".mouse").forEach((shift => {
            const position = shift.getAttribute("value");
            const x = (window.innerWidth - event.pageX * position) / 90;
            const y = (window.innerHeight - event.pageY * position) / 90;
            shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
        }));
    }
    function reveal() {
        let reveals = document.querySelectorAll(".reveal");
        for (let i = 0; i < reveals.length; i++) {
            let windowHeight = window.innerHeight;
            let elementTop = reveals[i].getBoundingClientRect().top;
            let elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) reveals[i].classList.add("active"); else reveals[i].classList.remove("active");
        }
    }
    window.addEventListener("scroll", reveal);
    const UPBTN = document.querySelector(".footer__top__link");
    UPBTN.addEventListener("click", toUpWindow);
    function toUpWindow() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(".start__layer--left", {
        xPercent: 100,
        duration: 4,
        opacity: .9,
        scrollTrigger: {
            trigger: ".start__layer--left",
            start: "top center",
            end: "bottom center",
            scrub: false,
            pin: false
        }
    });
    gsap.to(".start__layer--right", {
        xPercent: -100,
        duration: 3,
        opacity: .9,
        scrollTrigger: {
            trigger: ".start__layer--right",
            start: "top center",
            end: "bottom center",
            scrub: false,
            pin: false
        }
    });
    gsap.timeline({
        delay: 15,
        scrollTrigger: {
            trigger: ".about__title",
            start: "top top",
            end: "+=10",
            scrub: 1,
            pin: true
        }
    }).to(".about__title", {
        x: -100,
        opacity: 0
    });
    window["FLS"] = true;
    isWebp();
    menuInit();
})();