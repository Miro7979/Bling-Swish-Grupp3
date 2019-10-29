module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    expect(response.name).to.equal('Stora Mumientrollet');
    expect(response.role).to.equal('parent');
  }
});