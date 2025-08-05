import { useParams } from "react-router-dom";

const TripDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Trip Details</h1>
      <p>This is trip number: {id}</p>
    </div>
  );
};

export default TripDetails;