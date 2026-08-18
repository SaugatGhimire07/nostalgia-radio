export function Hero() {
  return (
    <div className="mt-[9vh] flex flex-col items-center px-6 text-center pointer-events-none [@media(max-height:560px)]:mt-[4vh] sm:mt-[18vh] sm:[@media(max-height:560px)]:mt-[6vh]">
      <h1 className="font-yatra text-[4.4rem] leading-none text-cream drop-shadow-[0_6px_28px_rgba(0,0,0,0.6)] sm:text-[9.2rem]">
        <span className="block text-center">चिया</span>
        <span className="block text-center">चौतारी</span>
      </h1>
    </div>
  );
}
