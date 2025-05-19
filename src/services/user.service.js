import { responseFromUser } from "../dtos/user.dto.js";
import { bodyToUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import {DuplicateUserEmailError} from "../errors.js";

export const userSignUp = async (body) => {
  const userDto = bodyToUser(body);  //  DTO 매핑 적용

  const joinUserId = await addUser(userDto);  // Prisma에 맞는 필드 구조

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", {
      email: body.email,
    });
  }

  for (const preference of userDto.preferences ?? []) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};