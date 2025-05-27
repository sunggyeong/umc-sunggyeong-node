import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import { Strategy as NaverStrategy } from 'passport-naver-v2';

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  console.log("🔥 GOOGLE 전략 실행됨", profile?.emails?.[0]?.value);

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id.toString()  //BigInt 대응
        , email: user.email, name: user.name };
  }
  //약관 동의 후 백엔드 처리
  const userTerms = await prisma.userTerms.create({
  data: {
    locationChk: true,
    marketingChk: false,
    },
    });

  const createdUser = await prisma.user.create({
  data: {
    email,
    name: profile.displayName || "추후 수정",
    gender: "추후 수정",
    birth: new Date(1970, 0, 1),
    address: "추후 수정",
    detailAddress: "추후 수정",
    phoneNumber: "추후 수정",
    userTermsId: userTerms.id,
  },
});

  return { id: createdUser.id.toString(), email: createdUser.email, name: createdUser.name };
};

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      console.log("🔥 NAVER 전략 실행됨", profile?.email); // ✅ 로그 위치를 try 블럭 맨 앞에 둔다

      const email = profile.email;
      const name = profile.name || profile.nickname || "추후 수정";

      if (!email) {
        throw new Error("profile.email is missing");
      }

      const existingUser = await prisma.user.findFirst({ where: { email } });
      if (existingUser) {
        return done(null, {
          id: existingUser.id.toString(),
          email: existingUser.email,
          name: existingUser.name,
        });
      }

      const userTerms = await prisma.userTerms.create({
        data: {
          locationChk: true,
          marketingChk: false,
        },
      });

      const newUser = await prisma.user.create({
        data: {
          email,
          name,
          gender: "추후 수정",
          birth: new Date(1970, 0, 1),
          address: "추후 수정",
          detailAddress: "추후 수정",
          phoneNumber: "추후 수정",
          userTermsId: userTerms.id,
        },
      });

      return done(null, {
        id: newUser.id.toString(),
        email: newUser.email,
        name: newUser.name,
      });
    } catch (err) {
      console.error("❌ NAVER 로그인 에러:", err);
      return done(err);
    }
  }
);