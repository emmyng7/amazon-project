import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";

function Rating({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }

  return (
    <div className="flex items-center gap-2">

      <div className="flex text-yellow-500 text-lg">
        {stars}
      </div>

      <span className="text-gray-600 text-sm">
        ({rating.toFixed(1)})
      </span>

    </div>
  );
}

export default Rating;