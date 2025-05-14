export const bodyToUser = (body) => {
  return {
    name: body.name,
    gender: body.gender,
    birth: new Date(body.birth),
    address: body.address || "",
    email: body.email || "",
    phoneNumber: body.phoneNumber || "",
    locationChk: body.location_ok??body.locationChk, 
    marketingChk: body.marketing_ok??body.marketingChk, 
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
    locationChk: user.userTerms?.locationChk ?? false,
    marketingChk: user.userTerms?.marketingChk ?? false,
    preferCategory: preferFoods,
  };
};