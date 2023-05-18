import React from "react";
import cities from "cities.json";
import { Autocomplete } from "@mantine/core";
import { IconWorldDown } from "@tabler/icons-react";

const App = () => {
  return (
    <div className="w-screen h-screen flex items-center flex-col p-3 pt-5 gap-5">
      <div className="w-10/12 min-h-[9rem] rounded-3xl bg-[#1c1b22] flex justify-center items-center">
        <p className="opacity-50">Your Favourited Cities will appear here!</p>
      </div>
      <div className="flex flex-row flex-wrap w-10/12 h-[32rem] gap-3 ">
        <div className="w-[26rem] bg-[#1c1b22] rounded-3xl h-full flex justify-center ">
          <Autocomplete
            className="w-[23rem] mt-5 rounded-2xl"
            hoverOnSearchChange
            limit={12}
            icon={<IconWorldDown />}
            placeholder="Select a city/region..."
            data={[]}
          />
        </div>
        <div className=" w-[52rem] bg-[#1c1b22] rounded-3xl h-full flex justify-center items-center">
          <p className="opacity-50">...</p>
        </div>
      </div>
    </div>
  );
};

export default App;
