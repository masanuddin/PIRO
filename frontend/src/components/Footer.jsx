export default function Footer() {
  return (
    <footer className="relative z-20 bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* BRAND */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold text-white">PIRO</h2>
            <p className="mt-4 text-sm text-slate-400 leading-relaxed">
              PIRO is a pilates booking platform designed to help you book your schedule, time slot, and studio seamlessly.
            </p>
          </div>

          {/* PRODUCTS */}
          <div>
            <h3 className="text-sm font-semibold text-white">Product</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Booking Pilates</li>
              <li>Studios</li>
              <li>Schedules</li>
              <li>Pricing</li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold text-white">Company</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>About</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-sm font-semibold text-white">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Help Center</li>
              <li>Documentation</li>
              <li>Community</li>
              <li>Partners</li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold text-white">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-slate-500">
            © 2026 PIRO App. All rights reserved.
          </p>

          {/* SOCIAL */}
          <div className="flex gap-4">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">
              🌐
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">
              🐦
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">
              💬
            </div>
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 cursor-pointer">
              ✈️
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}