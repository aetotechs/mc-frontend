const Hero = () => {
  return (
    <div className="bg-hero bg-cover relative  bg-center h-[70vh] flex justify-center items-center flex-col gap-5">
              <div className="absolute inset-0 bg-black opacity-30"></div>

      <h3 className="font-extrabold text-[50px] leading-[60px] text-white">Discover the Easiest Way to Rent</h3>

      <div className="bg-white flex items-center justify-between rounded-[50px] py-3 px-4 divide-x gap-3">
        <div className="flex flex-col px-4">
          <span className="font-medium text-sm">Location</span>
          <span>
            <span></span>
            <span className="font-medium text-[15px] text-[#8B8D98]">Search city or area</span>
          </span>
        </div>
        <div className="flex flex-col px-4">
          <span className="font-medium text-sm">Property</span>
          <span>
            <span></span>
            <span className="font-medium text-[15px] text-[#8B8D98]">Select property type</span>
          </span>
        </div>
        <div className="flex flex-col px-4">
          <span className="font-medium text-sm">Price</span>
          <span>
            <span></span>
            <span className="font-medium text-[15px] text-[#8B8D98]">Choose price range</span>
          </span>
        </div>
        <div className="flex flex-col px-4">
          <span className="font-medium text-sm">Location</span>
          <span>
            <span></span>
            <span className="font-medium text-[15px] text-[#8B8D98]">Search city or area</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
