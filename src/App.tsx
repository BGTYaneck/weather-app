const App = () => {
  return (
    <div className="w-screen h-screen flex items-center flex-col p-3 pt-5 gap-5">
      <div className="w-[78rem] h-36 rounded-3xl bg-[#333232] flex justify-center items-center">
        <p className="opacity-30">Favourited Cities</p>
      </div>
      <div className="flex flex-row flex-wrap w-10/12 h-[32rem] gap-3 ">
        <div className="w-[25rem] bg-[#333232] rounded-3xl h-full flex justify-center items-center">
          <p className="opacity-30">Search Bar & Data</p>
        </div>
        <div className=" w-[52rem] bg-[#333232] rounded-3xl h-full flex justify-center items-center">
          <p className="opacity-30">Graph</p>
        </div>
      </div>
    </div>
  );
};

export default App;
