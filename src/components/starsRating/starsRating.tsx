import { useState } from "react";
import Image from "next/image";
import styles from "./starsRating.module.css"

export function StarsRating() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>();
  return (
    <div className={styles.container}>
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
            className={styles.input}
              type="radio"
              value={currentRating}
              onClick={() => setRating(currentRating)}
            />
            <Image
              src="/star.svg"
              alt={`${currentRating} stars`}
              width={25}
              height={25}
              priority
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
              className={styles.star}
            />
          </label>
        );
      })}
    </div>
  );
}
