import {Card,Heading} from "./Card";
import { LogOut } from "lucide-react";
export default function TodayStatus({
  status = "Present",
  checkInLabel = "Checked in at 09:15 AM",
  workingTime = "09h 15m",
  checkIn = "09:15 AM",
  checkOut = "-:-:-",
}) {
  return (
    <Card className="h-[222px] p-4">
      <Heading
        action={
          <small className="text-[10px] text-slate-500">{checkInLabel}</small>
        }
      >
        Today&apos;s Status
      </Heading>
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-emerald-50 px-4 py-3.5 font-semibold text-emerald-600">
        <i className="size-2 rounded-full bg-emerald-500" />
        {status}
      </div>
      <div className="my-4 grid grid-cols-[1.2fr_1fr_1fr] gap-1 px-1">
        <div>
          <small className="block text-[9px] text-slate-500">Working Time</small>
          <strong className="text-xs">{workingTime}</strong>
        </div>
        <div>
          <small className="block text-[9px] text-slate-500">Check-In</small>
          <strong className="text-xs">{checkIn}</strong>
        </div>
        <div>
          <small className="block text-[9px] text-slate-500">Check-Out</small>
          <strong className="text-xs">{checkOut}</strong>
        </div>
      </div>
      <a href="/attendance" className="flex w-full items-center justify-center gap-3 rounded-md bg-blue-600 py-2.5 text-xs font-semibold text-white">
        Manage attendance <LogOut size={18} />
      </a>
    </Card>
  );
}
