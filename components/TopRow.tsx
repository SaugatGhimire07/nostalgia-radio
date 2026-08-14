import { Clock } from "./Clock";
import { ListenerCount } from "./ListenerCount";
import { SocialLinks } from "./SocialLinks";

export function TopRow() {
  return (
    <div className="safe-t safe-l safe-r pointer-events-none fixed z-30 flex items-center justify-between px-4 sm:px-10">
      <div className="pointer-events-auto">
        <Clock />
      </div>
      <div className="pointer-events-auto absolute left-1/2 -translate-x-1/2">
        <ListenerCount />
      </div>
      <div className="pointer-events-auto">
        <SocialLinks />
      </div>
    </div>
  );
}
