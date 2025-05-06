export const bodyToUser = (body) => {
  return {
    name: body.name,
    gender: body.gender,
    birth: body.birth,
    address: body.address || "",
    email: body.email || "",
    locationOk: body.location_ok,
    marketingOk: body.marketing_ok,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    id: user.id.toString(),
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address || "",
    detailAddress: user.detailAddress || "",
    phoneNumber: user.phoneNumber || "",
    point: user.point ?? 0,
    phoneVerification: user.phoneVerification ?? false,
    locationOk: user.userTerms?.locationChk ?? false,
    marketingOk: user.userTerms?.marketingChk ?? false,
    preferCategory: preferFoods,
  };
};