import * as views from "./views";
export default (st, parms) => `
${views[st.view](st, parms)}`;
