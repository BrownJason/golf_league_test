'use client';

import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Player {
  player_id: number;
  player_name: string;
  handicap?: number;
}

interface PartnerScore {
  id: number;
  player1_id: number;
  player2_id: number;
  player1_score: number;
  player2_score: number;
  player1_handicap: number;
  player2_handicap: number;
  combined_score: number;
  week_date: string;
}

export default function AdminPartnersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [partnerScores, setPartnerScores] = useState<PartnerScore[]>([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [player1Score, setPlayer1Score] = useState("");
  const [player2Score, setPlayer2Score] = useState("");
  const [player1Handicap, setPlayer1Handicap] = useState("");
  const [player2Handicap, setPlayer2Handicap] = useState("");
  const [weekDate, setWeekDate] = useState("");
  const [combinedScore, setCombinedScore] = useState("");
  const [message, setMessage] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/players")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  useEffect(() => {
    if (weekDate) {
      fetch(`/api/partners?week_date=${weekDate}`)
        .then((res) => res.json())
        .then((data) => setPartnerScores(data));
    } else {
      setPartnerScores([]);
    }
  }, [weekDate, message]);

  useEffect(() => {
    const score1 = Number(player1Score);
    const score2 = Number(player2Score);
    const handicap1 = Number(player1Handicap);
    const handicap2 = Number(player2Handicap);
    if (!isNaN(score1) && !isNaN(score2)) {
      setCombinedScore((score1-handicap1  + score2-handicap2).toString());
    } else {
      setCombinedScore("");
    }
  }, [player1Score, player2Score, player1Handicap, player2Handicap]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    if (!player1 || !player2 || player1 === player2) {
      setMessage("Please select two different players.");
      return;
    }
    if (
      !player1Score ||
      !player2Score ||
      isNaN(Number(player1Score)) ||
      isNaN(Number(player2Score))
    ) {
      setMessage("Please enter valid scores for both players.");
      return;
    }
    if (
      !player1Handicap ||
      !player2Handicap ||
      isNaN(Number(player1Handicap)) ||
      isNaN(Number(player2Handicap))
    ) {
      setMessage("Please enter valid handicaps for both players.");
      return;
    }
    if (!weekDate) {
      setMessage("Please select a week/date.");
      return;
    }
    const res = await fetch("/api/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        player1_id: player1,
        player2_id: player2,
        player1_score: Number(player1Score),
        player2_score: Number(player2Score),
        player1_handicap: Number(player1Handicap),
        player2_handicap: Number(player2Handicap),
        week_date: weekDate,
      }),
    });
    if (res.ok) {
      setMessage("Partner score added successfully!");
      setPlayer1("");
      setPlayer2("");
      setPlayer1Score("");
      setPlayer2Score("");
      setPlayer1Handicap("");
      setPlayer2Handicap("");
      setWeekDate("");
      setCombinedScore("");
    } else {
      const err = await res.json();
      setMessage(err.error || "Failed to add partner score.");
    }
  };

  const handleEdit = async () => {
    setMessage("");
    if (!editId) {
      setMessage("Please select a partner score to edit from the table below.");
      return;
    }
    if (!player1 || !player2 || player1 === player2) {
      setMessage("Please select two different players.");
      return;
    }
    if (
      !player1Score ||
      !player2Score ||
      isNaN(Number(player1Score)) ||
      isNaN(Number(player2Score))
    ) {
      setMessage("Please enter valid scores for both players.");
      return;
    }
    if (
      !player1Handicap ||
      !player2Handicap ||
      isNaN(Number(player1Handicap)) ||
      isNaN(Number(player2Handicap))
    ) {
      setMessage("Please enter valid handicaps for both players.");
      return;
    }
    if (!weekDate) {
      setMessage("Please select a week/date.");
      return;
    }
    const res = await fetch("/api/partners", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        player1_id: player1,
        player2_id: player2,
        player1_score: Number(player1Score),
        player2_score: Number(player2Score),
        player1_handicap: Number(player1Handicap),
        player2_handicap: Number(player2Handicap),
        week_date: weekDate,
      }),
    });
    if (res.ok) {
      setMessage("Partner score updated successfully!");
      setEditId(null);
      setPlayer1("");
      setPlayer2("");
      setPlayer1Score("");
      setPlayer2Score("");
      setPlayer1Handicap("");
      setPlayer2Handicap("");
      setWeekDate("");
      setCombinedScore("");
    } else {
      const err = await res.json();
      setMessage(err.error || "Failed to update partner score.");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#9A9540] mb-2">
            Manage Partner Scores
          </h1>
          <div className="h-1 w-24 md:w-32 bg-[#9A9540] mx-auto rounded-full mb-4"></div>
          <p className="text-[#9A9540]/80 text-sm md:text-base">
            Add or edit partner scores for the week
          </p>
        </div>
        <main className="max-w-full mx-auto p-4 md:p-6 animate-fade-in">
          {/* Partner Score Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#243E2A] rounded-xl border border-[#9A9540] p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Player 1 Selection */}
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="player1"
                >
                  Player 1
                </Label>
                <Select
                  value={player1}
                  onValueChange={(val) => {
                    setPlayer1(val);
                    const found = players.find((p) => p.player_id.toString() === val);
                    setPlayer1Handicap(found && found.handicap !== undefined ? found.handicap.toString() : "");
                  }}
                >
                  <SelectTrigger
                    id="player1"
                    className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                  >
                    <SelectValue placeholder="Select Player 1" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A3E2A] border-[#9A9540]">
                    {players.map((p) => (
                      <SelectItem
                        key={p.player_id}
                        value={p.player_id.toString()}
                        disabled={p.player_id.toString() === player2}
                        className="text-[#9A9540]"
                      >
                        {p.player_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Player 2 Selection */}
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="player2"
                >
                  Player 2
                </Label>
                <Select
                  value={player2}
                  onValueChange={(val) => {
                    setPlayer2(val);
                    const found = players.find((p) => p.player_id.toString() === val);
                    setPlayer2Handicap(found && found.handicap !== undefined ? found.handicap.toString() : "");
                  }}
                >
                  <SelectTrigger
                    id="player2"
                    className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                  >
                    <SelectValue placeholder="Select Player 2" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A3E2A] border-[#9A9540]">
                    {players.map((p) => (
                      <SelectItem
                        key={p.player_id}
                        value={p.player_id.toString()}
                        disabled={p.player_id.toString() === player1}
                        className="text-[#9A9540]"
                      >
                        {p.player_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="player1Score"
                >
                  Player 1 Score
                </Label>
                <Input
                  id="player1Score"
                  type="number"
                  value={player1Score}
                  onChange={(e) => setPlayer1Score(e.target.value)}
                  min={0}
                  required
                  className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                />
              </div>
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="player2Score"
                >
                  Player 2 Score
                </Label>
                <Input
                  id="player2Score"
                  type="number"
                  value={player2Score}
                  onChange={(e) => setPlayer2Score(e.target.value)}
                  min={0}
                  required
                  className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="player1Handicap"
                >
                  Player 1 Handicap
                </Label>
                <Input
                  id="player1Handicap"
                  type="number"
                  value={player1Handicap}
                  onChange={(e) => setPlayer1Handicap(e.target.value)}
                  min={0}
                  required
                  className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                />
              </div>
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="player2Handicap"
                >
                  Player 2 Handicap
                </Label>
                <Input
                  id="player2Handicap"
                  type="number"
                  value={player2Handicap}
                  onChange={(e) => setPlayer2Handicap(e.target.value)}
                  min={0}
                  required
                  className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 items-end">
              <div>
                <Label
                  className="block text-[#9A9540] text-sm font-medium mb-2"
                  htmlFor="weekDate"
                >
                  Week/Date
                </Label>
                <Input
                  id="weekDate"
                  type="date"
                  value={weekDate}
                  onChange={(e) => setWeekDate(e.target.value)}
                  required
                  className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                />
              </div>
              <div>
                <Label className="block text-[#9A9540] text-sm font-medium mb-2">
                  Combined Score
                </Label>
                <Input
                  value={combinedScore}
                  readOnly
                  tabIndex={-1}
                  className="bg-[#1A3E2A] border-[#9A9540] text-[#9A9540]"
                />
              </div>
            </div>
            {message && (
              <div className="text-sm text-center text-red-500 dark:text-red-400 mb-2">
                {message}
              </div>
            )}
            <Button
              type="submit"
              className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530] mb-4"
            >
              Add Partner Score
            </Button>
            <Button
              type="button"
              className="w-full bg-[#9A9540] text-[#1A3E2A] hover:bg-[#7A7530]"
              variant="secondary"
              onClick={handleEdit}
            >
              Edit Partner Score
            </Button>
          </form>
          {/* Partner Scores Table */}
          {weekDate && partnerScores.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-2 text-[#9A9540]">
                Partner Scores for {weekDate}
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border text-sm bg-[#243E2A] border-[#9A9540] text-[#9A9540] rounded-xl">
                  <thead>
                    <tr className="bg-[#1A3E2A]">
                      <th className="p-2 border border-[#9A9540]">Player 1</th>
                      <th className="p-2 border border-[#9A9540]">Player 2</th>
                      <th className="p-2 border border-[#9A9540]">Player 1 Score</th>
                      <th className="p-2 border border-[#9A9540]">Player 2 Score</th>
                      <th className="p-2 border border-[#9A9540]">Combined</th>
                      <th className="p-2 border border-[#9A9540]">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerScores.map((score) => {
                      const p1 = players.find(
                        (p) => p.player_id === score.player1_id
                      );
                      const p2 = players.find(
                        (p) => p.player_id === score.player2_id
                      );
                      return (
                        <tr key={score.id} className="text-center">
                          <td className="p-2 border border-[#9A9540]">
                            {p1 ? p1.player_name : score.player1_id}
                          </td>
                          <td className="p-2 border border-[#9A9540]">
                            {p2 ? p2.player_name : score.player2_id}
                          </td>
                          <td className="p-2 border border-[#9A9540]">
                            {score.player1_score}
                          </td>
                          <td className="p-2 border border-[#9A9540]">
                            {score.player2_score}
                          </td>
                          <td className="p-2 border border-[#9A9540] font-bold">
                            {score.combined_score}
                          </td>
                          <td className="p-2 border border-[#9A9540]">
                            <Button
                              type="button"
                              size="sm"
                              variant={editId === score.id ? "default" : "outline"}
                              className={
                                editId === score.id
                                  ? "bg-[#9A9540] text-[#1A3E2A]"
                                  : "border-[#9A9540] text-[#9A9540]"
                              }
                              onClick={() => {
                                setEditId(score.id);
                                setPlayer1(score.player1_id.toString());
                                setPlayer2(score.player2_id.toString());
                                setPlayer1Score(score.player1_score.toString());
                                setPlayer2Score(score.player2_score.toString());
                                setPlayer1Handicap(score.player1_handicap?.toString() || "");
                                setPlayer2Handicap(score.player2_handicap?.toString() || "");
                                setWeekDate(score.week_date.slice(0, 10));
                              }}
                            >
                              {editId === score.id ? "Editing" : "Edit"}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
