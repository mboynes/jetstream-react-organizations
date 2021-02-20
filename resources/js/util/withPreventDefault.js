export default (callable) => (e) => {
  e.preventDefault();
  callable();
};
