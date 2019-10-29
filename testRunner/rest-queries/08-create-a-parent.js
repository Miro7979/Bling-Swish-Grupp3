module.exports = ({ response, repeat, store, i, expect }) => ({
  path: 'users',
  method: 'get',
  role: 'parent',
  body: store.dummyUsers[i].role['parent'],
  test() {
    // does the server say user created
    expect(response.success).to.equal('User created');
    // repeat this query as long as more dummy users
    if(store.dummyUsers.role === 'parent'[i + 1]){ repeat(); }
  }
});