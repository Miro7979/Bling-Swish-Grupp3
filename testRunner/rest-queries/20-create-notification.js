module.exports = ({ expect, response, store }) => ({
    path: 'notifications',
    method: 'post',
    body: {
        "message": "msg",
        "seen": true,
        "date": "2019-10-30",
        "user": "6d6ede6a0ba62570afcedd4a"
    },
    test() {
      expect(response.message).to.equal("msg")
    }
  });