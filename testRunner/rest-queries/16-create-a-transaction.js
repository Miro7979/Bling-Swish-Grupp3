module.exports = ({ expect, response, store }) => ({
    path: 'transactions',
    method: 'post',
    body: {
        date: "2019-10-30" ,
        amount: "200",
        fromUser: "3d6ede6a0ba62570afcedd3a",
        toUser: "4d6ede6a0ba62570afcedd3a"
    },
    test() {
      store.transactionId = response._id
      expect(response._id.length > 0).to.equal(true)
    }
  });