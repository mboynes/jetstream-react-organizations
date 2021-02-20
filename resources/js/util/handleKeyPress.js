export default (key, callback) => (e) => {
  if (e.key === key) {
    callback();
  }
};
