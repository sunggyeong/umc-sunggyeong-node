export const bodyToUser = (body) => {
  
    return {
      name: body.name,
      gender : body.gender,
      birth:body.birth,
      address: body.address || "",
      email: body.email || "",
      location_ok: body.location_ok,
      marketing_ok:body.marketing_ok,
      preferences: body.preferences
    };
  };

  export const responseFromUser = (data) => {
    return {
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,   
        gender : data.user.gender,
        birth:data.user.birth,
        address: data.user.address || "",
        email: data.user.email || "",
        location_ok: data.user.location_ok,
        marketing_ok:data.user.marketing_ok,
        preferences: data.preferences
      }
    };}