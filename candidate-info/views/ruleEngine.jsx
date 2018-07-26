

/* Inside Table */
const roleDefinition = {
  "HR" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : true,
    "isDisableRound" : true,
    "endInterviewButton" : true
  },
  "MANAGER" : {},
  "TA" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : false,
    "isDisableRound" : true,
    "endInterviewButton" : true
  },
  "TECH INTERVIEWER" : {
    "isShowProceedButton" : true,
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
    isShowProceedButton : true
  },
  "TA" : {
    isShowProceedButton : false,
    endInterviewButton : true
  },
  "TECH INTERVIEWER" : {
    isShowProceedButton : true
  },
  "ADMIN" : {
    isShowDeleteButton : true,
    isShowProceedButton : true,
    isDisableRound : true,
    endInterviewButton : true
  }

}

export const getRole = function(role) {
  return roleDefinition[role];
}

export const getOverallRole = function(role) {
    return roleDefinitionOverall[role];
}

export const getCandidateRecords = function(role, candidateInterviewRecords, candidate,data) {
    switch(role) {
        case 'TA' : {
            return candidateInterviewRecords;
        }
        case 'HR' : {
            return candidateInterviewRecords;
        }
        case 'MANAGER' : {
            return candidateInterviewRecords;
        }
        case 'TECH INTERVIEWER' : {
          let candidateInterviewRecords = data.length > 0 && data.filter((record) => {
            return candidate._id === record.candidateID;
          });
        }
        case 'ADMIN' : {
            return candidateInterviewRecords;
        }
        default : {
          return candidateInterviewRecords;
          }
        }
    }
