const initData = () => (
    fetch('http://localhost/shop/')// eslint-disable-line
    .then(res => res.json())
);

export default initData;
