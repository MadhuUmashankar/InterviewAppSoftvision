

/* Inside Table */
const roleDefinition = {
  "HR" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : true,
    "isDisableRound" : true,
    "endInterviewButton" : true
  },
  "MANAGER" : {
    "isShowDeleteButton" : false,
    "isShowProceedButton" : true,
    "isDisableRound" : true,
    "endInterviewButton" : false
  },
  "TA" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : false,
    "isDisableRound" : true,
    "endInterviewButton" : true
  },
  "TECH INTERVIEWER" : {
    "isShowDeleteButton" : false,
    "isShowProceedButton" : true,
    "isDisableRound" : false,
    "endInterviewButton" : false
  },
  "ADMIN" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : true,
    "isDisableRound" : true,
    "endInterviewButton" : true
  }
};

const roleDefinitionOverall = {
  "HR" : {
    isShowDeleteButton : true,
    isShowProceedButton : true,
    isDisableRound : true,
    endInterviewButton : true
  },
  "MANAGER" : {
    isShowDeleteButton : false,
    isShowProceedButton : true,
    isDisableRound : false,
    endInterviewButton : false
  },
  "TA" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : false,
    "isDisableRound" : true,
    "endInterviewButton" : true
  },
  "TECH INTERVIEWER" : {
    "isShowDeleteButton" : false,
    "isShowProceedButton" : true,
    "isDisableRound" : false,
    "endInterviewButton" : false
  },
  "ADMIN" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : true,
    "isDisableRound" : true,
    "endInterviewButton" : true
  },
  "Community manager" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : true,
    "isDisableRound" : true,
    "endInterviewButton" : true
  }

}

export const getRole = function(role) {
    let object = {};
    for(let i=0;i<role.length;i++) {
        let reply = roleDefinition[role[i]];
          Object.keys(reply).forEach(function(item, key) {
                object[item] = object[item] || reply[item];
          });
   }
   return object;
}

export const getOverallRole = function(role) {
  let object = {};
  for(let i=0;i<role.length;i++) {
      let reply = roleDefinitionOverall[role[i]];
        Object.keys(reply).forEach(function(item, key) {
              object[item] = object[item] || reply[item];
        });
 }
  return object;
}

export const getCandidateRecords = function(role, candidateInterviewRecords, candidate,data) {

    if(role.includes('TECH INTERVIEWER') && role.length == 1 ) {
      let candidateInterviewRecords = data.length > 0 && data.filter((record) => {
        return candidate._id === record.candidateID;
      });
      return candidateInterviewRecords;
    } else {
      return candidateInterviewRecords;
    }

}
