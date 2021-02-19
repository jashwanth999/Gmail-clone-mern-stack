import axios from "axios";
const instance = axios.create({
  baseURL: "https://ml8sb.sse.codesandbox.io"
});
export default instance;
