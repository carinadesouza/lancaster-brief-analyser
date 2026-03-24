export default function Header() {
  return (
    <header className="flex items-center px-6 gap-3 h-13.5 bg-white border-b border-[#e8e5e0] shrink-0">
      <div className="w-7.5 h-7.5 rounded-lg bg-[#C8102E] flex items-center justify-center shrink-0">
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path
            d="M2.5 1.5h7l3.5 3.5v9h-10.5v-12.5z"
            stroke="white"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path d="M9.5 1.5v3.5h3.5" stroke="white" strokeWidth="1.2" />
          <path
            d="M4.5 7.5h6M4.5 10h4"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-[#111] tracking-[-0.01em]">
          Assignment Brief Analyser
        </p>
        <p className="text-[11px] text-[#aaa]">Lancaster University</p>
      </div>   
    </header>
  );
}
