export default function ProcurementDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <p className="text-sm text-gray-500">Procurement</p>
        <h1 className="text-xl font-bold">Dashboard</h1>
      </header>

      <main className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-3xl font-bold">14</h2>
            <p>Pending</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-3xl font-bold">8</h2>
            <p>Ordered</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-3xl font-bold">3</h2>
            <p>Sent</p>
          </div>

          <div className="rounded-xl bg-white p-5 shadow">
            <h2 className="text-3xl font-bold">21</h2>
            <p>Received</p>
          </div>
        </div>
      </main>
    </div>
  );
}
