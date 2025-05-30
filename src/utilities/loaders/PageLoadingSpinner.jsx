import Spinner from "./Spinner";

const PageLoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner/>
      {/* <span className="w-8 h-8 border-8 border-dotted border-gray-400 rounded-full animate-spin-slow"></span> */}
    </div>
  );
};

export default PageLoadingSpinner;
