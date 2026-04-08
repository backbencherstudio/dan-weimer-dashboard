"use client";
import { Bell, Menu, User } from 'lucide-react';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useAuth } from '@/hooks/use-auth';

type Props = {
  name: string;
  onMenuClick: () => void;
};

export const Topbar = ({ name, onMenuClick }: Props) => {

  const [showNotification, setShowNotification] = useState(false);

  const user = useAuthStore((state) => state.user);
  console.log("Topbar User:", user);

  const { user: authUser } = useAuth();

//   console.log("User:", authUser);

//   {
//     "id": "cmn5yjklv0000vl1or910fpfb",
//     "created_at": "2026-03-25T11:25:54.836Z",
//     "updated_at": "2026-04-08T04:26:56.077Z",
//     "deleted_at": null,
//     "status": "ACTIVE",
//     "approved_at": "2026-03-25T11:25:54.834Z",
//     "email": "admin@example.com",
//     "name": "B. Cooper",
//     "password": "$2b$10$0x8SETZ2AkIZXcM1OnvhOeySNH4rjopTrHS9p6HEwAQgl62dSgWSy",
//     "avatar": null,
//     "country_code": null,
//     "phone_number": "(207) 555-0119",
//     "gender": null,
//     "date_of_birth": null,
//     "billing_id": null,
//     "type": "ADMIN",
//     "email_verified_at": "2026-03-25T11:25:54.834Z",
//     "location": "Dhanmondi",
//     "street": null,
//     "city": "Dhaka",
//     "zip_code": "1280"
// }

  
  
  const email = user?.email || "demo@example.com";
  const role = user?.type || "Demo User";

  return (
    <header className="h-19.5 bg-white border-b border-[#EAECF0] flex items-center justify-between md:px-8 px-4  shrink-0">

      {/* menu icon */}
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* notification icon */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button className="flex items-start gap-2 border border-white/10  p-2 rounded-full border-solid transition-colors hover:border-[#F6D642]/40 bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>

          {/* alert iocn*/}
          <div className="absolute top-2.5 right-2.5 flex w-2 h-2 justify-center items-center gap-2.5 shrink-0 bg-[#EB3D4D] px-0.5 py-px rounded-[14px]">
          </div>

        </div>


        {/* profile icon */}
        <div className="flex items-center gap-2">
          <button className="flex items-start gap-2 border border-white/10  p-2 rounded-full border-solid transition-colors bg-gray-100 hover:border-[#F6D642]/40">
            <User className="w-5 h-5" />
          </button>
          <div>      
            <div>
              <p className="text-sm font-semibold leading-[150%]">{email}</p>
              <p className="text-white-solid text-xs font-normal leading-[150%] text-gray-500">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};