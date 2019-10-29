module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    name: 'Stora Mumientrollet',
    password: '463759',
    role: 'parent'
  },
  test() {
    expect(response.name).to.equal('Stora Mumientrollet');
    expect(response.role).to.equal('parent');
  }
});