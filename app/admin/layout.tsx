export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="bg-green-100 h-screen">
      { children }
    </main>
  );
}