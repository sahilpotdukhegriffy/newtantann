"use client";

import React, { useEffect } from "react";
import SwipeCard from "./SwipeCard";
import Hammer from "hammerjs"; // Ensure Hammer.js is imported
import styles from "./SwipeCard.module.css";

// Example data for the cards
const cardData = [
  {
    image: "https://placeimg.com/600/300/people",
    title: "Demo Card 1",
    description: "This is a demo for Tinder-like swipe cards",
  },
  {
    image: "https://placeimg.com/600/300/animals",
    title: "Demo Card 2",
    description: "This is a demo for Tinder-like swipe cards",
  },
  {
    image: "https://placeimg.com/600/300/nature",
    title: "Demo Card 3",
    description: "This is a demo for Tinder-like swipe cards",
  },
  {
    image: "https://placeimg.com/600/300/tech",
    title: "Demo Card 4",
    description: "This is a demo for Tinder-like swipe cards",
  },
];

const TinderCards: React.FC = () => {
  useEffect(() => {
    const allCards = document.querySelectorAll(`.${styles.tinderCard}`);
    const nopeButton = document.getElementById("nope");
    const loveButton = document.getElementById("love");

    // Ensure that buttons and cards exist before attaching event listeners
    if (!nopeButton || !loveButton || !allCards.length) {
      console.error("Cards or buttons are not available in the DOM.");
      return;
    }

    function initCards() {
      const newCards = document.querySelectorAll(
        `.${styles.tinderCard}:not(.removed)`
      );
      newCards.forEach((card, index) => {
        (card as HTMLElement).style.zIndex = (
          newCards.length - index
        ).toString();
        (card as HTMLElement).style.transform = `scale(${
          (20 - index) / 20
        }) translateY(-${30 * index}px)`;
        (card as HTMLElement).style.opacity = ((10 - index) / 10).toString();
      });
    }

    allCards.forEach((el) => {
      const hammer = new Hammer(el as HTMLElement);

      hammer.on("pan", (event: HammerInput) => {
        (el as HTMLElement).classList.add("moving");

        const xMulti = event.deltaX * 0.03;
        const yMulti = event.deltaY / 80;
        const rotate = xMulti * yMulti;

        event.target.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
      });

      hammer.on("panend", (event: HammerInput) => {
        (el as HTMLElement).classList.remove("moving");
        const moveOutWidth = document.body.clientWidth * 1.5; // Increased to move card further out
        const keep =
          Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        if (keep) {
          // Return card to original position if swipe is not strong enough
          (event.target as HTMLElement).style.transform = "";
        } else {
          // Move the card out of the screen fully
          const endX = moveOutWidth; // Large enough to ensure the card leaves the screen
          const toX = event.deltaX > 0 ? endX : -endX; // Right or left swipe
          const toY = event.deltaY; // Keep Y movement
          const rotate = event.deltaX * 0.03 * (event.deltaY / 80);

          // Move card out of view with rotation
          (
            event.target as HTMLElement
          ).style.transform = `translate(${toX}px, ${toY}px) rotate(${rotate}deg)`;
          (event.target as HTMLElement).classList.add("removed");
          initCards();
        }
      });
    });

    // Attach event listeners to the buttons for manual swipes
    const handleNopeClick = () => {
      const cards = document.querySelectorAll(
        `.${styles.tinderCard}:not(.removed)`
      );
      if (!cards.length) return;
      const card = cards[0] as HTMLElement;
      card.classList.add("removed");
      card.style.transform = "translate(-1000px, -100px) rotate(30deg)";
      initCards();
    };

    const handleLoveClick = () => {
      const cards = document.querySelectorAll(
        `.${styles.tinderCard}:not(.removed)`
      );
      if (!cards.length) return;
      const card = cards[0] as HTMLElement;
      card.classList.add("removed");
      card.style.transform = "translate(1000px, -100px) rotate(-30deg)";
      initCards();
    };

    nopeButton.addEventListener("click", handleNopeClick);
    loveButton.addEventListener("click", handleLoveClick);

    return () => {
      nopeButton.removeEventListener("click", handleNopeClick);
      loveButton.removeEventListener("click", handleLoveClick);
    };
  }, []); // Run the effect only once after the initial render

  return (
    <div className={styles.tinder}>
      <div className={styles.status}>
        <i className="fa fa-remove"></i>
        <i className="fa fa-heart"></i>
      </div>
      <div className={styles.cards}>
        {cardData.map((card, index) => (
          <SwipeCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
      <div className={styles.buttons}>
        <button id="nope">
          <i className="fa fa-remove"></i>
        </button>
        <button id="love">
          <i className="fa fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default TinderCards;
