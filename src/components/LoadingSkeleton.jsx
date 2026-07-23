function LoadingSkeleton() {
  return (
    <div className="bg-[#eaeded] min-h-screen">
      <div className="h-[400px] bg-gray-300 animate-pulse"></div>

      <div className="max-w-[1500px] mx-auto px-4 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow"
            >
              <div className="h-48 bg-gray-300 animate-pulse rounded"></div>

              <div className="h-5 bg-gray-300 animate-pulse rounded mt-4"></div>

              <div className="h-5 w-2/3 bg-gray-300 animate-pulse rounded mt-3"></div>

              <div className="h-6 w-1/3 bg-gray-300 animate-pulse rounded mt-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;