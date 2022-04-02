import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";

const projectRouter = Router();

projectRouter.post("/project/create", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { title, description, from_date, to_date } = req.body;

        // 로그인 된 유저의 모든 project를 불러온 후 겹치는 제목이 있을경우 에러 발생.
        const projects = await projectService.getProjectAll({ user_id });

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].title === title) {
                throw new Error("이미 사용중인 제목입니다.");
            }
        }

        const newProject = await projectService.addProject({
            user_id,
            title,
            description,
            from_date,
            to_date,
        });
        if (newProject.errorMessage) {
            throw new Error(newProject.errorMessage);
        }

        return res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projects/:id", async function (req, res, next) {
    try {
        const { id } = req.params;

        const project = await projectService.getProject({ id });
        if (project.errorMessage) {
            throw new Error(project.errorMessage);
        }

        return res.status(200).json(project);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projectlist/:user_id", async function (req, res, next) {
    try {
        const { user_id } = req.params;

        const projects = await projectService.getProjectAll({ user_id });
        if (projects.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        return res.status(200).json(projects);
    } catch (error) {
        next(error);
    }
});

projectRouter.put("/projects/:id", login_required, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const { id } = req.params;
        const { title, description, from_date, to_date } = req.body;
        const toUpdate = { title, description, from_date, to_date };

        const project = await projectService.getProject({ id });
        // req.currentUserId의 값과 project.user_id의 값을 비교해 관리자 인증
        if (user_id !== project.user_id) {
            throw new Error("접근할 권한이 없습니다.");
        }

        const updatedProject = await projectService.setProject({ id }, { toUpdate });
        if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
        }

        return res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.delete("/projects/:id", login_required, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { currentUserId } = req;

        const project = await projectService.getProject({ id });
        // req.currentUserId의 값과 project.user_id의 값을 비교해 관리자 인증
        if (currentUserId !== project.user_id) {
            throw new Error("접근할 권한이 없습니다.");
        }

        const deletedProject = await projectService.deleteProject({ id });
        if (deletedProject.errorMessage) {
            throw new Error(deletedProject.errorMessage);
        }

        return res.status(200).json({ result: "success" });
    } catch (error) {
        next(error);
    }
});

export { projectRouter };
