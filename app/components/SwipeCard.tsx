"use client";

import React from "react";
import Image from "next/image";
import styles from "./SwipeCard.module.css";

interface SwipeCardProps {
  image: string;
  title: string;
  description: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ image, title, description }) => {
  return (
    <div className={styles.tinderCard}>
      {/* Use Next.js Image component instead of <img> */}
      <Image
        src={image}
        alt={title}
        width={600} // Example width, adjust according to your needs
        height={400} // Example height, adjust according to your needs
        className={styles.cardImage}
      />

      <h3>{title}</h3>
      <p>{description}</p>

      <div className={styles.buttonsContainer}>
        <button className={`${styles.button} ${styles.no}`}>NO</button>
        <button className={`${styles.button} ${styles.yes}`}>YES</button>
      </div>

      {/* Heart and Cross Icons */}
      <div className={`${styles.heartIcon} heart-icon`}>
        <i className="fas fa-heart"></i> {/* FontAwesome Heart Icon */}
      </div>
      <div className={`${styles.crossIcon} cross-icon`}>
        <i className="fas fa-times"></i> {/* FontAwesome Cross Icon */}
      </div>
    </div>
  );
};

export default SwipeCard;
