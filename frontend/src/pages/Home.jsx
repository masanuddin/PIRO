import Navbar from "../components/Navbar";
import BookingBox from "../components/BookingBox";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "../components/ProfileModal";
import ScheduleModal from "../components/ScheduleModal";
import TimeslotModal from "../components/TimeslotModal";
import PaymentModal from "../components/PaymentModal";
import SuccessModal from "../components/SuccessModal";
import HistoryModal from "../components/HistoryModal";

export default function Home() {
  const {authOpen, profileOpen, scheduleOpen, timeslotOpen, paymentOpen, successOpen, historyOpen } = useAuth();

  return (

    <div className="min-h-screen pt-16">
      <Navbar />

      <section className="relative h-[70vh] overflow-hidden flex flex-col items-center justify-center">
        <ParticlesBackground />

        <div className="relative z-10 w-full flex flex-col items-center px-6">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              Booking Pilates Jadi Lebih Gampang
            </h1>
            <p className="mt-4 text-slate-900">
              Pilih jadwal, timeslot, dan studio favoritmu
            </p>
          </div>
          <div className="mt-16 w-full">
            <BookingBox />
          </div>

        </div>

      </section>

      <Footer />

      {authOpen && <AuthModal />}
      {profileOpen && <ProfileModal />}
      {scheduleOpen && <ScheduleModal />}
      {timeslotOpen && <TimeslotModal />}
      {paymentOpen && <PaymentModal />}
      {successOpen && <SuccessModal />}
      {historyOpen && <HistoryModal />}
    </div>
  );
}