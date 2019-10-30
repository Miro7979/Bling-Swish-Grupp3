module.exports = ({ expect, response }) => ({
    path: 'users',
    method: 'post',
    body: {
        "_id": "5d6ede6a0ba62570afcedd4a",
        "name": "Captain Bling",
        "password": "463759",
        "phone": "+455as24233",
        "email": "cptnbling@hej.com",
        "nationalIdNumber": "190002202712",
        "role": "child",
        "transactionsRecived": [],
        "transactionsSent": [],
        "children": [],
        "notifications": []
      },
    test() {
      expect(response.success).to.equal('User created');
    }
  });