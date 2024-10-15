import React from "react";
import styles from "./SwipeCard.module.css";

interface SwipeCardProps {
  image: string;
  title: string;
  description: string;
  onSkip: () => void; // Prop to handle Skip button click
}

const SwipeCard: React.FC<SwipeCardProps> = ({
  image,
  title,
  description,
  onSkip,
}) => {
  return (
    <div className={styles.tinderCard}>
      <img src={image} alt={title} className={styles.cardImage} />
      <h3>{title}</h3>
      <p>{description}</p>

      {/* Add Skip Button */}
      <button className={styles.skipButton} onClick={onSkip}>
        Skip
      </button>

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
