import { useState } from "react";

import ProjectSidebar from "./components/ProjectSidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handelAddTask(text) {
    setProjectState(pervState => {
      const taskId = Math.random();
      const newTask = {
        id: taskId,
        projectId: pervState.selectedProjectId,
        text: text
      }

      return {
        ...pervState,
        tasks: [...pervState.tasks, newTask]
      }
    });
  }

  function handelDeleteTask(id) {
    setProjectState(pervState => {
      return {
        ...pervState,
        tasks: pervState.tasks.filter(task => task.id !== id)
      }
    });
  }

  function handelSelectProject(id) {
    setProjectState(pervState => {
      return {
        ...pervState,
        selectedProjectId: id
      }
    });
  }

  function handelStartAddProject() {
    setProjectState(pervState => {
      return {
        ...pervState,
        selectedProjectId: null
      }
    });
  }

  function handelCancelAddProject() {
    setProjectState(pervState => {
      return {
        ...pervState,
        selectedProjectId: undefined
      }
    });
  }

  function handelDeleteProject() {
    setProjectState(pervState => {
      return {
        ...pervState,
        selectedProjectId: undefined,
        projects: pervState.projects.filter(project => project.id !== pervState.selectedProjectId)
      }
    });
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);

  let content = <SelectedProject
    project={selectedProject}
    onDelete={handelDeleteProject}
    tasks={projectState.tasks}
    onAddTask={handelAddTask}
    onDeleteTask={handelDeleteTask}
  />

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handelAddProject} onCancel={handelCancelAddProject} />;
  } else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handelStartAddProject} />
  }

  function handelAddProject(projectData) {
    setProjectState(pervState => {
      const projectId = Math.random();
      const newProject = {
        id: projectId,
        ...projectData
      }

      return {
        ...pervState,
        selectedProjectId: undefined,
        projects: [...pervState.projects, newProject]
      }
    });
  }

  console.log(projectState);

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar onSelectProject={handelSelectProject} onStartAddProject={handelStartAddProject} projects={projectState.projects} selectedProjectId={projectState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;
