module.exports = ({ response, expect }) => ({
  path: 'users',
  method: 'get',
 
  test() {
    // does the server say user created
    expect(response.length > 0).to.equal(true);
  }
});