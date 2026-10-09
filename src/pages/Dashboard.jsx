import React, { useEffect, useState } from "react";
import { getAllProjects, deleteProject } from "../api/projectApi";
import "./Dashboard.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState({});
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [priorityStatus, setPriorityStatus] = useState("All");
  const [departmentStatus, setDepartmentStatus] = useState("All");

  // Fetch all projects
  async function fetchAllData() {
    try {
      const projectsData = await getAllProjects();
      setProjects(Array.isArray(projectsData) ? projectsData : []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  // Search + Filter logic
  const filteredProjects = projects.filter((project) => {
    const searchText = search.trim().toLowerCase();

    const projectName = String(
      project.ProjectName || project.title || project.name || "",
    ).toLowerCase();

    const department = String(project.Department || "").toLowerCase();
    const priority = String(project.priority || "").toLowerCase();
    const projectStatus = String(project.status || "").toLowerCase();

    // Search by project name, department, priority and status
    const searchMatch =
      projectName.includes(searchText) ||
      department.includes(searchText) ||
      priority.includes(searchText) ||
      projectStatus.includes(searchText);

    // Status dropdown filter
    const statusMatch =
      filterStatus === "All" || projectStatus === filterStatus.toLowerCase();

    // Priority dropdown filter
    const priorityMatch =
      priorityStatus === "All" || priority === priorityStatus.toLowerCase();

    // Department dropdown filter
    const departmentMatch =
      departmentStatus === "All" ||
      department === departmentStatus.toLowerCase();

    return searchMatch && statusMatch && priorityMatch && departmentMatch;
  });

  // Handle status selection locally
  const handleChange = (id, value) => {
    setStatus((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Delete project
  async function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmDelete) return;

    try {
      await deleteProject(id);

      setProjects((prev) => prev.filter((project) => project.id !== id));

      alert("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Unable to delete project");
    }
  }

  // Load projects when the component mounts
  useEffect(() => {
    fetchAllData();
  }, []);

  // Create department options from API data
  const departments = [
    ...new Set(projects.map((project) => project.Department).filter(Boolean)),
  ];

  return (
    <>
      <div className="filtersearch">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, priority, department or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In-progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Priority filter */}
        <select
          value={priorityStatus}
          onChange={(e) => setPriorityStatus(e.target.value)}
        >
          <option value="All">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Department filter */}
        <select
          value={departmentStatus}
          onChange={(e) => setDepartmentStatus(e.target.value)}
        >
          <option value="All">All Departments</option>

          {departments.map((department) => (
            <option key={department} value={department}>
              {department}
            </option>
          ))}
        </select>

        {/* Reset filters */}
        <button
          type="button"
          onClick={() => {
            setSearch("");
            setFilterStatus("All");
            setPriorityStatus("All");
            setDepartmentStatus("All");
          }}
        >
          Reset
        </button>
      </div>

      <div>
        <button type="button">Add New Project</button>
      </div>

      <div className="project-table-card">
        <table className="project-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Project Name (Details)</th>
              <th>Department</th>
              <th>Priority</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <tr key={project.id}>
                  <td>{index + 1}</td>

                  <td>
                    {project.ProjectName ||
                      project.title ||
                      project.name ||
                      "N/A"}
                  </td>

                  <td>{project.Department || "N/A"}</td>
                  <td>{project.priority || "N/A"}</td>
                  <td>{project.startDate || "N/A"}</td>
                  <td>{project.EndDate || "N/A"}</td>

                  <td>
                    <select
                      className="status-select"
                      value={status[project.id] ?? project.status ?? "Pending"}
                      onChange={(e) => handleChange(project.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In-progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        alert("Edit functionality is not added yet.")
                      }
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No projects found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
