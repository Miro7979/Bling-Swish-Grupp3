module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'delete',
  test() {
    expect(response.status).to.equal('logged out');
  }
});