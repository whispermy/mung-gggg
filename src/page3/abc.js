import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import imagesLoaded from "imagesloaded";

function CardCarousel() {
  const buttons = useRef({ prev: null, next: null });
  const cardsContainerEl = useRef(null);
  const appBgContainerEl = useRef(null);
  const cardInfosContainerEl = useRef(null);

  useEffect(() => {
    cardsContainerEl.current = document.querySelector(".cards__wrapper");
    buttons.current.prev = document.querySelector(".cardList__btn.btn--left");
    buttons.current.next = document.querySelector(".cardList__btn.btn--right");

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
        opacity: "0",
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
    const currentCardEl =
      cardsContainerEl.current.querySelector(".current--card");
    const previousCardEl =
      cardsContainerEl.current.querySelector(".previous--card");
    const nextCardEl = cardsContainerEl.current.querySelector(".next--card");
    const currentBgImageEl =
      appBgContainerEl.current.querySelector(".current--image");
    const previousBgImageEl =
      appBgContainerEl.current.querySelector(".previous--image");
    const nextBgImageEl =
      appBgContainerEl.current.querySelector(".next--image");

    changeInfo(direction);
    swapCardsClass();

    removeCardEvents(currentCardEl);

    function swapCardsClass() {
      currentCardEl.classList.remove("current--card");
      previousCardEl.classList.remove("previous--card");
      nextCardEl.classList.remove("next--card");
      currentBgImageEl.classList.remove("current--image");
      previousBgImageEl.classList.remove("previous--image");
      nextBgImageEl.classList.remove("next--image");
      currentCardEl.style.zIndex = "50";
      currentBgImageEl.style.zIndex = "50";

      if (direction === "left") {
        previousCardEl.style.zIndex = "20";
        previousBgImageEl.style.zIndex = "20";
        currentCardEl.style.transform = "translateY(-50vh)";
        currentBgImageEl.style.transform = "translateY(-50vh)";
        previousCardEl.style.transform = "translateY(-50vh)";
        previousBgImageEl.style.transform = "translateY(-50vh)";

        setTimeout(() => {
          nextCardEl.style.transform = "translateY(-50vh)";
          nextBgImageEl.style.transform = "translateY(-50vh)";
          currentCardEl.classList.add("next--card");
          previousCardEl.classList.add("current--card");
          nextCardEl.classList.add("previous--card");
          currentBgImageEl.classList.add("next--image");
          previousBgImageEl.classList.add("current--image");
          nextBgImageEl.classList.add("previous--image");
          currentCardEl.style.transform = "translateY(0)";
          currentBgImageEl.style.transform = "translateY(0)";
          previousCardEl.style.transform = "translateY(0)";
          previousBgImageEl.style.transform = "translateY(0)";
        }, 400);
      } else if (direction === "right") {
        nextCardEl.style.zIndex = "20";
        nextBgImageEl.style.zIndex = "20";
        currentCardEl.style.transform = "translateY(-50vh)";
        currentBgImageEl.style.transform = "translateY(-50vh)";
        nextCardEl.style.transform = "translateY(-50vh)";
        nextBgImageEl.style.transform = "translateY(-50vh)";

        setTimeout(() => {
          previousCardEl.style.transform = "translateY(-50vh)";
          previousBgImageEl.style.transform = "translateY(-50vh)";
          currentCardEl.classList.add("previous--card");
          previousCardEl.classList.add("next--card");
          nextCardEl.classList.add("current--card");
          currentBgImageEl.classList.add("previous--image");
          previousBgImageEl.classList.add("next--image");
          nextBgImageEl.classList.add("current--image");
          currentCardEl.style.transform = "translateY(0)";
          currentBgImageEl.style.transform = "translateY(0)";
          nextCardEl.style.transform = "translateY(0)";
          nextBgImageEl.style.transform = "translateY(0)";
        }, 400);
      }
    }

    function changeInfo(direction) {
      const currentInfoEl =
        cardInfosContainerEl.current.querySelector(".current--info");
      const previousInfoEl =
        cardInfosContainerEl.current.querySelector(".previous--info");
      const nextInfoEl =
        cardInfosContainerEl.current.querySelector(".next--info");

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
        translateY: "0",
        opacity: 1,
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
        currentInfoEl.classList.add("previous--info");
        previousInfoEl.classList.add("next--info");
        nextInfoEl.classList.add("current--info");
      }
    }

    function removeCardEvents(card) {
      const cardClone = card.cloneNode(true);
      card.parentNode.replaceChild(cardClone, card);
    }
  }

  function init() {
    const tl = gsap.timeline();

    tl.to([buttons.current.prev, buttons.current.next], {
      duration: 0.8,
      pointerEvents: "auto",
      opacity: "1",
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

    const currentCardEl =
      cardsContainerEl.current.querySelector(".current--card");
    const currentBgImageEl =
      appBgContainerEl.current.querySelector(".current--image");
    const currentInfoEl =
      cardInfosContainerEl.current.querySelector(".current--info");
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
              src="image1.jpg"
              alt="Background 1"
              className="app__bg-image-inner"
            />
          </div>
          <div className="app__bg-image previous--image">
            <img
              src="image2.jpg"
              alt="Background 2"
              className="app__bg-image-inner"
            />
          </div>
          <div className="app__bg-image next--image">
            <img
              src="image3.jpg"
              alt="Background 3"
              className="app__bg-image-inner"
            />
          </div>
        </div>
      </div>

      <div className="cards">
        <div className="cards__wrapper">
          <div className="card current--card">
            <img src="image1.jpg" alt="Card 1" className="card__image" />
          </div>
          <div className="card previous--card">
            <img src="image2.jpg" alt="Card 2" className="card__image" />
          </div>
          <div className="card next--card">
            <img src="image3.jpg" alt="Card 3" className="card__image" />
          </div>
        </div>

        <div className="card__info-container" ref={cardInfosContainerEl}>
          <div className="card__info current--info">
            <h2 className="text">Card 1</h2>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="card__info previous--info">
            <h2 className="text">Card 2</h2>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="card__info next--info">
            <h2 className="text">Card 3</h2>
            <p className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>

        <div className="cardList__nav">
          <button className="cardList__btn btn--left">
            <i className="fa fa-chevron-left"></i>
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
