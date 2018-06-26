var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mongojs = require('mongojs');
var uuid = require('uuid');
var db = mongojs('mongodb://localhost:27017/candidateInformationTable', ['candidateInformationTables', 'evaluationSheetInformationTables', 'managerEvaluationInformationTables', 'hrEvaluationInformationTables'], 'users');


// Get all Manager Evaluaton  Info
router.get('/candidateInfo/newManagerForm', function(req, res, next){

    db.managerEvaluationInformationTables.find(function(err, managerEvaluationInformationTables){
        if(err){
            res.send(err);
        }
        res.json(managerEvaluationInformationTables);
    });
});

// Get all HR Evaluation Info
router.get('/candidateInfo/newHREvaluationForm', function(req, res, next){

    db.hrEvaluationInformationTables.find(function(err, hrEvaluationInformationTables){
        if(err){
            res.send(err);
        }
        res.json(hrEvaluationInformationTables);
    });
});


// Save HR evaulation data
router.post('/candidateInfo/newHREvaluationForm', function(req, res, next){
    var hrEvaluator = req.body;

    db.hrEvaluationInformationTables.save(hrEvaluator, function(err, hrEvaluator){
        if(err){
            res.send(err);
        }
        res.json(hrEvaluator);
    });

});

// Save Manager evaulation data
router.post('/candidateInfo/newManagerForm', function(req, res, next){
    var managerEvaluator = req.body;

    db.managerEvaluationInformationTables.save(managerEvaluator, function(err, managerEvaluator){
        if(err){
            res.send(err);
        }
        res.json(managerEvaluator);
    });

});

//Save New user
router.post('/candidateInfo/newUser', function(req, res, next){
    var user = req.body;
    if(!user.username || !user.email || !(user.password + '') || !(user.confirmpassword + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.users.save(user, function(err, user){
            if(err){
                res.send(err);
            }
            res.json(user);
        });
    }
});

// Get All candidate Info
router.get('/candidateInfo', function(req, res, next){
    db.candidateInformationTables.find(function(err, candidateInformationTables){
        if(err){
            res.send(err);
        }
        res.json(candidateInformationTables);
    });
});


// Get All IA Info
router.get('/candidateInfo/newIAForm', function(req, res, next){
    db.evaluationSheetInformationTables.find(function(err, evaluationSheetInformationTables){
        if(err){
            res.send(err);
        }
        res.json(evaluationSheetInformationTables);
    });
});


// Get single IA Info
router.get('/candidateInfo/newIAForm/:id', function(req, res, next){

    db.evaluationSheetInformationTables.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, evaluator){
        if(err){
            res.send(err);
        }
        res.json(evaluator);
    });
});


// Get Single Task
router.get('/candidateInfo/:id', function(req, res, next){
    db.candidateInformationTables.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, candidate){
        if(err){
            res.send(err);
        }
        res.json(candidate);
    });
});

//Save Candidate Resume
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './upload');
    }
    ,
    filename: function (req, file, cb) {
        const newFilename = `${(file.originalname)}`;
       cb(null, newFilename);
    }
  })

  var upload = multer({ storage})


router.post('/candidateInfo/upload', upload.single('selectedFile'), (req, res) => {
    res.send();
})




// Delete IA form
router.delete('/candidateInfo/newIAForm/:id', function(req, res, next){
    db.evaluationSheetInformationTables.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, IAdata){
        if(err){
            res.send(err);
        }
        res.json(IAdata);
    });
});

// Delete Manager form
router.delete('/candidateInfo/newManagerForm/:id', function(req, res, next){
    db.managerEvaluationInformationTables.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, managerEvaluationData){
        if(err){
            res.send(err);
        }
        res.json(managerEvaluationData);
    });
});

// Delete HR form
router.delete('/candidateInfo/newHREvaluationForm/:id', function(req, res, next){
    db.hrEvaluationInformationTables.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, hrEvaluationData){
        if(err){
            res.send(err);
        }
        res.json(hrEvaluationData);
    });
});


router.post('/candidateInfo/newCandidate', function(req, res, next){
    var candidate = req.body;

    if(!candidate.firstname || !(candidate.lastname + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.candidateInformationTables.save(candidate, function(err, candidate){
            if(err){
                res.send(err);
            }
            res.json(candidate);

        });
    }
});


// Delete Candidate Info
router.delete('/candidateInfo/:id', function(req, res, next){
    db.candidateInformationTables.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, candidate){
        if(err){
            res.send(err);
        }
        res.json(candidate);
    });
});

// Update Candidate Info
router.put('/candidateInfo/:id', function(req, res, next){
    var candidate = req.body;
    var updcandidateInfo = {};

    if(candidate.candidateID){
        updcandidateInfo.candidateID = candidate.candidateID;
    }
    if(candidate.firstname){
        updcandidateInfo.firstname = candidate.firstname;
    }

    if(candidate.lastname){
        updcandidateInfo.lastname = candidate.lastname;
    }
    if(candidate.skills){
        updcandidateInfo.skills = candidate.skills;
    }
    if(candidate.email){
        updcandidateInfo.email = candidate.email;
    }
    if(candidate.phone){
        updcandidateInfo.phone = candidate.phone;
    }
    if(candidate.alternateNumber){
        updcandidateInfo.alternateNumber = candidate.alternateNumber;
    }
    if(candidate.city){
        updcandidateInfo.city = candidate.city;
    }
    if(candidate.state){
        updcandidateInfo.state = candidate.state;
    }

    if(candidate.selectedFile_name){
          updcandidateInfo.selectedFile_name = candidate.selectedFile_name;
    }
    if(candidate.selectedFile){
        updcandidateInfo.selectedFile = candidate.selectedFile;
    }
    if(candidate.resume){
        updcandidateInfo.resume = candidate.resume;
    }
    if(!updcandidateInfo){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.candidateInformationTables.update({_id: mongojs.ObjectId(req.params.id)},updcandidateInfo, {}, function(err, candidate){
            if(err){
                res.send(err);
            }
            res.json(candidate);
        });
    }
});

//Save IA Form Details Values
router.post('/candidateInfo/newIAForm', function(req, res, next){
    var evaluator = req.body;

    db.evaluationSheetInformationTables.save(evaluator, function(err, evaluator){
        if(err){
            res.send(err);
        }
        res.json(evaluator);
    });

});



// Update IA Form
router.put('/candidateInfo/newIAForm/:id', function(req, res, next){
    var evaluator = req.body;
     let updatedIA = {};

     if(evaluator.candidateID){
        updatedIA.candidateID = evaluator.candidateID;
    }
    if(evaluator.interviewDate){
        updatedIA.interviewDate = evaluator.interviewDate;
    }
    if(evaluator.interviewerName){
        updatedIA.interviewerName = evaluator.interviewerName;
    }
    if(evaluator.experience){
        updatedIA.experience = evaluator.experience;
    }
    if(evaluator.rows){
        updatedIA.rows = evaluator.rows;
    }
    if(evaluator.impression){
        updatedIA.impression = evaluator.impression;
    }
    if(evaluator.summaryData){
        updatedIA.summaryData = evaluator.summaryData;
    }
    if(evaluator.interviewStatus){
        updatedIA.interviewStatus = evaluator.interviewStatus;
    }

    if(!Object.keys(updatedIA).length){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.evaluationSheetInformationTables.update({_id: mongojs.ObjectId(req.params.id)},updatedIA, function(err, evaluator){
            if(err){
                res.send(err);
            }
            res.json(evaluator);
        });
    }
});


// Update Manager Form
router.put('/candidateInfo/newManagerForm/:id', function(req, res, next){
    var managerEvaluator = req.body;
     let updatedManagerInfo = {};

     if(managerEvaluator._id){
        updatedManagerInfo._id = managerEvaluator._id;
    }
    if(managerEvaluator.customerNeeds){
        updatedManagerInfo.customerNeeds = managerEvaluator.customerNeeds;
    }
    if(managerEvaluator.clientProcess){
        updatedManagerInfo.clientProcess = managerEvaluator.clientProcess;
    }
    if(managerEvaluator.clientRelationship){
        updatedManagerInfo.clientRelationship = managerEvaluator.clientRelationship;
    }
    if(managerEvaluator.clientOrientationRatings){
        updatedManagerInfo.clientOrientationRatings = managerEvaluator.clientOrientationRatings;
    }
    if(managerEvaluator.clientOrientationComments){
        updatedManagerInfo.clientOrientationComments = managerEvaluator.clientOrientationComments;
    }
    if(managerEvaluator.planningControl){
       updatedManagerInfo.planningControl = managerEvaluator.planningControl;
   }
   if(managerEvaluator.peopleManagement){
       updatedManagerInfo.peopleManagement = managerEvaluator.peopleManagement;
   }
   if(managerEvaluator.projectManagementRatings){
       updatedManagerInfo.projectManagementRatings = managerEvaluator.projectManagementRatings;
   }
   if(managerEvaluator.projectManagementComments){
       updatedManagerInfo.projectManagementComments = managerEvaluator.projectManagementComments;
   }
   if(managerEvaluator.leadership){
       updatedManagerInfo.leadership = managerEvaluator.leadership;
   }
   if(managerEvaluator.leadershipRatings){
       updatedManagerInfo.leadershipRatings = managerEvaluator.leadershipRatings;
   }
   if(managerEvaluator.leadershipComments){
       updatedManagerInfo.leadershipComments = managerEvaluator.leadershipComments;
   }
   if(managerEvaluator.communication){
      updatedManagerInfo.communication = managerEvaluator.communication;
  }
  if(managerEvaluator.communicationRatings){
      updatedManagerInfo.communicationRatings = managerEvaluator.communicationRatings;
  }
  if(managerEvaluator.communicationComments){
      updatedManagerInfo.communicationComments = managerEvaluator.communicationComments;
  }
  if(managerEvaluator.domain){
      updatedManagerInfo.domain = managerEvaluator.domain;
  }
  if(managerEvaluator.domainRatings){
      updatedManagerInfo.domainRatings = managerEvaluator.domainRatings;
  }
  if(managerEvaluator.domainComments){
      updatedManagerInfo.domainComments = managerEvaluator.domainComments;
  }
  if(managerEvaluator.requirementGathering){
      updatedManagerInfo.requirementGathering = managerEvaluator.requirementGathering;
  }
  if(managerEvaluator.architecht){
      updatedManagerInfo.architecht = managerEvaluator.architecht;
  }
  if(managerEvaluator.coding){
      updatedManagerInfo.coding = managerEvaluator.coding;
  }
  if(managerEvaluator.testing){
      updatedManagerInfo.testing = managerEvaluator.testing;
  }
  if(managerEvaluator.technicalSolutionsRatings){
      updatedManagerInfo.technicalSolutionsRatings = managerEvaluator.technicalSolutionsRatings;
  }
  if(managerEvaluator.technicalSolutionsComments){
      updatedManagerInfo.technicalSolutionsComments = managerEvaluator.technicalSolutionsComments;
  }
  if(managerEvaluator.interviewerName2){
      updatedManagerInfo.interviewerName2 = managerEvaluator.interviewerName2;
  }
  if(managerEvaluator.jobTitle){
      updatedManagerInfo.jobTitle = managerEvaluator.jobTitle;
  }
  if(managerEvaluator.interviewerRound){
      updatedManagerInfo.interviewerRound = managerEvaluator.interviewerRound;
  }

    if(!Object.keys(updatedManagerInfo).length){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.managerEvaluationInformationTables.update({_id: mongojs.ObjectId(req.params.id)},updatedManagerInfo, function(err, managerEvaluator){
            if(err){
                res.send(err);
            }
            res.json(managerEvaluator);
        });
    }
});


// Update HR Form
router.put('/candidateInfo/newHREvaluationForm/:id', function(req, res, next){
    var hrEvaluator = req.body;
     let updatedHRInfo = {};

     if(hrEvaluator.candidateID){
        updatedHRInfo.candidateID = hrEvaluator.candidateID;
    }
    if(hrEvaluator.intelligence){
        updatedHRInfo.intelligence = hrEvaluator.intelligence;
    }
    if(hrEvaluator.intensity){
        updatedHRInfo.intensity = hrEvaluator.intensity;
    }
    if(hrEvaluator.commitment){
        updatedHRInfo.commitment = hrEvaluator.commitment;
    }
    if(hrEvaluator.teamWork){
        updatedHRInfo.teamWork = hrEvaluator.teamWork;
    }
    if(hrEvaluator.hrInterviewStatus){
        updatedHRInfo.hrInterviewStatus = hrEvaluator.hrInterviewStatus;
    }
    if(hrEvaluator.interviewerName1){
        updatedHRInfo.interviewerName1 = hrEvaluator.interviewerName1;
    }
    if(hrEvaluator.jobTitle){
        updatedHRInfo.jobTitle = hrEvaluator.jobTitle;
    }
    if(hrEvaluator.interviewerRound){
        updatedHRInfo.interviewerRound = hrEvaluator.interviewerRound;
    }

    if(!Object.keys(updatedHRInfo).length){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.hrEvaluationInformationTables.update({_id: mongojs.ObjectId(req.params.id)},updatedHRInfo, function(err, hrEvaluator){
            if(err){
                res.send(err);
            }
            res.json(hrEvaluator);
        });
    }
});
module.exports = router;
