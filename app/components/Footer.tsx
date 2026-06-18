"use client";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 px-6 py-16">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <p className="display-font text-lg font-light text-[#f0ece4] tracking-[0.2em] uppercase mb-2">
            Traditio Ventures
          </p>
          <p className="font-sans text-xs text-[#4a4540] leading-relaxed">
            The venture and investment arm of Traditio Co.
          </p>
        </div>
        <div className="text-right">
          <p className="font-sans text-xs text-[#4a4540]">
            traditioventures.com
          </p>
          <p className="font-sans text-xs text-[#4a4540] mt-1">
            &copy; Traditio Co. 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
