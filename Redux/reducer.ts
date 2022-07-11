// eslint-disable-next-line import/no-extraneous-dependencies
import { combineReducers } from "redux";

// for layouting, header, sidebar, footer etc...
import Layout from "./layout/reducer";
// for findings, github repo, etc...
import Findings from "./findings/reducer";
import AssesmentSession from "./assesmentSession/reducer";

const rootReducer = combineReducers({
  layout: Layout,
  findings: Findings,
  assesmentSession: AssesmentSession,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
