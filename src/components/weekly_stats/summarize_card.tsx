/* eslint-disable @typescript-eslint/no-explicit-any */
export default function SummarizedCard({header, summaryInfo} :
    {header: string, summaryInfo: any}
) {
    return (
        <>
        <div className="bg-[#292929] border border-[#B2825E] rounded-xl p-4 md:p-6 shadow shadow-black shadow-lg">
            <h3 className="text-[#EDE6D6] text-sm font-medium mb-2">{header}</h3>
            <p className="text-2xl md:text-3xl text-white font-bold">
              {summaryInfo}
            </p>
          </div>
        </>
    )
}