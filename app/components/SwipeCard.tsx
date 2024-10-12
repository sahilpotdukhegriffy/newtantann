import React from "react";
import styles from "./SwipeCard.module.css";

// Define the props for SwipeCard
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
    </div>
  );
};

export default SwipeCard;
