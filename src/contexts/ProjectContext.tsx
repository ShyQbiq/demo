import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const PROJECTS = ["Westfield Tower", "Harbor Point Complex", "Skyline Plaza", "Meridian Campus"];

const SITES: Record<string, string[]> = {
  "Westfield Tower": ["Site A — Main Block", "Site B — Annex", "Site C — Parking"],
  "Harbor Point Complex": ["Site D — Waterfront", "Site E — Marina"],
  "Skyline Plaza": ["Site F — North Tower", "Site G — South Tower"],
  "Meridian Campus": ["Site H — East Wing", "Site I — West Wing"],
};

interface ProjectContextValue {
  projects: string[];
  sites: Record<string, string[]>;
  selectedProject: string;
  selectedSite: string;
  setSelectedProject: (project: string) => void;
  setSelectedSite: (site: string) => void;
  currentSites: string[];
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [selectedProject, setProject] = useState(PROJECTS[0]);
  const [selectedSite, setSite] = useState(SITES[PROJECTS[0]][0]);

  const setSelectedProject = useCallback((project: string) => {
    setProject(project);
    setSite(SITES[project][0]);
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        projects: PROJECTS,
        sites: SITES,
        selectedProject,
        selectedSite,
        setSelectedProject,
        setSelectedSite: setSite,
        currentSites: SITES[selectedProject] || [],
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProject must be used within ProjectProvider");
  return ctx;
}
