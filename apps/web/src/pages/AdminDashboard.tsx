export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <p className="text-sm text-gray-500">Admin</p>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <main className="p-6 space-y-4">
        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="font-semibold">Users</h2>
          <p className="text-sm text-gray-500">
            Manage supervisors, procurement staff and admins.
          </p>
        </div>

        <div className="rounded-xl bg-white p-5 shadow">
          <h2 className="font-semibold">Sites</h2>
          <p className="text-sm text-gray-500">Assign supervisors to sites.</p>
        </div>
      </main>
    </div>
  );
}
