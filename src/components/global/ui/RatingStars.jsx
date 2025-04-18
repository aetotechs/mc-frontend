import { StarIcon } from 'hugeicons-react';

const RatingStars = ({ length = 5, rating, filledColor = "orange", unFilledColor = "gray" }) => {
  return (
    <div className="flex text-orange-300">
        {Array.from({ length: length }).map((_, i) => {
            const starValue = i + 1;
            return (
                <StarIcon
                    key={i}
                    size={14}
                    fill={
                        starValue <= Math.floor(rating) ? 
                            filledColor : starValue - 0.5 === Math.round(rating)? 
                                "url(#halfStar)" : unFilledColor
                    }
                />
            );
        })}
    </div>
  )
}

export default RatingStars
