import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // 학력 조회 및 중복 확인
    const preEducation = await Education.findManyByFilter({ user_id, school, major, position });

    if(preEducation.length > 0) {
      const errorMessage = "이미 입력한 학력입니다.";
      return { errorMessage };
    }

    // 새 학력
    const newEducation = { id: uuidv4(), user_id, school, major, position };

    // 학력 추가
    const createdNewEducation = await Education.createOne(newEducation);

    return createdNewEducation;
  }

  static async getEducation({ id }) {
    // 학력 조회
    const foundEducation = await Education.findOneById({ id });

    // 학력 조회에 실패한 경우 에러메세지
    if (!foundEducation) {
      const errorMessage = "존재하지 않는 학력입니다.";
      return { errorMessage };
    }

    return foundEducation;
  }

  static async getEducations({ user_id }) {
    // 학력 조회
    const foundEducations = await Education.findManyByUserId({ user_id });
    // 학력이 required가 아니기때문에, 빈 배열인 경우도 그대로 반환
    return foundEducations;
  }

  static async setEducation({ id, user_id, school, major, position }) {
    // 학력 수정
    const updatedEducation = await Education.updateOne({
      id,
      user_id,
      school,
      major,
      position,
    });

    // 학력 수정에 실패한 경우 에러메세지
    if (!updatedEducation) {
      const errorMessage = "학력 수정에 실패했습니다.";
      return { errorMessage };
    }

    return updatedEducation;
  }

  static async deleteEducation({ id, user_id }) {
    // 학력 삭제
    const deletedEducation = await Education.deleteOne({ id, user_id });

    // 학력 삭제에 실패한 경우 에러메세지
    if (deletedEducation.deletedCount === 0) {
      const errorMessage = "학력 삭제에 실패했습니다";
      return { errorMessage };
    } 

    // 학력 삭제에 성공한 경우
    const successMessage = `총 ${deletedEducation.deletedCount}개의 메세지를 삭제하였습니다.`;
    return successMessage;
  }
}

export { educationService };
