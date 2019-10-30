module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    name: 'Dick Tracy',
    password: '463759',
  },
  test() {
    expect(response.name).to.equal('Dick Tracy');
    expect(response.role).to.equal('admin');
  }
});