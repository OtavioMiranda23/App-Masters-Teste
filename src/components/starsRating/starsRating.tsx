import { useState } from "react";
import styles from "./starsRating.module.css";

interface IStars {
  totalStars: number;
}

export function StarsRating({ totalStars }: IStars) {
  const [hoveredStars, setHoveredStars] = useState(0);
  const [selectedStars, setSelectedStars] = useState(0);

  const handleMouseEnter = (index: number) => {
    setHoveredStars(index);
  };

  const handleMouseLeave = () => {
    setHoveredStars(0);
  };

  const handleClick = (index: number) => {
    setSelectedStars(index);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      let starClassName = styles.star;

      if (i <= hoveredStars) {
        starClassName += ` ${styles.active}`;
      } else if (i <= selectedStars) {
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

