import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import type { IChangeLogDetail } from "@/types/change-log";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoaderPinwheel } from "lucide-react";
import { toast } from "sonner";

const ChangeLog = () => {
  const [changeLog, setChangeLog] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handlePageLoad = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/changelog`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to fetch change log.");

      const data = await res.json();
      setChangeLog(data);
    } catch (err) {
      toast.error("Failed to fetch change log.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePageLoad();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Change Log</h1>
      <p className="mb-4 text-muted-foreground">
        Welcome to OrderTrak! Below are the latest rollouts and updates to the
        platform.
      </p>

      {loading ? (
        <div className="flex justify-center items-center">
          <LoaderPinwheel className="h-32 w-32 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-6">
          {changeLog.length > 0 ? (
            changeLog.map((entry, idx) => (
              <Card
                key={entry._id || idx}
                className="border border-border shadow"
              >
                <CardHeader className="border-b border-border">
                  <CardTitle className="text-lg">
                    Rollout Date:{" "}
                    {entry.RollOutDate
                      ? new Date(entry.RollOutDate).toLocaleString()
                      : "Unknown"}
                  </CardTitle>
                  <CardDescription>
                    {entry.Details.length} update
                    {entry.Details.length !== 1 && "s"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    {Array.isArray(entry.Details) &&
                    entry.Details.length > 0 ? (
                      entry.Details.map((detail: IChangeLogDetail) => (
                        <li key={detail._id}>
                          <span className="font-mono bg-muted px-2 py-1 rounded text-sm">
                            {detail.TicketInfo}
                          </span>{" "}
                          <span className="text-muted-foreground text-sm">
                            by {detail.CreateName}
                          </span>
                        </li>
                      ))
                    ) : (
                      <li>No details for this rollout.</li>
                    )}
                  </ul>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-muted-foreground">
              No change log entries found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChangeLog;
