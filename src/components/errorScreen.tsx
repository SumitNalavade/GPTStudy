import Navbar from "./navbar";

const ErrorScreen: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-full ">
        <div className="max-w-2xl">
          <img src="https://cdn.svgator.com/images/2022/01/funny-404-error-page-design.gif" alt="" />
        </div>

        <div className="w-full text-center">
          <h2 className="text-6xl font-bold mb-4">Something Went Wrong</h2>
          <p className="text-4xl">Please try again later</p>
        </div>
      </div>
    </>
  );
};

export default ErrorScreen;
