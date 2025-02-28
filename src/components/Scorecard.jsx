import { useState } from "react";
import scorecardData from "../assets/static-data/golf-yardage.json";

const renderHoles = (holes, keyName) => {
  let total = 0;
  return holes.map((hole, i) => {
    total += parseInt(hole[keyName]);
    const outIn = i === 8 ? "Out" : i === 17 ? "In" : null;
    return (
      <>
        <td className="bg-gray-200 text-black h-16 border">{hole[keyName]}</td>
        {outIn && <td className="bg-gray-200 text-black h-16 border">{keyName === "number" ? outIn : total}</td>}
        {outIn && i === 8 ? <td className="bg-gray-200 text-black h-16 w-16"> </td> : ""}
      </>
    );
  });
};

function Scorecard() {
  const data = scorecardData;
  const [expanded, setExpanded] = useState(false);

  const toggaleCollapse = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="grid bg-none text-white m-32 mx-auto p-8 rounded-t-lg">
      <div className="bg-green-900 rounded-t-lg">
        <div className="flex border border-black bg-gray-200 dark:bg-[#3c505c] rounded-t-lg">
          <div className="justify-start w-128 grow indent-8 text-3xl">{data.name} Scorecard</div>
          <button className="flex-none border border-black rounded-l-lg rounded-t-lg bg-[#6c844c] text-[#f9e6bf] justify-end w-32" onClick={toggaleCollapse}>
            {expanded ? "Collapse" : "Expand"}
          </button>
        </div>

        {data.tees.map((item) => (
          <div key={item.tee}>
            {expanded && (
              <>
                <div className="border border-black bg-gray-200 text-left dark:bg-[#3c505c] table-auto w-full collapsible-content">{item.tee}</div>
                <table className="border border-black bg-gray-200 text-center table-auto w-full">
                  <tbody className="bg-gray-200">
                    <tr>
                      <td className="bg-gray-200 text-black h-16 border">Hole No.</td>
                      {renderHoles(item.holes, "number")}
                    </tr>
                    <tr>
                      <td className="bg-gray-200 text-black h-16  border">Yards</td>
                      {renderHoles(item.holes, "yards")}
                    </tr>
                    <tr>
                      <td className="bg-gray-200 text-black h-16  border">Par</td>
                      {renderHoles(item.holes, "par")}
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
