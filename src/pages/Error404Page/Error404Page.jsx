import { Link } from "react-router-dom";
import notFound from "../../assets/not-found.png";

const Error404Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={notFound} alt="404 Not Found" className="w-1/2 mb-8" />
      <p className="text-lg mb-6">
        We can&apos;t seem to find the page you&apos;re looking for.
      </p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default Error404Page;
