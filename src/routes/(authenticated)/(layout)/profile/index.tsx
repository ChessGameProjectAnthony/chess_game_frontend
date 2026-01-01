import { createFileRoute, Link } from "@tanstack/react-router";
import ProfilePic from "./-components/ProfilePic";
import DefaultPageContainer from "@/components/Commons/DefaultPageContainer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceOverview from "./-components/Performance";
import HistoryList from "./-components/HistoryList";

export const Route = createFileRoute("/(authenticated)/(layout)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <DefaultPageContainer>
      <div className="flex items-center justify-left gap-12 bg-amber-50 m-0 mt-4">
        <ProfilePic />
        <h3 className="text-[2.5rem] font-semibold">Username</h3>
      </div>
      <div className="flex items-center justify-end gap-12 my-2">
        <Button variant={"ghost"}>
          <Link to="/profile/manage-account">
            Manage account
          </Link>
        </Button>
      </div>
      <Tabs className="w-full">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="performance">
            <PerformanceOverview />
          </TabsContent>
          <TabsContent value="history">
            <HistoryList />
          </TabsContent>
        </Tabs>
      </Tabs>
    </DefaultPageContainer>

  )
}
