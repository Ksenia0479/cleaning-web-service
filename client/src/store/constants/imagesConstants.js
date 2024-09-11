// utils
import { generateActions } from "utils/generateActions";

const FETCH_IMAGE = generateActions("FETCH_IMAGE");
const UPDATE_PREVIEW_IMAGE = generateActions("UPDATE_IMAGE_REQUEST");

export { FETCH_IMAGE, UPDATE_PREVIEW_IMAGE };
