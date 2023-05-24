const getCurrentDate = () => {
  const d = new Date();
  const z = (n: number) => `0${n}`.slice(-2);
  const zz = (n: number) => `00${n}`.slice(-3);
  let off = d.getTimezoneOffset();
  const sign = off > 0 ? '-' : '+';
  off = Math.abs(off);

  const formatedDate = `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(
    d.getDate()
  )}T${z(d.getHours())}:${z(d.getMinutes())}:${z(d.getSeconds())}.${zz(
    d.getMilliseconds()
    // eslint-disable-next-line no-bitwise
  )}${sign}${z((off / 60) | 0)}:${z(off % 60)}`;
  return formatedDate;
};

export default getCurrentDate;
