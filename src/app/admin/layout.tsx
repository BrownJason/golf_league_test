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
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}