import { useState } from "react";
import scorecardData from "../assets/static-data/golf-yardage.json";

const renderHoles = (holes, keyName, start, end) => {
  let total = 0;
  return holes.slice(start, end).map((hole, i) => {
    total += parseInt(hole[keyName]);
    const outIn = start === 0 && i === 8 ? "Out" : start === 9 && i === 8 ? "In" : null;
    return (
      <>
        <td className="bg-gray-200 text-black h-8 sm:h-16 border">{hole[keyName]}</td>
        {outIn && <td className="bg-gray-200 text-black h-8 sm:h-16 border">{keyName === "number" ? outIn : total}</td>}
      </>
    );
  });
};

function Scorecard() {
  const data = scorecardData;
  const [expanded, setExpanded] = useState(false);

  const toggleCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="grid bg-none text-white md:m-8 mx-auto md:p-8 p-2 rounded-t-lg sm:mt-0">
      <div className="bg-green-900 rounded-t-lg">
        <div className="flex border border-black bg-gray-200 dark:bg-[#3c505c] rounded-t-lg sm:mt-0">
          <div className="justify-start grow md:w-128 text-xs sm:text-sm md:indent-8 md:text-3xl indent-4">{data.name} Scorecard</div>
          <button className="flex-none border border-black rounded-l-lg rounded-t-lg bg-[#6c844c] text-[#f9e6bf] justify-end w-32 sm:mt-0" onClick={toggleCollapse}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {data.tees.map((item) => (
          <div key={item.tee}>
            {expanded && (
              <>
                <div className="border border-black bg-gray-200 text-left dark:bg-[#3c505c] table-auto w-full collapsible-content sm:mt-0">{item.tee}</div>
                <table className="border border-black bg-gray-200 text-center table-auto w-full sm:mt-0 overflow-x-auto">
                  <tbody className="bg-gray-200">
                    <tr>
                      <td className="bg-gray-200 text-black h-8 sm:h-16 border">Hole No.</td>
                      {renderHoles(item.holes, "number", 0, 9)}
                    </tr>
                    <tr>
                      <td className="bg-gray-200 text-black h-8 sm:h-16 border">Yards</td>
                      {renderHoles(item.holes, "yards", 0, 9)}
                    </tr>
                    <tr>
                      <td className="bg-gray-200 text-black h-8 sm:h-16 border">Par</td>
                      {renderHoles(item.holes, "par", 0, 9)}
                    </tr>
                  </tbody>
                </table>
                <table className="border border-black bg-gray-200 text-center table-auto w-full sm:mt-0 overflow-x-auto">
                  <tbody className="bg-gray-200">
                    <tr>
                      <td className="bg-gray-200 text-black h-8 sm:h-16 border">Hole No.</td>
                      {renderHoles(item.holes, "number", 9, 18)}
                    </tr>
                    <tr>
                      <td className="bg-gray-200 text-black h-8 sm:h-16 border">Yards</td>
                      {renderHoles(item.holes, "yards", 9, 18)}
                    </tr>
                    <tr>
                      <td className="bg-gray-200 text-black h-8 sm:h-16 border">Par</td>
                      {renderHoles(item.holes, "par", 9, 18)}
                    </tr>
                  </tbody>
                </table>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Scorecard;
