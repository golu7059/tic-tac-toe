import Grid from '../components/Grid/Grid';

function Computer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-700">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Play vs Computer</h1>
      <Grid numberOfCards={9} />
    </div>
  );
}

export default Computer;
