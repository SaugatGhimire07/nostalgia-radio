import { Clock } from "./Clock";
import { ListenerCount } from "./ListenerCount";
import { SocialLinks } from "./SocialLinks";

export function TopRow() {
  return (
    <div className="safe-t safe-l safe-r pointer-events-none fixed z-30 flex items-center justify-between px-4 sm:px-10">
      <div className="pointer-events-auto shrink-0">
        <Clock />
      </div>
      <div className="pointer-events-auto flex flex-1 justify-center px-2 sm:flex-none sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:px-0">
        <ListenerCount />
      </div>
      <div className="pointer-events-auto shrink-0">
        <SocialLinks />
      </div>
    </div>
  );
}
