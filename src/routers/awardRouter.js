import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardAuthService } from "../services/awardService";

const awardAuthRouter = Router();

awardAuthRouter.post("/award/create", login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const { title, description } = req.body;
    // 현재 로그인한 유저의 user_id를 가져와서 본인일 때만 생성할 수 있게 함
    const user_id = req.currentUserId;

    // 위 데이터를 수상 이력 db에 추가하기
    const newAward = await awardAuthService.addAward({
      user_id,
      title,
      description,
    });

    if (newAward.errorMessage) {
      throw new Error(newAward.errorMessage);
    }

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardAuthRouter.get('/awards/:id', login_required, async function (req, res, next) {
  try { 
    // req에서 id 가져오고 id로 수상 이력 조회
    const award = await awardAuthService.getAward({ awardId: req.params.id });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    // 조회된 수상 이력 보내기
    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
})

awardAuthRouter.get('/awardlist/:user_id', login_required, async function (req, res, next) {
  try {
    // req에서 user_id 가져오고 user_id로 수상 이력 조회
    const awards = await awardAuthService.getAwards({ user_id: req.params.user_id });

    if (awards.errorMessage) {
      throw new Error(awards.errorMessage);
    }

    // 조회된 수상 이력 보내기
    res.status(200).send(awards)
  } catch (error) {
    next(error);
  }
})

awardAuthRouter.put("/awards/:id", login_required, async function (req, res, next) {
  try {
    // req에서 데이터 가져오기
    const awardId = req.params.id;
    const { title, description } = req.body;
    // 현재 로그인한 유저의 user_id를 가져와서 본인일 때만 수정할 수 있게 함
    const user_id = req.currentUserId;
    
    // 수상 이력 내용 수정하기
    const updatedAward = await awardAuthService.setAward({ awardId, user_id, title, description});

    if (updatedAward.errorMessage) {
      throw new Error(updatedAward.errorMessage);
    }

    // 수정한 결과 보내기
    res.status(200).send(updatedAward)
  } catch (error) {
    next(error);
  }
})

awardAuthRouter.delete("/awards/:id", login_required, async function (req, res, next) {
  try {
    // req에서 데이터 가져와서 수상 이력 삭제하기
    const deletedAward = await awardAuthService.deleteAward({ awardId: req.params.id });

    if (deletedAward.errorMessage) {
      throw new Error(deletedAward.errorMessage);
    }

    // 삭제한 결과 보내기
    res.status(200).send("성공적으로 수상 이력이 삭제되었습니다.")
  } catch (error) {
    next(error);
  }
})

export { awardAuthRouter };
