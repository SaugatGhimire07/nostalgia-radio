export function Hero() {
  return (
    <div className="mt-[13vh] flex flex-col items-center px-4 text-center pointer-events-none [@media(max-height:560px)]:mt-[5vh] sm:mt-[18vh] sm:px-6 sm:[@media(max-height:560px)]:mt-[6vh]">
      <h1 className="font-yatra text-[7.5rem] leading-none text-cream drop-shadow-[0_6px_28px_rgba(0,0,0,0.6)] sm:text-[9.2rem]">
        <span className="block text-center">चिया</span>
        <span className="block text-center">चौतारी</span>
      </h1>
    </div>
  );
}
