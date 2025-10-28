import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const ErrorCard = ({ error }: { error: Error }) => {
  return (
    <Card
      className="mt-6 border-destructive w-[250px]"
      data-testid="error-card"
    >
      <CardHeader>
        <CardTitle className="text-destructive">Error</CardTitle>
        <CardDescription>{error.message}</CardDescription>
      </CardHeader>
    </Card>
  );
};
