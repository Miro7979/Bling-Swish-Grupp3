module.exports = ({ expect, response }) => ({
  path: 'login',
  method: 'get',
  test() {
    expect(response.name).to.equal('Lilla Mumientrollet');
    expect(response.role).to.equal('child');
  }
});