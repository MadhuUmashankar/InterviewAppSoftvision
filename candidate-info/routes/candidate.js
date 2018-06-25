var express = require('express');
var router = express.Router();
var path = require('path');
var multer = require('multer');
var mongojs = require('mongojs');
var uuid = require('uuid');
var db = mongojs('mongodb://localhost:27017/candidateInformationTable', ['candidateInformationTables', 'evaluationSheetInformationTables']);


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

module.exports = router;
