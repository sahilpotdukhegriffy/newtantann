"use client";

import React, { useState, useEffect } from "react";
import SwipeCard from "./SwipeCard"; // Import the individual card component
import Hammer from "hammerjs";
import styles from "./SwipeCard.module.css";
import { griffyApi } from "../utils/griffyApi";
import { openHeaders } from "../utils/Header";

interface Poll {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

interface FeedResponse {
  polls: Poll[];
}

const TinderCards: React.FC = () => {
  const [eventData, setEventData] = useState<Poll[]>([]);

  useEffect(() => {
    getFeed(); // Fetch the events on component mount
  }, []);

  // Fetch data from the API (client-side only)
  const getFeed = async () => {
    try {
      griffyApi.setHeaders(openHeaders); // Ensure headers are set
      const response = await griffyApi.get<FeedResponse>("/feed/get");
      setEventData(response.data.polls); // Set the events data
      console.log(response);
    } catch (error) {
      console.error("Error fetching the feed:", error);
    }
  };

  // Handle swipe gestures and DOM manipulation client-side only
  useEffect(() => {
    if (typeof window === "undefined") return; // Ensure we are in the client

    const allCards = document.querySelectorAll(`.${styles.tinderCard}`);

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
      const heartIcon = el.querySelector(".heart-icon") as HTMLElement;
      const crossIcon = el.querySelector(".cross-icon") as HTMLElement;

      if (!heartIcon || !crossIcon) {
        console.error("Icons not found inside card");
        return;
      }

      // Hide the icons initially
      heartIcon.style.opacity = "0";
      crossIcon.style.opacity = "0";

      const hammer = new Hammer(el as HTMLElement);
      hammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });

      hammer.on("pan", (event: HammerInput) => {
        (el as HTMLElement).classList.add("moving");

        const swipeIntensity = Math.min(Math.abs(event.deltaX) / 100, 1);

        // Define the threshold (20px swipe movement or 20 degrees rotation)
        const threshold = 80;

        if (Math.abs(event.deltaX) > threshold) {
          if (event.deltaX > 0) {
            // Right swipe - Show heart icon
            heartIcon.style.opacity = "1";
            crossIcon.style.opacity = "0";
            heartIcon.style.transform = `translate(-50%, 0) scale(${
              0.5 + swipeIntensity * 0.5
            })`;
          } else if (event.deltaX < 0) {
            // Left swipe - Show cross icon
            crossIcon.style.opacity = "1";
            heartIcon.style.opacity = "0";
            crossIcon.style.transform = `translate(-50%, 0) scale(${
              0.5 + swipeIntensity * 0.5
            })`;
          }
        } else {
          // Hide the icons if movement is less than the threshold
          heartIcon.style.opacity = "0";
          crossIcon.style.opacity = "0";
        }

        // Allow vertical and horizontal movement but limit vertical movement to stay within the container
        const verticalLimit = 150; // Limit how far up or down the card can move
        const deltaY = Math.max(
          -verticalLimit,
          Math.min(event.deltaY, verticalLimit)
        );

        const rotateY = event.deltaX * 0.03; // Horizontal rotation
        const rotateX = event.deltaY * 0.03; // Vertical rotation

        // Apply horizontal and vertical translation with rotation
        event.target.style.transform = `translate(${event.deltaX}px, ${deltaY}px) rotate(${rotateY}deg) rotateX(${rotateX}deg)`;
      });

      hammer.on("panend", (event: HammerInput) => {
        (el as HTMLElement).classList.remove("moving");

        // Hide the icons when swipe ends
        heartIcon.style.opacity = "0";
        heartIcon.style.transform = "translate(-50%, 0) scale(0.5)";
        crossIcon.style.opacity = "0";
        crossIcon.style.transform = "translate(-50%, 0) scale(0.5)";

        const moveOutWidth = document.body.clientWidth * 1.5;
        const keep =
          Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        if (keep) {
          // Swipe was not strong enough, reset the card position
          (event.target as HTMLElement).style.transform = "";
          console.log("Card brought back to the center.");
        } else {
          // Log swipes based on direction
          if (event.deltaX > 0) {
            console.log("Swiped right");
          } else {
            console.log("Swiped left");
          }

          // Apply smooth and slow transition for swipe-out
          const endX = moveOutWidth;
          const toX = event.deltaX > 0 ? endX : -endX;
          const rotateY = event.deltaX * 0.03 * 0.5;
          const rotateX = Math.min(event.deltaX * 0.05, 10);

          // Add smooth transition with longer duration and ease-out effect
          (event.target as HTMLElement).style.transition =
            "transform 0.6s ease-in-out";
          event.target.style.transform = `translate(${toX}px, 0px) rotate(${rotateY}deg) rotateX(${rotateX}deg)`;
          (event.target as HTMLElement).classList.add("removed");
          initCards();
        }
      });
    });
  }, [eventData]); // Add eventData to the dependency array to re-run the effect when new data is fetched

  return (
    <div className={styles.tinder}>
      <div className={styles.cards}>
        {eventData.map((event) => (
          <SwipeCard
            key={event.id}
            image={event.image_url} // Render the image from the API response
            title={event.title} // Render the title from the API response
            description={event.description} // Render the description from the API response
          />
        ))}
      </div>
    </div>
  );
};

export default TinderCards;
