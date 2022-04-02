import mongoose from "mongoose";
import { User } from "./models/User";
import { Award } from "./models/Award";
import { Education } from "./models/Education";
import { Certificate } from "./models/Certificate";
import { Project } from "./models/Project";
import { Blog } from "./models/Blog";

const DB_URL = process.env.MONGODB_URL || "MongoDB 서버 주소가 설정되지 않았습니다.\n./db/index.ts 파일을 확인해 주세요.";

mongoose.connect(DB_URL);
const db = mongoose.connection;

import { AlertModel } from "./schemas/alert";
import { ProjectModel } from "./schemas/project";

db.once("open", function () {
    const projects = db.collection("projects");
    const projectStream = projects.watch();

    projectStream.on("change", async (change) => {
        const type = change.operationType;
        switch (type) {
            case "insert":
                const user = await User.findById({ user_id: change.fullDocument.user_id });
                await AlertModel.create({
                    id: change.documentKey._id,
                    title: `'${change.fullDocument.title}' 프로젝트가 생성되었습니다.`,
                    user: user.name,
                    changedAt: change.fullDocument.createdAt,
                });
                break;

            case "update":
                const project = await ProjectModel.findById(change.documentKey._id);
                const user1 = await User.findById({ user_id: project.user_id });
                await AlertModel.create({
                    id: change.documentKey._id,
                    title: `'${project.title}' 프로젝트가 업데이트되었습니다.`,
                    user: user1.name,
                    changedAt: change.updateDescription.updatedFields.updatedAt,
                });
                break;

            // case "delete":
            //     await AlertModel.create({
            //         title: "프로젝트가 삭제되었습니다.",
            //         changedAt: Date.now(),
            //     });
            //     break;
        }
    });
});

db.on("connected", () => console.log("정상적으로 MongoDB 서버에 연결되었습니다.  " + DB_URL));
db.on("error", (error) => console.error("MongoDB 연결에 실패하였습니다...\n" + DB_URL + "\n" + error));

export { User, Education, Certificate, Project, Award, Blog };
