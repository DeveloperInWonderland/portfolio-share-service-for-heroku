import { Blog } from "../db";
import { v4 as uuidv4 } from "uuid";

class blogService {
  static async addBlog({ user_id, service, url }) {
    // 중복 확인
    const preBlog = await Blog.findManyByFilter({ user_id, service, url });

    if(preBlog.length > 0) {
      const errorMessage = "이미 입력한 학력입니다.";
      return { errorMessage };
    }

    // 블로그 생성
    const newBlog = { id: uuidv4(), user_id, service, url };
    const createdNewBlog = await Blog.createOne(newBlog);

    // 블로그 생성 실패한 경우
    if (createdNewBlog.errorMessage) {
      const errorMessage = "블로그 저장에 실패하였습니다.";
      return { errorMessage };
    }

    return createdNewBlog;
  }

  static async getBlog({ id }) {
    // 블로그 조회
    const foundBlog = await Blog.findOneById({ id });

    // 블로그 조회 실패한 경우
    if (!foundBlog) {
      const errorMessage = "존재하지 않는 블로그 항목 입니다.";
      return { errorMessage };
    }

    return foundBlog;
  }

  static async getBlogs({ user_id }) {
    // 블로그 조회
    const foundBlogs = await Blog.findManyByUserId({ user_id });
    return foundBlogs;
  }

  static async setBlog({ id, user_id, service, url }) {
    // 블로그 수정
    const updatedBlog = await Blog.updateOne({ id, user_id, service, url });

    // 블로그 수정 실패시 에러메세지
    if (!updatedBlog) {
      const errorMessage = "블로그 수정에 실패했습니다.";
      return { errorMessage };
    }

    return updatedBlog;
  }

  static async deleteBlog({ id, user_id }) {
    // 블로그 삭제
    const deletedBlog = await Blog.deleteOne({ id, user_id });

    // 블로그 삭제 실패시 에러메시지
    if (deletedBlog.deletedCount === 0) {
      const errorMessage = "블로그 삭제에 실패했습니다.";
      return { errorMessage };
    }

    // 블로그 삭제에 성공한 경우
    const successMessage = `총 ${deletedBlog.deletedCount}개의 메세지를 삭제하였습니다.`;
    return successMessage;
  }
}

export { blogService };
