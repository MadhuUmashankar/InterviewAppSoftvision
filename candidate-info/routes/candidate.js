var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mongojs = require('mongojs');
var uuid = require('uuid');
var passport = require('passport');
require('../config/passport')(passport);
var db = mongojs('mongodb://localhost:27017/candidateInformationTable', ['candidateInformationTables', 'evaluationSheetInformationTables', 'managerEvaluationInformationTables', 'hrEvaluationInformationTables']);


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


// Get All candidate Info
router.get('/candidateInfo', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        db.candidateInformationTables.find(function(err, candidateInformationTables){
            if(err){
                res.send(err);
            }
            res.json(candidateInformationTables);
        });
    } else {
      return res.status(401).send({success: false, msg: 'Unauthorized.'});
    }
});

// Get All IA Info
router.get('/candidateInfo/newIAForm', function(req, res, next){
    db.evaluationSheetInformationTables.find({candidateID: "kb9381165hc"}, function(err, evaluationSheetInformationTables){
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
router.get('/candidateInfo/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        db.candidateInformationTables.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, candidate){
            if(err){
                res.send(err);
            }
            res.json(candidate);
        });
    } else {
      return res.status(401).send({success: false, msg: 'Unauthorized.'});
    }
});

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

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

    if(managerEvaluator.candidateID){
        updatedManagerInfo.candidateID = managerEvaluator.candidateID;
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
    if(managerEvaluator.managerInterviewStatus){
        updatedManagerInfo.managerInterviewStatus = managerEvaluator.managerInterviewStatus;
    }
    if(managerEvaluator.clientOrientationRatings1){
        updatedManagerInfo.clientOrientationRatings1 = managerEvaluator.clientOrientationRatings1;
    }
    if(managerEvaluator.clientOrientationComments1){
        updatedManagerInfo.clientOrientationComments1 = managerEvaluator.clientOrientationComments1;
    }
    if(managerEvaluator.clientOrientationRatings2){
        updatedManagerInfo.clientOrientationRatings2 = managerEvaluator.clientOrientationRatings2;
    }
    if(managerEvaluator.clientOrientationComments2){
        updatedManagerInfo.clientOrientationComments2 = managerEvaluator.clientOrientationComments2;
    }
    if(managerEvaluator.clientOrientationRatings3){
        updatedManagerInfo.clientOrientationRatings3 = managerEvaluator.clientOrientationRatings3;
    }
    if(managerEvaluator.clientOrientationComments3){
        updatedManagerInfo.clientOrientationComments3 = managerEvaluator.clientOrientationComments3;
    }
    if(managerEvaluator.projectManagementRatings){
        updatedManagerInfo.projectManagementRatings = managerEvaluator.projectManagementRatings;
    }
    if(managerEvaluator.projectManagementComments){
        updatedManagerInfo.projectManagementComments = managerEvaluator.projectManagementComments;
    }
    if(managerEvaluator.leadershipRatings){
        updatedManagerInfo.leadershipRatings = managerEvaluator.leadershipRatings;
    }
    if(managerEvaluator.leadershipComments){
        updatedManagerInfo.leadershipComments = managerEvaluator.leadershipComments;
    }
    if(managerEvaluator.communicationRatings){
        updatedManagerInfo.communicationRatings = managerEvaluator.communicationRatings;
    }
    if(managerEvaluator.communicationComments){
        updatedManagerInfo.communicationComments = managerEvaluator.communicationComments;
    }
    if(managerEvaluator.domainRatings){
        updatedManagerInfo.domainRatings = managerEvaluator.domainRatings;
    }
    if(managerEvaluator.domainComments){
        updatedManagerInfo.domainComments = managerEvaluator.domainComments;
    }
    if(managerEvaluator.technicalSolutionsRatings1){
        updatedManagerInfo.technicalSolutionsRatings1 = managerEvaluator.technicalSolutionsRatings1;
    }
    if(managerEvaluator.technicalSolutionsComments1){
        updatedManagerInfo.technicalSolutionsComments1 = managerEvaluator.technicalSolutionsComments1;
    }
    if(managerEvaluator.technicalSolutionsRatings2){
        updatedManagerInfo.technicalSolutionsRatings2 = managerEvaluator.technicalSolutionsRatings2;
    }
    if(managerEvaluator.technicalSolutionsComments2){
        updatedManagerInfo.technicalSolutionsComments2 = managerEvaluator.technicalSolutionsComments2;
    }
    if(managerEvaluator.technicalSolutionsRatings3){
        updatedManagerInfo.technicalSolutionsRatings3 = managerEvaluator.technicalSolutionsRatings3;
    }
    if(managerEvaluator.technicalSolutionsComments3){
        updatedManagerInfo.technicalSolutionsComments3 = managerEvaluator.technicalSolutionsComments3;
    }
    if(managerEvaluator.technicalSolutionsRatings4){
        updatedManagerInfo.technicalSolutionsRatings4 = managerEvaluator.technicalSolutionsRatings4;
    }
    if(managerEvaluator.technicalSolutionsComments4){
        updatedManagerInfo.technicalSolutionsComments4 = managerEvaluator.technicalSolutionsComments4;
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
