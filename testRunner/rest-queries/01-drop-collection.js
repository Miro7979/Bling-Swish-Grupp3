module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'delete',
  test() {
    expect(response.nonJSON).to.equal('page not found.');
  }
});
