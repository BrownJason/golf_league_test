import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#1A3E2A]">
      {children}
    </div>
  );
}