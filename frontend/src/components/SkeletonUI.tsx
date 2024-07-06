import { Skeleton } from "@nextui-org/react";

export default function Skeletonui() {
  return (
    <div className="min-w-72 mobiles:min-w-80 mobilem:min-w-96 tablet:min-w-100 laptop:min-w-128 p-4 border-b border-slate-200 pb-4">
      <div className="flex flex-row items-center">
        <Skeleton className="ml-1 mb-2 flex rounded-full w-7 h-7" />
        <Skeleton className="ml-3 h-4 w-2/5 rounded-lg" />
      </div>
      <Skeleton className="h-6 w-11/12 mb-2  rounded-lg" />
      <Skeleton className="h-4 mb-1  rounded-lg" />
      <Skeleton className="h-4 mb-2  rounded-lg" />

      <Skeleton className="h-3 mb-2 w-2/12 mt-8 rounded-lg" />
    </div>
  );
}
