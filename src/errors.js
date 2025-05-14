/*
User 관련 오류
*/

export class DuplicateUserEmailError extends Error {
    errorCode = "U001";
  
    constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
  }


/*
mission 관련 오류
*/
  export class MissionNotFoundError extends Error {
  errorCode = "M001";

  constructor(reason , data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}


/*
mission_progress 관련 오류
*/

  export class MissionAlreadyInProgressByAnotherUserError extends Error {
    errorCode = "MP001";
  constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

export class MissionAlreadyInProgressBySameUserError extends Error {
  errorCode = "MP002";
  constructor(reason, data) {
      super(reason);
      this.reason = reason;
      this.data = data;
    }
}

/*
review 관련 오류
*/
export class ReviewVisitNotFoundError extends Error {
  errorCode = "R001";

  constructor(reason = "방문 내역이 존재하지 않아 리뷰를 작성할 수 없습니다.", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class ReviewAlreadyExistsError extends Error {
  errorCode = "R002";

  constructor(reason = "해당 방문에 대한 리뷰는 이미 존재합니다.", data = {}) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
