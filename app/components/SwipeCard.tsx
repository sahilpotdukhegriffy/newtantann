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
      {/* Card Image */}
      <img src={image} alt={title} className={styles.cardImage} />

      {/* Card Title and Description */}
      <h3>{title}</h3>
      <p>{description}</p>

      {/* YES and NO Buttons */}
      <div className={styles.buttonsContainer}>
        <button className={`${styles.button} ${styles.no}`}>
          <span>NO</span>
          <span>Potential Payout x1.75</span>
        </button>
        <button className={`${styles.button} ${styles.yes}`}>
          <span>YES</span>
          <span>Potential Payout x1.75</span>
        </button>
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
