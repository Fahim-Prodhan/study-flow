const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#101a16] text-[#f3f4ee] flex items-center justify-center px-6">
      <div className="text-center">
        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-black leading-none tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-3xl md:text-4xl font-bold">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 max-w-md mx-auto text-base-content/60 text-gray-400">
          Sorry, the page you're looking for doesn't exist or may have been
          moved to another location.
        </p>

        {/* Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-cyan-400 hover:scale-105"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
