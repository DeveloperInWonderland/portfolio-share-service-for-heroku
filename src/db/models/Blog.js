import { BlogModel } from "../schemas/blog";

class Blog {
  static createOne(newBlog) {
    return BlogModel.create(newBlog);
  }

  static findManyByUserId({ user_id }) {
    return BlogModel.find({ user_id: user_id });
  }

  static findManyByFilter(filter) {
    return BlogModel.find(filter);
  }

  static findOneById({ id }) {
    return BlogModel.findOne({ id: id });
  }

  static updateOne({ id, user_id, service, url }) {
    return BlogModel.findOneAndUpdate(
      { id, user_id },
      { service, url },
      { returnOriginal: false }
    );
  }

  static deleteOne({ id, user_id }) {
    return BlogModel.deleteOne({ id, user_id });
  }
}

export { Blog };
