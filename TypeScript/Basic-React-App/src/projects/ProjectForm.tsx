import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

export default function ProjectForm(props: ProjectFormProps) {
  const { project: initialProject, onSave, onCancel } = props;

  const [project, setProject] = useState<Project>(initialProject);
  const [errors, setErrors] = useState({
    name: "",
    description: "",
    budget: "",
  });

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    if (!isValid) return;
    onSave(project);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { type, name, value, checked } = e.target as HTMLInputElement;
    setProject((prevState) => {
      const updatedProject = new Project({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      });
      setErrors(() => validateFormData(updatedProject));
      return updatedProject;
    });
  };

  const validateFormData = (project: Project) => {
    let errors: any = { name: "", description: "", budget: "" };
    if (project.name.length === 0) {
      errors.name = "Name is required";
    }
    if (project.name.length > 0 && project.name.length < 3) {
      errors.name = "Name needs to be at least 3 characters.";
    }
    if (project.description.length === 0) {
      errors.description = "Description is required.";
    }
    if (project.budget === 0) {
      errors.budget = "Budget must be more than $0.";
    }
    return errors;
  };

  const isValid: boolean =
    errors.name.length === 0 &&
    errors.description.length === 0 &&
    errors.budget.length === 0;

  return (
    <form className="input-group vertical" onSubmit={handleSubmit}>
      <label htmlFor="name">Project Name</label>
      <input
        type="text"
        name="name"
        placeholder="enter name"
        value={project.name}
        onChange={handleChange}
      />
      {errors.name.length > 0 ? <ErrorMessage errorMsg={errors.name} /> : null}
      <label htmlFor="description">Project Description</label>
      <textarea
        name="description"
        placeholder="enter description"
        value={project.description}
        onChange={handleChange}
      />
      {errors.description.length > 0 ? (
        <ErrorMessage errorMsg={errors.description} />
      ) : null}
      <label htmlFor="budget">Project Budget</label>
      <input
        type="number"
        name="budget"
        placeholder="enter budget"
        value={project.budget}
        onChange={handleChange}
      />
      {errors.budget.length > 0 ? (
        <ErrorMessage errorMsg={errors.budget} />
      ) : null}
      <label htmlFor="isActive">Active?</label>
      <input
        type="checkbox"
        name="isActive"
        checked={project.isActive}
        onChange={handleChange}
      />
      <div className="input-group">
        <button className="primary bordered medium">Save</button>
        <span></span>
        <button className="bordered medium" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

interface ErrorMsg {
  errorMsg: String;
}

const ErrorMessage = ({ errorMsg }: ErrorMsg) => {
  return (
    <div className="card error">
      <p>{errorMsg}</p>
    </div>
  );
};
