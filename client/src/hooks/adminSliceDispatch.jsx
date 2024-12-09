import { useDispatch } from "react-redux";
import {
  login,
  logout,
  initializeStudentData as initializeStudentDataReducer,
  initializeTeacherCount as initializeTeacherCountReducer,
  initializeSubjectsPerDepartment as initializeSubjectsPerDepartmentReducer,
  addTeacherCount as addTeacherCountReducer,
  removeTeacherCount as removeTeacherCountReducer,
  updateSubjectsPerDepartment as updateSubjectsPerDepartmentReducer,
  addStudent as addStudentReducer,
  removeStudent as removeStudentReducer,
  updateNotices as updateNoticesReducer,
} from "../toolkits/features/admin/adminSlice";
import {
  setSubjects as setSubjectsReducer,
  subjectsInitialized,
} from "../toolkits/features/admin/subjectSlice";

const sliceDispatch = (reducer) => () => {
  const dispatch = useDispatch();
  return (payload = null) => {
    if (payload) {
      dispatch(reducer(payload));
    } else {
      dispatch(reducer());
    }
  };
};

export const adminLogin = sliceDispatch(login);
export const adminLogout = sliceDispatch(logout);
export const addStudent = sliceDispatch(addStudentReducer);
export const removeStudent = sliceDispatch(removeStudentReducer);
export const initializeStudentData = sliceDispatch(
  initializeStudentDataReducer
);
export const initializeTeacherCount = sliceDispatch(
  initializeTeacherCountReducer
);
export const initializeSubjectsPerDepartment = sliceDispatch(
  initializeSubjectsPerDepartmentReducer
);
export const addTeacherCount = sliceDispatch(addTeacherCountReducer); //
export const removeTeacherCount = sliceDispatch(removeTeacherCountReducer);
export const updateSubjectsPerDepartment = sliceDispatch(
  updateSubjectsPerDepartmentReducer
);
export const updateNotices = sliceDispatch(updateNoticesReducer);

//subjects
export const setSubjects = sliceDispatch(setSubjectsReducer);
export const initializedSubjects = sliceDispatch(subjectsInitialized);
