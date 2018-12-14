import moment from "moment";

const actualData = uniqDate => {
  return uniqDate.filter(item => {
    return (
      moment.unix(item.time).format("YYYY-MM-DD") ===
      moment().format("YYYY-MM-DD")
    );
  });
};

export default actualData;
