import React, { useEffect, useState } from "react";

function ProjectModal({ show, onClose, onSave, editProject }) {
  const [formData, setFormData] = useState({
    ProjectName: "",
    Details: "",
    startDate: "",
    EndDate: "",
    priority: "Medium",
    Department: "",
    status: "Pending",
  });

  useEffect(() => {
    if (editProject) {
      setFormData({
        ProjectName: editProject.ProjectName || "",
        Details: editProject.Details || "",
        startDate: editProject.startDate || "",
        EndDate: editProject.EndDate || "",
        priority: editProject.priority || "Medium",
        Department: editProject.Department || "",
        status: editProject.status || "Pending",
      });
    } else {
      setFormData({
        ProjectName: "",
        Details: "",
        startDate: "",
        EndDate: "",
        priority: "Medium",
        Department: "",
        status: "Pending",
      });
    }
  }, [editProject, show]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(formData);
  }

  if (!show) return null;

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editProject ? "Edit Project" : "Add New Project"}
              </h5>

              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ProjectName"
                    value={formData.ProjectName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Details</label>
                  <textarea
                    className="form-control"
                    name="Details"
                    value={formData.Details}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="EndDate"
                      value={formData.EndDate}
                      onChange={handleChange}
                      min={formData.startDate || undefined}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Department"
                    value={formData.Department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Priority</label>
                    <select
                      className="form-select"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>

                <button type="submit" className="btn btn-primary">
                  {editProject ? "Update Project" : "Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show" />
    </>
  );
}

export default ProjectModal;
