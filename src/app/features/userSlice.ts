import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { userTypeData } from "../types/userType";

export interface userState {
  userInfo: userTypeData | null;
}

const initialState: userState = {
  userInfo: JSON.parse(localStorage.getItem("user") || "null"),
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, actions) => {
      state.userInfo = actions.payload;
      localStorage.setItem("user", JSON.stringify(actions.payload));
      localStorage.setItem("token", actions.payload.token);
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setUserInfo, clearUserInfo } = userInfoSlice.actions;
export const selectedUserinfoSlice = (state: RootState) =>
  state.userInfo.userInfo;
export default userInfoSlice.reducer;
