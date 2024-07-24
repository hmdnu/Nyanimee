export default function CardSkeleton() {
  return (
    <ul className="grid grid-cols-5 max-sm:grid-cols-1 max-xl:grid-cols-3 place-items-center gap-5">
      {[...Array(10)].map((_, i) => (
        <li
          key={i}
          className="bg-secondary-hover hover:bg-secondary transition-all rounded-[5px] w-full h-full flex flex-col justify-center px-2 py-5"
        >
          <div>
            <div>
              <div className="max-sm:w-[80%] w-[90%] h-[250px] rounded-[5px] mx-auto bg-primary animate-pulse" />

              <div className="pt-5 w-[90%] mx-auto">
                <div className="heading-3 line-clamp-1 mb-2"></div>
                <div className="flex justify-between">
                  <div className="heading-4"></div>
                  <div className="heading-4"></div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
