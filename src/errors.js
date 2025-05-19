export class CustomError extends Error {
  constructor(errorCode, reason, data) {
    super(reason);
    this.errorCode = errorCode;
    this.reason = reason;
    this.data = data;
  }
}

export class NotExistsError extends CustomError {
    constructor(reason, data = null) {
        super(reason, "NOT_EXISTS", 404, data);
    }
}

/*
User 관련 오류
*/

export class DuplicateUserEmailError extends Error {
    constructor(reason, data= null) {
      super(reason, "U001", 400 , data);
    }
  }


/*
mission_progress 관련 오류
*/

  export class MissionAlreadyInProgressByAnotherUserError extends Error {
    constructor(reason, data = null){
      super(reason, "MP001", )
    }
}

export class MissionAlreadyInProgressBySameUserError extends Error {
  constructor(reason, data) {
      super(reason, "MP002");
    }
}

/*
Review 관련 에러
*/
export class ReviewAlreadyExistsError extends Error {
  constructor(reason, data){
    super(reason, "R001");
  }
}
