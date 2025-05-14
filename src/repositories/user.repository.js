import { prisma } from "../db.config.js";


// ✅ 사용자 생성 (트랜잭션 포함 + 이메일 중복 체크)
export const addUser = async (data) => {
  try {
    const result = await prisma.$transaction(async (tx) => {
      // 약관 저장
      const userTerms = await tx.userTerms.create({
        data: {
          locationChk: data.locationChk,
          marketingChk: data.marketingChk,
        },
      });

      // 사용자 저장
      const user = await tx.user.create({
        data: {
          email: data.email,
          name: data.name,
          gender: data.gender,
          birth: data.birth,
          phoneNumber: data.phoneNumber, 
          address: data.address,
          point: data.point ?? 0,
          phoneVerification: data.phoneVerification ?? false,
          userTermsId: userTerms.id,
        },
      });
      // ✅ tx 안에서 선호 카테고리 저장
      if (Array.isArray(data.preferences)) {
        for (const foodCategoryId of data.preferences) {
          await tx.prefer.create({
            data: {
              userId: user.id,
              foodCategoryId,
            },
          });
        }
      }

      return user.id;
    });


  
    return result;
  } catch (err) {
    if (err.code === 'P2002') {
      // 이메일 중복 (UNIQUE 제약 위반)
      return null;
    }
    throw err;
  }
};

// ✅ 사용자 정보 가져오기
export const getUser = async (userId) => {
  return await prisma.user.findFirst({
    where: { id: userId },
  });
};

// ✅ 선호 카테고리 저장
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.prefer.create({
    data: {
      userId,
      foodCategoryId,
    },
  });
};

// ✅ 선호 카테고리 조회
export const getUserPreferencesByUserId = async (userId) => {
  return await prisma.prefer.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: {
        select: {
          categoryName: true,
        },
      },
    },
    where: { userId },
    orderBy: { foodCategoryId: "asc" },
  });
};
