export interface Project {
    title: string
    status: string
    cover: string
  }
  export interface Collective {
    title: string
    status: string
    cover: string
  }
  
  export const currentProjects: Project[] = [
    {
      title: "Forest Restoration Initiative",
      status: "Submitted",
      cover: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1682&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Urban Greening Movement",
      status: "Accepted",
      cover: "https://images.unsplash.com/photo-1591057298652-c04b56d4d3ee?q=80&w=1836&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Renewable Energy Sources",
      status: "Submitted",
      cover: "https://images.unsplash.com/photo-1543378993-e0041dcb24cc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Ocean Cleanup Campaign",
      status: "Accepted",
      cover: "https://images.unsplash.com/photo-1522092787785-60123fde65c4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]
  
  export const currentCollectives: Collective[] = [
    {
      title: "Renewable Energy Sources",
      status: "Live",
      cover: "https://images.unsplash.com/photo-1543378993-e0041dcb24cc?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Ocean Cleanup Campaign",
      status: "Upcoming",
      cover: "https://images.unsplash.com/photo-1522092787785-60123fde65c4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ]
  