export default function ListsSkeleton() {
  return (
    <div className="bg-tertiary p-5 rounded-[5px] grid max-md:grid-cols-1 grid-cols-2 gap-5 animate-pulse">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="h-[30px] w-full bg-primary rounded-[5px]"></div>
      ))}
    </div>
  );
}
