import { useAuth } from "../context/AuthContext";

export default function BookingBox() {
  const {
    user,
    openSchedule,
    openRegister,
  } = useAuth();

  const handleCariJadwal = () => {
    if (!user) {
      openRegister(); // 👈 force ke register
      return;
    }
    openSchedule();
  };

  const handleLihatKeranjang = () => {
    if (!user) {
      openRegister(); // 👈 force ke register
      return;
    }
    // nanti: openCart()
    console.log("OPEN CART");
  };

  return (
    <div className="flex justify-center">
      <div className="bg-blue-50 rounded-2xl shadow-md px-6 py-6 inline-flex">
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Lihat Keranjang */}
          <button
            onClick={handleLihatKeranjang}
            className="
              h-[44px] px-8
              border border-blue-600
              text-blue-600
              rounded-lg
              font-medium
              hover:bg-blue-50
            "
          >
            Shopping Cart
          </button>

          {/* Cari Jadwal */}
          <button
            onClick={handleCariJadwal}
            className="
              h-[44px] px-8
              bg-blue-600
              hover:bg-blue-700
              text-white
              rounded-lg
              font-medium
            "
          >
            Book Now
          </button>

        </div>
      </div>
    </div>
  );
}