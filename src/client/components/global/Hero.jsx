const Hero = () => {
  return (
    <div className="bg-hero bg-cover  bg-center h-[70vh] flex justify-center items-center flex-col gap-5">
        
      <h3 className="font-extrabold text-[50px] leading-10 text-white">Discover the Easiest Way to Rent</h3>

      <div className="bg-white flex items-center justify-between rounded-[50px] py-3 px-4 divide-x gap-3">
        <div className="flex flex-col">
          <span className="font-medium text-sm">Location</span>
          <span>
            <span></span>
            <span className="font-medium text-base ">Search city or area</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span>Location</span>
          <span>
            <span></span>
            <span>Search city or area</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span>Location</span>
          <span>
            <span></span>
            <span>Search city or area</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span>Location</span>
          <span>
            <span></span>
            <span>Search city or area</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
