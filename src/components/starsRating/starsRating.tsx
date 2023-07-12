"use client";
import { useState } from "react";
import styles from "./starsRating.module.css";

interface IStars {
  rating: number;
  onSetRating: (newRating: number) => void;
}

export function StarsRating({ onSetRating, rating }: IStars) {
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredStars(index);
  };

  const handleMouseLeave = () => {
    setHoveredStars(0);
  };

  const handleClick = (index: number) => {
    onSetRating(index);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 4; i++) {
      let starClassName = styles.star;

      if (i <= hoveredStars) {
        starClassName += ` ${styles.hover}`;
        if (i <= rating) {
          starClassName += ` ${styles.active}`;
        }
      } else if (i <= rating) {
        starClassName += ` ${styles.active}`;
      }

      stars.push(
        <span
          key={i}
          className={starClassName}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
        >
          &#9733;
        </span>
      );
    }

    return stars;
  };

  return <div className={styles.ratingStars}>{renderStars()}</div>;
};

