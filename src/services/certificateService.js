import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateService {
    static async addCertificate({ user_id, title, description, when_date }) {
        const id = uuidv4();
        const newCertificate = { id, user_id, title, description, when_date };

        const createdNewCertificate = await Certificate.create({ newCertificate });

        return createdNewCertificate;
    }

    static async getCertificate({ id }) {
        const certificate = await Certificate.findById({ id });
        if (!certificate) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return certificate;
    }

    static async getCertificateAll({ user_id }) {
        const certificates = await Certificate.findAll({ user_id });
        return certificates;
    }

    static async setCertificate({ id }, { toUpdate }) {
        const certificate = await this.getCertificate({ id });
        if (!certificate) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const setCertificate = await Certificate.update({ id }, { toUpdate });

        return setCertificate;
    }

    static async deleteCertificate({ id }) {
        const certificate = await this.getCertificate({ id });

        if (!certificate) {
            const errorMessage = "프로젝트를 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        const deleteCertificate = await Certificate.delete({ id });

        return deleteCertificate;
    }
}

export { certificateService };
