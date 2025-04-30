import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (body) => {
  const joinUserId = await addUser({
      name: body.name,
      gender : body.gender,
      birth:body.birth,
      address: body.address,
      email: body.email ,
      location_ok: body.location_ok,
      marketing_ok:body.marketing_ok,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of body.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};