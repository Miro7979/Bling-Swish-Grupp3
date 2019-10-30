module.exports = ({ expect, response }) => ({
  path: "login",
  method: "post",
  body: {
    name: "Lilla Mumintrollet",
    password: "463759"
  },
  test() {
    expect(response.name).to.equal("Lilla Mumintrollet");
    expect(response.role).to.equal("child");
  }
});
