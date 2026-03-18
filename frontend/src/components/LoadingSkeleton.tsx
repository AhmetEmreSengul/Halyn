const LoadingSkeleton = () => {
  return (
    <div className="w-full md:w-105 h-110 animate-pulse bg-neutral-300 rounded-xl justify-between overflow-hidden">
      <div className="w-full h-30 animate-pulse bg-neutral-300"></div>
      <div className="w-full h-30 animate-pulse bg-neutral-200"></div>
      <div className="w-full h-20 animate-pulse bg-neutral-300"></div>
    </div>
  );
};

export default LoadingSkeleton;
