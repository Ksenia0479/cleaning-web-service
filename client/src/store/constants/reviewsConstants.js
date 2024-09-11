// utils
import { generateActions } from "utils/generateActions";

const CREATE_REVIEW = generateActions("CREATE_REVIEW");
const FETCH_REVIEWS = generateActions("FETCH_REVIEWS");

export { CREATE_REVIEW, FETCH_REVIEWS };
