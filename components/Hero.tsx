export function Hero() {
  return (
    <div className="mt-[18vh] flex flex-col items-center px-6 text-center pointer-events-none [@media(max-height:560px)]:mt-[6vh]">
      <h1 className="font-yatra text-[9.2rem] leading-none text-cream drop-shadow-[0_6px_28px_rgba(0,0,0,0.6)]">
        <span className="block text-center">चिया</span>
        <span className="block text-center">चौतारी</span>
      </h1>
    </div>
  );
}
