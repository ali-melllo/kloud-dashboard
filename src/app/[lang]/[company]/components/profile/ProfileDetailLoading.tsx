import { Skeleton } from "@/registry/new-york/ui/skeleton";

export default function ProfileDetailLoading() {
    return (
        <div className="flex flex-col gap-y-6">
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
            <Skeleton className="h-7 bg-muted w-full" />
        </div>
    )
}