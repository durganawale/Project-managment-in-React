
import axiosInstance from "./axiosInstance";

// Get all projects
export async function getAllProjects() {
  try {
    const res = await axiosInstance.get("/projects");
    return res.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

// Get project by ID
export async function getProjectByID(ID) {
  try {
    const res = await axiosInstance.get(`/projects/${ID}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

// Create new project
export async function createProject(data) {
  try {
    const res = await axiosInstance.post("/projects", data);
    return res.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

// Update project
export async function updateProject(ID, data) {
  try {
    const res = await axiosInstance.patch(`/projects/${ID}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
}

// Update project status
export async function updateStatus(ID, data) {
  try {
    const res = await axiosInstance.patch(`/projects/${ID}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating status:", error);
    throw error;
  }
}

// Delete project
export async function deleteProject(ID) {
  try {
    const res = await axiosInstance.delete(`/projects/${ID}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
}
