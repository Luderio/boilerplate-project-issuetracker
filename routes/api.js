'use strict';

const { response } = require("../server");

module.exports = function (app) {

  //DATABASE SETUP
  const mySecret = process.env['MONGO_URI'];
  mongoose.connect(mySecret);

  //SCHEMA
  const issueTrackerSchema = mongoose.Schema({
    "issueTitle": {"type": String, "required": true},
    "issueText": {"type": String, "required": true},
    "createdOn": String,
    "updatedOn": String,
    "createdBy": String,
    "assignedTo": String,
    "statusText": String,
    "open": true
  });

  //MODEL
  const IssueLogs = mongoose.model("IssueLogs", issueTrackerSchema);

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title;
      let issue_text = req.body.issue_text;
      let created_by = req.body.created_by;
      let assigned_to = req.body.assigned_to;
      let status_text = req.body.status_text;

      const newIssue = new IssueLogs({
        "issueTitle": issue_title,
        "issueText": issue_text,
        "createdOn": new Date(),
        "updatedOn": new Date(),
        "createdBy": created_by,
        "assignedTo": assigned_to,
        "statusText": status_text,
        "open": true
      });

      newIssue.save((error, issueData) => {
        if (error) return console.log(error);
        response.json({
          "_id": issueData.id,
          "open": issueData.open,
          "issue_title": issueData.issueTitle,
          "issue_text": issueData.issueText,
          "created_by": issueData.createdBy,
          "assigned_to": issueData.assignedTo,
          "status_text": issueData.statusText,
          "created_on": issueData.createdOn,
          "updated_on": issueData.updatedOn
        });
      });

    })
    
    .put(function (req, res){
      let project = req.params.project;
      
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });
    
};
