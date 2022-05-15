import axios from "axios";
import baseURL from "../baseURL";
export const CreateOrUpdateUser = async (authtoken, data) => {
  return await axios.post(
    `${baseURL}/create-or-update-user`,
    { data },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const CurrentUser = async (authtoken) => {
  return await axios.post(
    `${baseURL}/currentuser`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
