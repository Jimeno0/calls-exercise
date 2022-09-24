import { CallDetail } from "components/CallDetail";
import { useParams } from "react-router-dom";

export const DetailView = () => {
  const { id } = useParams();
  return <CallDetail id={id} />;
};
