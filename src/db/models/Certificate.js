import { CertificateModel } from "../schemas/certificate";

class Certificate {
    static create({ newCertificate }) {
        return CertificateModel.create(newCertificate);
    }

    static findById({ id }) {
        return CertificateModel.findOne({ id });
    }

    static findAll({ user_id }) {
        return CertificateModel.find({ user_id });
    }

    static update({ id }, { toUpdate }) {
        return CertificateModel.findOneAndUpdate({ id }, toUpdate, { new: true });
    }

    static delete({ id }) {
        return CertificateModel.findOneAndDelete({ id });
    }
}

export { Certificate };
