import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = false;

export default function AdminDashboard() {
  return (
    <div className="p-6 bg-[#1A3E2A]">
      <h2 className="text-2xl font-bold mb-4 text-[#B5AA4C]">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/players">
          <div className="p-4 border border-[#B5AA4C] rounded-lg hover:bg-[#1A4A2E] cursor-pointer transition-colors">
            <h3 className="font-semibold text-[#B5AA4C]">Manage Players</h3>
            <p className="text-sm text-[#D4CB6A]">Add, edit, or remove players</p>
          </div>
        </Link>
        <Link href="/admin/scores">
          <div className="p-4 border border-[#B5AA4C] rounded-lg hover:bg-[#1A4A2E] cursor-pointer transition-colors">
            <h3 className="font-semibold text-[#B5AA4C]">Weekly Scores</h3>
            <p className="text-sm text-[#D4CB6A]">Manage weekly scores</p>
          </div>
        </Link>
        <Link href="/admin/winnings">
          <div className="p-4 border border-[#B5AA4C] rounded-lg hover:bg-[#1A4A2E] cursor-pointer transition-colors">
            <h3 className="font-semibold text-[#B5AA4C]">Weekly Winnings</h3>
            <p className="text-sm text-[#D4CB6A]">Manage weekly winnings</p>
          </div>
        </Link>
      </div>
    </div>
  );
}