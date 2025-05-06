import { prisma } from "../db.config.js";

//  가게 추가
export const addStore = async (storeData) => {
  const store = await prisma.store.create({
    data: {
      name: storeData.store_name,
      address: storeData.store_address,
      regionId: storeData.store_region_id,
      categoryId: storeData.store_category_id,
    },
  });

  return store.id;
};

// 가게 조회
export const getStore = async (storeId) => {
  const store = await prisma.store.findFirst({
    where: { id: storeId },
  });

  return store;
};
