import Grid from "../components/Grid/Grid";

function OfflinePlay() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90%] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wide mb-6 text-center">
        Offline Play
      </h1>
        <Grid numberOfCards={9} />
    </div>
  );
}

export default OfflinePlay;
