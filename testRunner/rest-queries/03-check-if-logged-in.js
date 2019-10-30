module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    expect(response.name).to.equal('Dick Tracy');
    expect(response.role).to.equal('admin');
  }
});