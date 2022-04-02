import { EducationModel } from "../schemas/education";

class Education {
  static createOne(newEducation) {
    return EducationModel.create(newEducation);
  }

  static findManyByUserId({ user_id }) {
    return EducationModel.find({ user_id: user_id });
  }

  static findManyByFilter( filter ) {
    return EducationModel.find(filter);
  }

  static findOneById({ id }) {
    return EducationModel.findOne({ id: id });
  }

  static findOneByFilter( filter ) {
    return EducationModel.findOne(filter);
  }

  static updateOne({ id, user_id, school, major, position }) {
    return EducationModel.findOneAndUpdate(
      { id, user_id },
      { school, major, position },
      { returnOriginal: false }
    );
  }

  static deleteOne({ id, user_id }) {
    return EducationModel.deleteOne({ id: id, user_id: user_id });
  }
}

export { Education };
