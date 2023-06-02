export default function BreakpointIndicator() {
  return (
    process.env.NODE_ENV === 'development' && (
      <div className="fixed left-0 top-1 z-[1090] p-2 text-xs font-bold text-black sm:left-1 sm:top-2 md:left-2 md:top-2">
        <span className="rounded bg-yellow-400 p-1 sm:hidden">XS</span>
        <span className="hidden rounded bg-yellow-400 px-1 sm:inline-block md:hidden">SM</span>
        <span className="hidden rounded bg-yellow-400 px-1 sm:hidden md:inline-block lg:hidden">
          MD
        </span>
        <span className="hidden rounded bg-yellow-400 px-1 lg:inline-block xl:hidden">LG</span>
        <span className="hidden rounded bg-yellow-400 px-1 xl:inline-block">XL</span>
      </div>
    )
  );
}
