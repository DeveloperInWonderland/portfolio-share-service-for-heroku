import { AwardModel } from "../schemas/award";

class Award {
    static create({ newAward }) {
        return AwardModel.create(newAward);
    }

    static async findOneById({ awardId }) {
        const award = await AwardModel.findOne({ id: awardId });
        return award;
    }

    static async findManyByUserId({ user_id }) {
        const awards = await AwardModel.find({ user_id });
        return awards;
    }

    static async updateOne({ user_id, awardId, title, description }) {
        const option = { returnOriginal: false }

        const updatedAward = await AwardModel.findOneAndUpdate(
            { id: awardId, user_id },
            { title, description },
            option
        )
        return updatedAward;
    }

    static async deleteOne({ awardId }) {
        const deletedAward = await AwardModel.deleteOne({ id: awardId });
        return deletedAward;
    }

    // 수상 이력 중복 확인하기
    static async findDuplicates ({ user_id, title, description}) {
        const duplicateAward = await AwardModel.find({ user_id, title, description });
        return duplicateAward;
    }

}

export { Award };
