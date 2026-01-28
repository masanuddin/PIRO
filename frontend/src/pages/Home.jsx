import Navbar from "../components/Navbar";
import BookingBox from "../components/BookingBox";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import ProfileModal from "../components/ProfileModal";

export default function Home() {
  const { authOpen, profileOpen } = useAuth();

  return (

    <div className="min-h-screen pt-16">
      <Navbar />

      <section className="relative h-[70vh] overflow-hidden flex flex-col items-center justify-center">
        <ParticlesBackground />

        <div className="relative z-10 text-center max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Booking Pilates Jadi Lebih Gampang
          </h1>
          <p className="mt-4 text-slate-900">
            Pilih jadwal, timeslot, dan studio favoritmu
          </p>

          <div className="mt-16">
            <BookingBox />
          </div>
        </div>
      </section>

      <Footer />

      {authOpen && <AuthModal />}
      {authOpen && <AuthModal />}
      {profileOpen && <ProfileModal />}
    </div>
  );
}