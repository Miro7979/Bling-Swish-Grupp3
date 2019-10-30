module.exports = ({ expect, response }) => ({
    path: 'login',
    method: 'get',
    test() {
      expect(response.name).to.equal('Lilla Mumintrollet');
      expect(response.role).to.equal('child');
    }
  });