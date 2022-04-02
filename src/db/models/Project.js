import { ProjectModel } from "../schemas/project";

class Project {
    static create({ newProject }) {
        return ProjectModel.create(newProject);
    }

    static findById({ id }) {
        return ProjectModel.findOne({ id });
    }

    static findAll({ user_id }) {
        return ProjectModel.find({ user_id });
    }

    static update({ id }, { toUpdate }) {
        return ProjectModel.findOneAndUpdate({ id }, toUpdate, { new: true });
    }

    static delete({ id }) {
        return ProjectModel.findOneAndDelete({ id });
    }
}

export { Project };
