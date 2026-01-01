import DefaultPageContainer from "@/components/Commons/DefaultPageContainer";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tabs } from "@radix-ui/react-tabs";
import { createFileRoute, Link } from "@tanstack/react-router";
import PerformanceOverview from "../profile/-components/Performance";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ClipboardCopy } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

export const Route = createFileRoute("/(authenticated)/(layout)/play/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <DefaultPageContainer className="h-screen items-center justify-center gap-6">
      <Button asChild>
        <Link to="/match/queue">
          Procurar partida
        </Link>
      </Button>
      <Dialog>
        <DialogTrigger>
          <Button variant={"ghost"}>
            Convidar amigo
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar amigo</DialogTitle>
            <DialogDescription>
              Copie o link abaixo para convidar um amigo para uma partida.
            </DialogDescription>
          </DialogHeader>
          <DialogDescription>
            <Button
              onClick={handleCopy}
              variant={'ghost'}>
              link
              <Tooltip open={copied}>
                <TooltipTrigger>
                  <ClipboardCopy />
                </TooltipTrigger>
                <TooltipContent>
                  copiado
                </TooltipContent>
              </Tooltip>
            </Button>
          </DialogDescription>
          <DialogFooter>
            aaaaaaaa
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DefaultPageContainer >
  );
}
