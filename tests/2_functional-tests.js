const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const res = require('express/lib/response');

chai.use(chaiHttp);

let id1 = '';
let id2 = '';

suite('Functional Tests', function() {
    suite('API Route Tests', function() {
        //Test Suite for the POST Route
        /*suite('API POST /api/issues/:project', function() {
            
            //Test 1: Create an issue with every field: POST request to /api/issues/{project}
            test('Create an issue with every field', function(done) {
                chai.request(server)
                .post('/api/issues/apitest')
                .send({
                    "issue_title": 'Test Issue',
                    "issue_text": 'Functional tests - Every field filled in',
                    "created_by": 'Luderio Sanchez',
                    "assigned_to": 'Ian Rusiana',
                    "status_text": 'In Progress'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.issue_title, 'Test Issue');
                    assert.equal(response.body.issue_text, 'Functional tests - Every field filled in');
                    assert.equal(response.body.created_by, 'Luderio Sanchez');
                    assert.equal(response.body.assigned_to, 'Ian Rusiana');
                    assert.equal(response.body.status_text, 'In Progress');
                    id1 = response.body._id;
                    console.log('id 1 has been set as: ' + id1);
                    done();
                });
            });

            //Test 2: Create an issue with only required fields: POST request to /api/issues/{project}
            test('Create an issue with only required fields', function(done) {
                chai.request(server)
                .post('/api/issues/apitest')
                .send({
                    "issue_title": 'Test Issue 2',
                    "issue_text": 'Functional tests - Every field filled in',
                    "created_by": 'Luderio Sanchez',
                    "assigned_to": '',
                    "status_text": ''
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.equal(response.body.issue_title, 'Test Issue 2');
                    assert.equal(response.body.issue_text, 'Functional tests - Every field filled in');
                    assert.equal(response.body.created_by, 'Luderio Sanchez');
                    assert.equal(response.body.assigned_to, '');
                    assert.equal(response.body.status_text, '');
                    id2 = response.body._id;
                    console.log('id 2 has been set as: ' + id2);
                    done();
                });
            });

            //Test 3: Create an issue with missing required fields: POST request to /api/issues/{project}
            test('Create an issue with missing required fields', function(done) {
                chai.request(server)
                .post('/api/issues/apitest')
                .send({
                    "issue_title": 'Test Issue 3',
                    
                })
                .end(function(error, response) {
                    assert.equal(response.body.error, 'required field(s) missing');
                    done();
                });
            });
        });

        //TEST Suite for the GET Route
        suite('API GET /api/issues/:project//api/issues/apitest/', function() {

            //Test 4: View issues on a project: GET request to /api/issues/{project}
            test('View issues on a project (no filter)', function(done) {
                chai.request(server)
                .get('/api/issues/apitest')
                .query({})
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isArray(response.body);
                    assert.property(response.body[0], '_id');
                    assert.property(response.body[0], 'issue_title');
                    assert.property(response.body[0], 'issue_text');
                    assert.property(response.body[0], 'created_on');
                    assert.property(response.body[0], 'updated_on');
                    assert.property(response.body[0], 'created_by');
                    assert.property(response.body[0], 'assigned_to');
                    assert.property(response.body[0], 'open');
                    assert.property(response.body[0], 'status_text');
                    done();
                });
            });

            //Test 5: View issues on a project with one filter: GET request to /api/issues/{project}
            test('View issues on a project with one filter', function(done) {
                chai.request(server)
                .get('/api/issues/apitest')
                .query({"issue_text": 'Functional tests - Every field filled in'})
                .end(function(error, response) {
                    response.body.forEach((issueResult) => {
                        assert.equal(issueResult.issue_text, 'Functional tests - Every field filled in');
                    });
                    done();
                });
            });

            //Test 6: View issues on a project with multiple filters: GET request to /api/issues/{project}
            test('View issues on a project with multiple filters', function(done) {
                chai.request(server)
                .get('/api/issues/apitest')
                .query({"issue_text": 'Functional tests - Every field filled in', "assigned_to": 'Ian Rusiana'})
                .end(function(error, response) {
                    response.body.forEach((issueResult) => {
                        assert.equal(issueResult.issue_text, 'Functional tests - Every field filled in');
                        assert.equal(issueResult.assigned_to, 'Ian Rusiana');

                    });
                    done();
                });
            });
        });*/

        //Test Suite for the PUT Route..
        suite('API PUT /api/issues/:project', function() {

            //Test 7: Update one field on an issue: PUT request to /api/issues/{project}..
            test('Update one field on an issue', function(done) {
                chai.request(server)
                .put('/api/issues/apitest')
                .send({
                    "_id": '61ea47cf9c5c2604166c6ae4',
                    "issue_title": 'Test Issue'
                })
                .end(function(error, response) {
                    assert.equal(response.status, 200);
                    assert.isObject(response.body);
                    assert.property(response.body, 'result');
                    assert.property(response.body, '_id');
                    done();
                });
            });

            //Test 8: Update multiple fields on an issue: PUT request to /api/issues/{project}
            test('Update multiple fields on an issue', function(done) {

            });

            //Test 9: Update an issue with missing _id: PUT request to /api/issues/{project}
            test('Update an issue with missing _id', function(done) {

            });

            //Test 10: Update an issue with no fields to update: PUT request to /api/issues/{project}
            test('Update an issue with no fields to update', function(done) {

            });

            //Test 11: Update an issue with an invalid _id: PUT request to /api/issues/{project}
            test('Update an issue with an invalid _id', function(done) {

            });

        });
    });
});
