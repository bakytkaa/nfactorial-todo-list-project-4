export const randomString = () => Math.random().toString(16).slice(2);
export const createTask = (text) => ({
  id: randomString(),
  text,
  done: false,
  trashed: false,
});
