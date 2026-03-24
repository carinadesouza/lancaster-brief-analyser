const Bone = ({ h }: { h: number }) => (
  <div
    className="bg-[#ede9e3] rounded-2xl animate-pulse"
    style={{ height: h }}
  />
);

export default function SkeletonLoader() {
  return (
    <div className="p-6 flex flex-col gap-3.5">
      <Bone h={60} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[...Array(4)].map((_, i) => (
          <Bone key={i} h={100} />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Bone h={180} />
        <Bone h={180} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Bone h={200} />
        <Bone h={200} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Bone h={220} />
        <Bone h={220} />
      </div>
    </div>
  );
}
