export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-4 text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
