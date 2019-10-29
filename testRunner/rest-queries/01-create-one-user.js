module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'post',
  body: {
    name: 'Dick Tracy',
    password: '463759',
    role: 'admin',
  },
  test() {
    expect(response.name).to.equal('Dick Tracy');
    expect(response.role).to.equal('admin');
  }
});
