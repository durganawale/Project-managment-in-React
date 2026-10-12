import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProjectDetails.css";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`https://674e84f1635bad45618eebc1.mockapi.io/api/v1/projects/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Project not found");
        }
        return response.json();
      })
      .then((data) => setProject(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!project) {
    return <h3>Loading project details...</h3>;
  }

  return (
    <div className="project-detail-page">
      <div className="project-detail-card">
        <div className="project-card-header">
          <div>
            <span className="project-label">PROJECT DETAILS</span>
            <h1>{project.ProjectName}</h1>
            <p>{project.Details}</p>
          </div>

          <span className="status-badge">{project.status}</span>
        </div>

        <div className="project-details-grid">
          <div className="detail-item">
            <span>Project ID</span>
            <h3>#{project.id}</h3>
          </div>

          <div className="detail-item">
            <span>Department</span>
            <h3>{project.Department}</h3>
          </div>

          <div className="detail-item">
            <span>Priority</span>
            <h3 className={`priority-${project.priority?.toLowerCase()}`}>
              {project.priority}
            </h3>
          </div>

          <div className="detail-item">
            <span>Status</span>
            <h3>{project.status}</h3>
          </div>

          <div className="detail-item">
            <span>Start Date</span>
            <h3>{project.startDate}</h3>
          </div>

          <div className="detail-item">
            <span>End Date</span>
            <h3>{project.EndDate}</h3>
          </div>
        </div>

        <button className="back-project-btn" onClick={() => navigate(-1)}>
          ← Back to Projects
        </button>
      </div>
    </div>
  );
}

export default ProjectDetails;
