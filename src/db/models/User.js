import { UserModel } from "../schemas/user";

class User {
    static create({ newUser }) {
        return UserModel.create(newUser);
    }

    static findOne({ email }) {
        return UserModel.findOne({ email });
    }

    static findById({ user_id }) {
        return UserModel.findOne({ id: user_id });
    }

    static findAll({ perPage, page, id }) {
        return UserModel.find({ id: { $ne: id }, validated: { $ne: false } })
            .sort({ createdAt: -1 })
            .skip(perPage * (page - 1))
            .limit(perPage);
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, option);
        return updatedUser;
    }

    static delete({ user_id }) {
        return UserModel.findOneAndDelete({ id: user_id });
    }

    static async findOneAndUpdateByEmail(email, { name, image, validated, oauth }) {
        const filter = { email: email };
        const update = { name, image, validated, oauth };
        const option = { returnOriginal: false };

        return await UserModel.findOneAndUpdate(filter, update, option);
    }

    static findOneAndUpdate({ user_id }, { password }) {
        return UserModel.findOneAndUpdate({ id: user_id }, { password });
    }

    static countDocuments() {
        return UserModel.countDocuments({});
    }
}

export { User };
