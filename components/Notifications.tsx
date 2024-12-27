"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

const Notifications = () => {
  const { count }: any = 2;

  // useUnreadInboxNotificationsCount();

  const unreadNotifications: any = [];

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Image
          src="/assets/icons/bell.svg"
          alt="inbox"
          width={24}
          height={24}
        />
        {count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500" />
        )}
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        {unreadNotifications.length <= 0 && (
          <p className="py-2 text-center text-dark-500">No new notifications</p>
        )}

        {unreadNotifications.length > 0 &&
          unreadNotifications.map((notification: any, index: any) => (
            <div className="bg-dark-200 text-white" key={index}>
              <h2>Hello I am Ahsan Iqbal</h2>
            </div>
          ))}
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
