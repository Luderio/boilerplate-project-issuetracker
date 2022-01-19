const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    suite('API Route Tests', function() {
        suite('API POST /api/issues/:project', function() {
            //Test 1: Create an issue with every field: POST request to /api/issues/{project}
            test('Create an issue with every field', function(done) {
                chai.request(server)
                .post('/api/issues/:project')
                .params({project: 'apitest'})
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.issue_title, 'Test Issue');
                    assert.equal(res.body.issue_text, 'Functional Tests - Test 1: issue with every field');
                    assert.equal(res.body.created_by, 'Luderio Sanchez');
                    assert.equal(res.body.assigned_to, 'Ian Rusiana');
                    assert.equal(res.body.status_text, 'Work in Progress');
                    done();
                });
            });
        });
    });
});
