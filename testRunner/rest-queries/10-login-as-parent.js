module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'post',
  body: {
    name: 'Stora Mumintrollet',
    password: '463759',
  },
  test() {
    expect(response.name).to.equal('Stora Mumintrollet');
    expect(response.role).to.equal('parent');
  }
});