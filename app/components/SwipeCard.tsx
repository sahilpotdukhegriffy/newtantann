import React from "react";
import styles from "./SwipeCard.module.css";

interface SwipeCardProps {
  image: string;
  title: string;
  description: string;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ image, title, description }) => {
  return (
    <div className={styles.tinderCard}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>

      {/* Heart and Cross Icons */}
      <div className="heart-icon">
        <i className="fas fa-heart"></i>
      </div>
      <div className="cross-icon">
        <i className="fas fa-times"></i>
      </div>
    </div>
  );
};

export default SwipeCard;
