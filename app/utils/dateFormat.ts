import moment from "moment";

export default function (data: string) {
  return moment(data).format("llll");
}
