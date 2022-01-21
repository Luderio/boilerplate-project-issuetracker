'use strict';

const { response } = require("../server");
const mongoose = require('mongoose');

module.exports = function (app) {

  //DATABASE SETUP
  const mySecret = process.env['MONGO_URI'];
  mongoose.connect(mySecret);

  //SCHEMA
  const issueTrackerSchema = mongoose.Schema({
    "issue_title": String,
    "issue_text": String,
    "created_on": String,
    "updated_on": String,
    "created_by": String,
    "assigned_to": String,
    "status_text": String,
    "open": {"type": Boolean, "default": true},
    "project": String
  });

  //MODEL
  const IssueLogs = mongoose.model("IssueLogs", issueTrackerSchema);

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      //collects the search queries from the browser.
      let objectFilter = Object.assign(req.query);
      objectFilter['project'] = project;

      //to dispplay all issue records on '/api/issues//api/issues/apitest/
      IssueLogs.find(objectFilter,
      (error, issueRecords) => {
        if (error) return console.log(error);

        let logs = issueRecords;
        let logResult = logs.map(log => {

          let id = log.id;
          let issue_title = log.issue_title;
          let issue_text = log.issue_text;
          let created_on = log.created_on;
          let updated_on = log.updated_on;
          let created_by = log.created_by;
          let assigned_to = log.assigned_to;
          let open = log.open;
          let status_text = log.status_text;

          let issueLogs = {
            "_id": id,
            "issue_title": issue_title,
            "issue_text": issue_text,
            "created_on": created_on,
            "updated_on": updated_on,
            "created_by": created_by,
            "assigned_to": assigned_to,
            "open": open,
            "status_text": status_text
          };

          return issueLogs;
        });

        let responseObject = {};

        //outputs all issue logs from apitest.
        responseObject = logResult;
        res.json(responseObject);
      });
    })
    
    .post(function (req, res){
      let project = req.params.project;
      let issue_title = req.body.issue_title || res.json({"error": "required field(s) missing"});
      let issue_text = req.body.issue_text || res.json({"error": "required field(s) missing"});
      let created_by = req.body.created_by || res.json({"error": "required field(s) missing"});
      let assigned_to = req.body.assigned_to || '';
      let status_text = req.body.status_text || '';

      const newIssue = new IssueLogs({
        "issue_title": issue_title,
        "issue_text": issue_text,
        "created_on": new Date().toISOString(),
        "updated_on": new Date().toISOString(),
        "created_by": created_by,
        "assigned_to": assigned_to,
        "status_text": status_text,
        "open": true,
        "project": project
      });

      newIssue.save((error, issueData) => {
        if (error) return console.log(error);
        res.json({
          "_id": issueData.id,
          "open": issueData.open,
          "issue_title": issueData.issue_title,
          "issue_text": issueData.issue_text,
          "created_by": issueData.created_by,
          "assigned_to": issueData.assigned_to,
          "status_text": issueData.status_text,
          "created_on": issueData.created_on,
          "updated_on": issueData.updated_on
        });
      });

    })
    
    .put(function (req, res){
      let project = req.params.project;
      
      let newObjectDetails = {};
      
      Object.keys(req.body).forEach(key => {
        if (req.body[key] != '') {
          newObjectDetails[key] = req.body[key];
        }
      });

      if (Object.keys(newObjectDetails).length < 2) {
        return res.json({error: 'no update field(s) sent', '_id': newObjectDetails._id})
      }else if (!Object.keys(newObjectDetails).includes('_id')) {
        return res.json({ error: 'missing _id' });
      }else if (Object.keys(newObjectDetails).length >= 2) {
        newObjectDetails['updated_on'] = new Date().toISOString();
        IssueLogs.findOneAndUpdate
        (
          {"_id": newObjectDetails._id},
          newObjectDetails,
          {new: true},
          (error, updatedRecord) => {
            if (!error && updatedRecord) {
              return res.json({"result": 'successfully updated', "_id": updatedRecord._id});
            }else if (!updatedRecord) {
              return res.json({"error": "could not update", "_id": updatedRecord._id});
            }
          }
        );
      }

    })
    
    
    .delete(function (req, res){
      let project = req.params.project;
      
    });

    //the code below is used to clear the database. 

    /*IssueLogs.remove({}, (error, records) => {
      if (error) return console.log(error);
      console.log(records)
    });*/
    
};
