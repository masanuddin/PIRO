export default function BookingBox() {
  return (
    <div className="bg-blue-50 rounded-2xl p-8 shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">

        <div>
          <label className="text-sm text-slate-600">Tanggal</label>
          <input
            type="date"
            className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 bg-white"
          />
        </div>

        <div>
          <label className="text-sm text-slate-600">Timeslot</label>
          <select className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 bg-white">
            <option>Pilih Waktu</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-slate-600">Studio / Court</label>
          <select className="w-full mt-2 px-4 py-2 rounded-lg border border-slate-200 bg-white">
            <option>Pilih Studio</option>
          </select>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white h-[44px] rounded-lg font-medium">
          Cari Jadwal
        </button>
      </div>
    </div>
  );
}