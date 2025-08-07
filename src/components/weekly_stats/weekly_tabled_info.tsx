import { partnerColumns, PartnerScore } from "@/app/weekly_score/partner-columns";
import { scoreColumns, WeeklyScore } from "@/app/weekly_score/score-columns";
import { skinsColumns, WeeklySkins as SkinsTableRow, WeeklySkins } from "@/app/weekly_score/skins-columns";
import { WeeklyWinnings, winningsColumns } from "@/app/weekly_score/winnings-columns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { DataTable } from "../ui/data-table";

export default function WeeklyTabledInfo ({sortedScores, filteredWinnings, filteredSkins,filteredPartners} :
    {sortedScores: WeeklyScore[], filteredWinnings: WeeklyWinnings[], filteredSkins: WeeklySkins[], filteredPartners: PartnerScore[]}
) {
    return (
        <>
        <Tabs defaultValue="scores" className="w-full">
            <div className="px-4 pt-4 md:px-6 md:pt-6">
              <TabsList className="grid w-full grid-cols-4 bg-[#292929] border border-[#B2825E] rounded-lg overflow-hidden">
                <TabsTrigger 
                  value="scores" 
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Scores
                </TabsTrigger>
                <TabsTrigger 
                  value="winnings"
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Winnings
                </TabsTrigger>
                <TabsTrigger 
                  value="skins"
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Skins
                </TabsTrigger>
                <TabsTrigger 
                  value="partners"
                  className="pb-4 text-[#EDE6D6] data-[state=active]:bg-[#305D3C] data-[state=active]:text-[#EDE6D6] border data-[state=active]:border-black"
                >
                  Partners
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="scores" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={scoreColumns} 
                      data={sortedScores}
                      header="" 
                      filterItem="player_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="winnings" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={winningsColumns} 
                      data={filteredWinnings} 
                      header="" 
                      filterItem="player_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="skins" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable
                      columns={skinsColumns}
                      data={(() => {
                        // Flatten skins data for DataTable: one row per win, matching WeeklySkins type
                        const rows: SkinsTableRow[] = [];
                        for (const skin of filteredSkins) {
                          const { player_name, week_date, side } = skin;
                          // If winnings is not present, fallback to 5
                          for (let i = 1; i <= 9; i++) {
                            const win: boolean = (skin as Record<string, unknown>)[`hole_${i}_win`] === true;
                            const winningsRaw = (skin as Record<string, unknown>)[`hole_${i}`];
                            const winnings = typeof winningsRaw === "number"
                              ? winningsRaw
                              : typeof winningsRaw === "string"
                                ? parseFloat(winningsRaw)
                                : 5;
                          
                            if (win) {
                              rows.push({
                                player_name,
                                week_date,
                                side,
                                hole: i,
                                winnings,
                                win: true,
                              });
                            }
                          }
                        }
                        return rows;
                      })()}
                      header=""
                      filterItem="player_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="partners" className="mt-4">
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <div className="min-w-[800px] p-4 md:p-6">
                    <DataTable 
                      columns={partnerColumns} 
                      data={filteredPartners} 
                      header="" 
                      filterItem="player1_name"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
    )
}