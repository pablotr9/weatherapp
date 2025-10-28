import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const EmptyCard = () => {
  return (
    <Card className="mt-6 w-[500px]" data-testid="empty-card">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Select a location and a date to see the weather.</p>
      </CardContent>
    </Card>
  );
};
