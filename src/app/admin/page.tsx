import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-[#1A3E2A]">
      <h2 className="text-2xl font-bold mb-4 text-[#9A9540]">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/players">
          <div className="p-4 border border-[#9A9540] rounded-lg hover:bg-[#2A4E3A] cursor-pointer">
            <h3 className="font-semibold text-[#9A9540]">Manage Players</h3>
            <p className="text-sm text-[#9A9540]">Add, edit, or remove players</p>
          </div>
        </Link>
        <Link href="/admin/scores">
        <div className="p-4 border border-[#9A9540] rounded-lg hover:bg-[#2A4E3A] cursor-pointer">
          <h3 className="font-semibold text-[#9A9540]">Weekly Scores</h3>
          <p className="text-sm text-[#9A9540]">Manage weekly scores</p>
        </div>
        </Link>
        <div className="p-4 border border-[#9A9540] rounded-lg">
          <h3 className="font-semibold text-[#9A9540]">Weekly Winnings</h3>
          <p className="text-sm text-[#9A9540]">Manage weekly winnings</p>
        </div>
      </div>
    </div>
  );
}