"use client";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

interface PlayerScore {
  [key: string]: string | number | boolean | null | undefined;
}

interface DownloadScoresXLSXButtonProps {
  playerScores: PlayerScore[];
  playerName: string;
  partners?: PlayerScore[];
  winnings?: PlayerScore[];
}

export default function DownloadScoresXLSXButton({ playerScores, playerName, partners = [], winnings = [] }: DownloadScoresXLSXButtonProps) {
  if (!playerScores || playerScores.length === 0) return null;

  // Helper to remove unwanted keys and format dates
  const filterData = (data: PlayerScore[]) =>
    data.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, player_id, player1_id, player2_id, ...rest } = row;
      // Format date fields to MM/DD/YYYY
      Object.keys(rest).forEach((key) => {
        if (key.toLowerCase().endsWith('date') && rest[key]) {
          const dateVal = rest[key];
          let d: Date | null = null;
          if (typeof dateVal === 'object' && dateVal !== null && Object.prototype.toString.call(dateVal) === '[object Date]') {
            d = dateVal as Date;
          } else if (typeof dateVal === 'string' && !isNaN(Date.parse(dateVal))) {
            d = new Date(dateVal);
          }
          if (d) {
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            const yyyy = d.getFullYear();
            rest[key] = `${mm}/${dd}/${yyyy}`;
          }
        }
      });
      return rest;
    });

  // Helper to format headers: Capitalize and remove underscores
  const formatHeader = (header: string) =>
    header
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  // Helper to set header style (light grey background)
  const setHeaderStyle = (ws: XLSX.WorkSheet, headers: string[]) => {
    headers.forEach((header, idx) => {
      const cell = ws[XLSX.utils.encode_cell({ r: 0, c: idx })];
      if (cell) {
        cell.s = {
          fill: { fgColor: { rgb: 'F0F0F0' } },
          font: { bold: true },
        };
      }
    });
  };

  return (
    <Button
      className="bg-[#305D3C] hover:bg-[#305D3C] text-[#EDE6D6] border-2 border-[#B2825E] rounded-lg shadow-md shadow-black hover:shadow-lg transition duration-300 ease-in-out"
      onClick={() => {
        const wb = XLSX.utils.book_new();
        // Scores sheet
        const filteredScores = filterData(playerScores);
        const wsScores = XLSX.utils.json_to_sheet(filteredScores);
        // Format headers
        const scoreHeaders = Object.keys(filteredScores[0] || {});
        if (scoreHeaders.length) {
          wsScores['!cols'] = scoreHeaders.map(() => ({ wch: 18 }));
          wsScores['!ref'] = wsScores['!ref'];
          // Set formatted headers
          scoreHeaders.forEach((header, idx) => {
            const cell = XLSX.utils.encode_cell({ r: 0, c: idx });
            wsScores[cell].v = formatHeader(header);
          });
          setHeaderStyle(wsScores, scoreHeaders);
        }
        XLSX.utils.book_append_sheet(wb, wsScores, "Scores");
        // Partners sheet
        if (partners.length > 0) {
          const filteredPartners = filterData(partners);
          const wsPartners = XLSX.utils.json_to_sheet(filteredPartners);
          const partnerHeaders = Object.keys(filteredPartners[0] || {});
          if (partnerHeaders.length) {
            wsPartners['!cols'] = partnerHeaders.map(() => ({ wch: 18 }));
            wsPartners['!ref'] = wsPartners['!ref'];
            partnerHeaders.forEach((header, idx) => {
              const cell = XLSX.utils.encode_cell({ r: 0, c: idx });
              wsPartners[cell].v = formatHeader(header);
            });
            setHeaderStyle(wsPartners, partnerHeaders);
          }
          XLSX.utils.book_append_sheet(wb, wsPartners, "Partners");
        }
        // Winnings sheet
        if (winnings.length > 0) {
          const filteredWinnings = filterData(winnings);
          const wsWinnings = XLSX.utils.json_to_sheet(filteredWinnings);
          const winningsHeaders = Object.keys(filteredWinnings[0] || {});
          if (winningsHeaders.length) {
            wsWinnings['!cols'] = winningsHeaders.map(() => ({ wch: 18 }));
            wsWinnings['!ref'] = wsWinnings['!ref'];
            winningsHeaders.forEach((header, idx) => {
              const cell = XLSX.utils.encode_cell({ r: 0, c: idx });
              wsWinnings[cell].v = formatHeader(header);
            });
            setHeaderStyle(wsWinnings, winningsHeaders);
          }
          XLSX.utils.book_append_sheet(wb, wsWinnings, "Winnings");
        }
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array", cellStyles: true });
        const blob = new Blob([wbout], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${playerName.replace(/\s+/g, '_')}_scores.xlsx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }}
    >
      Download Scores XLSX
    </Button>
  );
}
