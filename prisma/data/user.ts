export async function mockUsers() {
  return [{
    name: 'test',
    email: 'test@test.test',
    password: await Bun.password.hash('testtesttest'),
  }]
}
