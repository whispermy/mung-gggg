import { gsap } from "gsap";
import imagesLoaded from "imagesloaded";
import React, { useEffect, useRef } from "react";

function CardCarousel() {
  const buttons = useRef({ prev: null, next: null });
  const cardsContainerEl = useRef(null);
  const appBgContainerEl = useRef(null);
  const cardInfosContainerEl = useRef(null);

  useEffect(() => {
    cardsContainerEl.current = document.querySelector(".cards__wrapper");
    buttons.current.prev = document.querySelector(".btn--left");
    buttons.current.next = document.querySelector(".btn--right");

    const prevButton = buttons.current.prev;
    const nextButton = buttons.current.next;

    prevButton.addEventListener("click", () => swapCards("left"));
    nextButton.addEventListener("click", () => swapCards("right"));

    return () => {
      prevButton.removeEventListener("click", () => swapCards("left"));
      nextButton.removeEventListener("click", () => swapCards("right"));
    };
  }, []);

  useEffect(() => {
    const waitForImages = () => {
      const images = [...document.querySelectorAll("img")];
      const totalImages = images.length;
      let loadedImages = 0;
      const loaderEl = document.querySelector(".loader span");

      gsap.set(cardsContainerEl.current.children, {
        "--card-translateY-offset": "100vh",
      });
      gsap.set(
        cardInfosContainerEl.current
          .querySelector(".current--info")
          .querySelectorAll(".text"),
        {
          translateY: "40px",
          opacity: 0,
        }
      );
      gsap.set([buttons.current.prev, buttons.current.next], {
        pointerEvents: "none",
        opacity: "100%",
      });

      images.forEach((image) => {
        imagesLoaded(image, (instance) => {
          if (instance.isComplete) {
            loadedImages++;
            let loadProgress = loadedImages / totalImages;

            gsap.to(loaderEl, {
              duration: 1,
              scaleX: loadProgress,
              backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%)`,
            });

            if (totalImages === loadedImages) {
              gsap
                .timeline()
                .to(".loading__wrapper", {
                  duration: 0.8,
                  opacity: 0,
                  pointerEvents: "none",
                })
                .call(() => init());
            }
          }
        });
      });
    };
    waitForImages();
    init();
  }, []);

  function swapCards(direction) {
    const currentCardEl = cardsContainerEl.current.querySelector(".current--card");
    const previousCardEl = cardsContainerEl.current.querySelector(".previous--card");
    const nextCardEl = cardsContainerEl.current.querySelector(".next--card");
    const currentBgImageEl = appBgContainerEl.current.querySelector(".current--image");
    const previousBgImageEl = appBgContainerEl.current.querySelector(".previous--image");
    const nextBgImageEl = appBgContainerEl.current.querySelector(".next--image");

    changeInfo(direction);
    swapCardsClass();

    removeCardEvents(currentCardEl);
    removeCardEvents(previousCardEl);
    removeCardEvents(nextCardEl);

    addCardEvents(currentCardEl);
    addCardEvents(previousCardEl);
    addCardEvents(nextCardEl);

    function swapCardsClass() {
      currentCardEl.classList.remove("current--card");
      previousCardEl.classList.remove("previous--card");
      nextCardEl.classList.remove("next--card");

      currentBgImageEl.classList.remove("current--image");
      previousBgImageEl.classList.remove("previous--image");
      nextBgImageEl.classList.remove("next--image");

      currentCardEl.style.zIndex = "50";

      if (direction === "left") {
        nextCardEl.style.zIndex = "20";
        previousCardEl.style.zIndex = "40";

        currentCardEl.classList.add("next--card");
        previousCardEl.classList.add("current--card");
        nextCardEl.classList.add("previous--card");

        currentBgImageEl.classList.add("next--image");
        previousBgImageEl.classList.add("current--image");
        nextBgImageEl.classList.add("previous--image");
      } else if (direction === "right") {
        previousCardEl.style.zIndex = "20";
        nextCardEl.style.zIndex = "40";

        currentCardEl.classList.add("previous--card");
        previousCardEl.classList.add("next--card");
        nextCardEl.classList.add("current--card");

        currentBgImageEl.classList.add("previous--image");
        previousBgImageEl.classList.add("next--image");
        nextBgImageEl.classList.add("current--image");
      }
    }

    gsap.to(cardsContainerEl.current.children, {
      duration: 1.2,
      translateX: direction === "left" ? "60%" : "-60%",
      rotate: direction === "left" ? "-10deg" : "10deg",
      ease: "power4.inOut",
      stagger: {
        amount: 0.4,
      },
      onComplete: () => {
        gsap.set(cardsContainerEl.current.children, {
          "--card-translateY-offset": "100vh",
          rotate: 0,
          translateX: 0,
        });
        gsap.set(currentCardEl, { zIndex: "30" });

        addCardEvents(currentCardEl);

        cardsContainerEl.current.appendChild(currentCardEl);
        cardsContainerEl.current.appendChild(previousCardEl);
        cardsContainerEl.current.appendChild(nextCardEl);

        appBgContainerEl.current.appendChild(currentBgImageEl);
        appBgContainerEl.current.appendChild(previousBgImageEl);
        appBgContainerEl.current.appendChild(nextBgImageEl);
      },
    });
  }

  function changeInfo(direction) {
    const currentInfoEl = cardInfosContainerEl.current.querySelector(".current--info");
    const previousInfoEl =  cardInfosContainerEl.current.querySelector(".previous--info");
    const nextInfoEl =  cardInfosContainerEl.current.querySelector(".next--info");

    const currentTextEls = currentInfoEl.querySelectorAll(".text");
    const previousTextEls = previousInfoEl.querySelectorAll(".text");
    const nextTextEls = nextInfoEl.querySelectorAll(".text");

    gsap.to(currentTextEls, {
      duration: 0.3,
      translateY: "40px",
      opacity: 0,
      stagger: 0.1,
    });
  
    gsap.to(previousTextEls, {
      duration: 0.3,
      translateY: "0",
      opacity: 1,
      stagger: 0.1,
    });
  
    gsap.to(nextTextEls, {
      duration: 0.3,
      translateY: "40px",
      opacity: 0,
      stagger: 0.1,
    });

    currentInfoEl.classList.remove("current--info");
    previousInfoEl.classList.remove("previous--info");
    nextInfoEl.classList.remove("next--info");

    if (direction === "left") {
      currentInfoEl.classList.add("next--info");
      previousInfoEl.classList.add("current--info");
      nextInfoEl.classList.add("previous--info");
    } else if (direction === "right") {
      previousInfoEl.classList.add("next--info");
      nextInfoEl.classList.add("current--info");
      currentInfoEl.classList.add("previous--info");
    }
  }

  function removeCardEvents(card) {
    card.removeEventListener("mouseenter", handleCardMouseEnter);
    card.removeEventListener("mouseleave", handleCardMouseLeave);
  }

  function addCardEvents(card) {
    card.addEventListener("mouseenter", handleCardMouseEnter);
    card.addEventListener("mouseleave", handleCardMouseLeave);
  }

  function handleCardMouseEnter(event) {
    const card = event.currentTarget;
    const info = card.querySelector(".text");
  
    gsap.to(info, {
      duration: 0.4,
      translateY: "0",
      opacity: 1,
      ease: "power3.out",
    });
  
    gsap.to(card, {
      duration: 0.4,
      scale: 1.03,
      ease: "power3.out",
    });
  
    gsap.to(card, {
      "--card-translateY-offset": "0",
      duration: 1,
      ease: "elastic.out(1, 0.8)",
    });
  
    gsap.to(appBgContainerEl.current, {
      duration: 1,
      scale: 1.03,
      ease: "elastic.out(1, 0.8)",
    });
  
    gsap.to(cardInfosContainerEl.current, {
      duration: 0.8,
      opacity: 0,
      onComplete: () => {
        cardInfosContainerEl.current.classList.add("no-pointer-events");
      },
    });
  }
  
  function handleCardMouseLeave(event) {
    const card = event.currentTarget;
    const info = card.querySelector(".text");
  
    gsap.to(info, {
      duration: 0.4,
      translateY: "40px",
      opacity: 0,
      ease: "power3.out",
    });
  
    gsap.to(card, {
      duration: 0.4,
      scale: 1,
      ease: "power3.out",
    });
  
    gsap.to(card, {
      "--card-translateY-offset": "100vh",
      duration: 0.8,
      ease: "power4.out",
    });
  
    gsap.to(appBgContainerEl.current, {
      duration: 0.8,
      scale: 1,
      ease: "power4.out",
    });
  
    gsap.to(cardInfosContainerEl.current, {
      duration: 0.8,
      opacity: 1,
      onStart: () => {
        cardInfosContainerEl.current.classList.remove("no-pointer-events");
      },
    });
  }
  

  function init() {
    const tl = gsap.timeline();

    tl.to([buttons.current.prev, buttons.current.next], {
      duration: 0.8,
      pointerEvents: "auto",
      opacity: "100%",
    }).to(
      cardsContainerEl.current.children,
      {
        duration: 1.2,
        ease: "Power4.easeOut",
        "--card-translateY-offset": "0",
        stagger: 0.1,
      },
      "-=0.6"
    );

    const currentCardEl = cardsContainerEl.current.querySelector(".current--card");
    const currentBgImageEl = appBgContainerEl.current.querySelector(".current--image");
    const currentInfoEl = cardInfosContainerEl.current.querySelector(".current--info");
    const currentTextEls = currentInfoEl.querySelectorAll(".text");

    gsap.set(currentTextEls, {
      translateY: "40px",
      opacity: 0,
    });

    gsap.to(currentTextEls, {
      duration: 0.8,
      delay: 0.6,
      translateY: "0",
      opacity: 1,
      stagger: 0.1,
    });

    currentCardEl.classList.add("current--card");
    currentBgImageEl.classList.add("current--image");
    currentInfoEl.classList.add("current--info");
  }

  return (
    <div className="carousel">
      <div className="app__bg">
        <div className="app__bg-container" ref={appBgContainerEl}>
          <div className="app__bg-image current--image">
            <img
              src="https://source.unsplash.com/Z8dtTatMVMw"
              alt="Background 1"
              className="app__bg-image-inner"
            />
          </div>
          <div className="app__bg-image previous--image">
            <img
              src="https://source.unsplash.com/9dmycbFE7mQ"
              alt="Background 2"
              className="app__bg-image-inner"
            />
          </div>
          <div className="app__bg-image next--image">
            <img
              src="https://source.unsplash.com/m7K4KzL5aQ8"
              alt="Background 3"
              className="app__bg-image-inner"
            />
          </div>
        </div>
      </div>

      <div className="cards">
        <div className="cards__wrapper">
          <div className="card current--card" ref={cardsContainerEl.current}>
            <img src="https://source.unsplash.com/Z8dtTatMVMw" alt="Card 1" className="card__image" />
          </div>
          <div className="card previous--card">
            <img src="https://source.unsplash.com/9dmycbFE7mQ" alt="Card 2" className="card__image" />
          </div>
          <div className="card next--card">
            <img src="https://source.unsplash.com/m7K4KzL5aQ8" alt="Card 3" className="card__image" />
          </div>
        </div>

        <div className="card__info-container" ref={cardInfosContainerEl}>
          <div className="current--info">
            <h2 className="text">Card 1</h2>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="previous--info">
            <h2 className="text">Card 2</h2>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="next--info">
            <h2 className="text">Card 3</h2>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        <div className="cardList__nav">
          <button className="cardList__btn btn--left">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button className="cardList__btn btn--right">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="loader">
        <span></span>
      </div>
    </div>
  );
}

export default CardCarousel;
