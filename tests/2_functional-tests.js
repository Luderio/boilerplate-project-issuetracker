const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let id1 = '';
let id2 = '';

suite('Functional Tests', function() {
    suite('API Route Tests', function() {
        suite('API POST /api/issues/:project', function() {
            
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
                    console.log('id 1 has been set as: ' + id2);
                    done();
                });
            });

            //Test 3: Create an issue with missing required fields: POST request to /api/issues/{project}
            test('Create an issue with missing required fields', function(done) {
                chai.request(server)
                .post('/api/issues/apitest')
                .send({
                    "issue_title": 'Test Issue 2',
                    
                })
                .end(function(error, response) {
                    assert.equal(response.body.error, 'required field(s) missing');
                    done();
                });
            });



        });
    });
});
