module.exports = ({ expect, response }) => ({
  path: 'users',
  method: 'post',
  test() {
    expect(response.nonJSON).to.equal('Page not found.');
  }
});