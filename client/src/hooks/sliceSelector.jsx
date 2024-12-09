import { useSelector } from "react-redux";

const sliceSelector = (stateName) => () => {
  const state = useSelector((state) => state);
  return state[stateName];
};

export const useAdmin = sliceSelector("admin");

export const useAdminSubjects = sliceSelector("adminSubjects");
