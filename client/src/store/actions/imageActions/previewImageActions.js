//constants
import { UPDATE_PREVIEW_IMAGE } from "store/constants";

const updatePreviewImage = avatar => {
  const url = typeof avatar === "object" ? URL.createObjectURL(avatar) : avatar;
  return { type: UPDATE_PREVIEW_IMAGE.SUCCESS, payload: { data: url } };
};

export { updatePreviewImage };
