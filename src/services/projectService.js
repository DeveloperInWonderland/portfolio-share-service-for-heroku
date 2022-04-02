import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async addProject({ user_id, title, description, from_date, to_date }) {
        const id = uuidv4();
        const newProject = { id, user_id, title, description, from_date, to_date };

        const createdNewProject = await Project.create({ newProject });

        return createdNewProject;
    }

    static async getProject({ id }) {
        const project = await Project.findById({ id });
        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return project;
    }

    static async getProjectAll({ user_id }) {
        const projects = await Project.findAll({ user_id });
        return projects;
    }

    static async setProject({ id }, { toUpdate }) {
        const project = await this.getProject({ id });
        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const setProject = await Project.update({ id }, { toUpdate });

        return setProject;
    }

    static async deleteProject({ id }) {
        const project = await this.getProject({ id });
        if (!project) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const deleteProject = await Project.delete({ id });

        return deleteProject;
    }
}

export { projectService };
