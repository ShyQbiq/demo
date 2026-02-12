import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import { AssistantPanel } from "@/components/assistant/AssistantPanel";
import { AssistantProvider } from "@/contexts/AssistantContext";
import { ProjectProvider } from "@/contexts/ProjectContext";
import { RightPaneProvider, useRightPane } from "@/contexts/RightPaneContext";
import { StepProvider } from "@/contexts/StepContext";

function RightPane() {
  const { content } = useRightPane();
  if (!content) return null;
  return (
    <aside className="w-[340px] shrink-0 border-l bg-card overflow-y-auto h-full p-4">
      {content}
    </aside>
  );
}

export function AppLayout() {
  return (
    <ProjectProvider>
      <AssistantProvider>
        <RightPaneProvider>
          <StepProvider>
            <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
              <TopBar />
              <div className="flex flex-1 min-h-0">
                <AssistantPanel />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 min-w-0">
                  <Outlet />
                </main>
                <RightPane />
              </div>
            </div>
          </StepProvider>
        </RightPaneProvider>
      </AssistantProvider>
    </ProjectProvider>
  );
}
