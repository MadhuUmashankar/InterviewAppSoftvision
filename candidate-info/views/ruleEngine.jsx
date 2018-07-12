

/* Inside Table */
const roleDefinition = {
  "HR" : {},
  "MANAGER" : {},
  "TA" : {
    "isShowDeleteButton" : true,
    "isShowProceedButton" : true,
    "isDisableRound" : true
  },
  "INTERVIEWER" : {}
};

const roleDefinitionOverall = {
  "HR" : {
    isShowProceedButton : true
  },
  "MANAGER" : {
    isShowProceedButton : true
  },
  "TA" : {
    isShowProceedButton : true
  },
  "INTERVIEWER" : {
    isShowProceedButton : false
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
        case 'INTERVIEWER' : {
          let candidateInterviewRecords = data.length > 0 && data.filter((record) => {
            return candidate._id === record.candidateID;
          });
        }
        default : {
          return candidateInterviewRecords;
          }
        }
    }
