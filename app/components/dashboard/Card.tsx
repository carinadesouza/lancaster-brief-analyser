export const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white border-[1.5px] border-[#e8e5e0] rounded-2xl p-4 sm:p-5 w-full">
    <p className="text-[10px] font-bold text-[#bbb] uppercase tracking-[0.08em] mb-3 sm:mb-4">
      {title}
    </p>
    {children}
  </div>
);
