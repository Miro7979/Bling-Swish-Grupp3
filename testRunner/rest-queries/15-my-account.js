module.exports = ({ expect, response }) => ({
    path: 'imuser',
    method: 'get',
    test() {
      expect(response[0].name).to.equal('Lilla Mumintrollet');
      expect(response[0].role).to.equal('child');
    }
  });