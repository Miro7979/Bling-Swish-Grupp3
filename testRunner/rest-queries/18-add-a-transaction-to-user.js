module.exports = ({ expect, response, store }) => ({
    path: 'users',
    method: 'post',
    body: {
      "name": "Captain Bling",
      "password": "463759",
      "phone": "+455as24233",
      "email": "cptnbling@hej.com",
      "nationalIdNumber": "190002202712",
      "role": "child",
      "transactionsRecived": [],
      "transactionsSent": [store.transactionId],
      "children": [],
      "notifications": []
    },
    test() {
      store.transactionId = response._id
      expect(response.success).to.equal('User created')
    }
  });