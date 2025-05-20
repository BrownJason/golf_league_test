import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import AdminNav from './components/admin-nav';

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
    <div>
      <AdminNav />
      <main className="max-w-full mx-auto p-4 md:p-6 animate-fade-in">
        {children}
      </main>
    </div>
  );
}