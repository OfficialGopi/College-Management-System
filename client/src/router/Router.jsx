import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import OutletPage from "../utils/OutletPage";
import AdminOutletPage from "../utils/AdminOutletPage";
import StudentProfile from "../pages/StudentProfile";
import ProtectedRouteAdmin from "../utils/ProtectedRoute.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../utils/ProtectedRoute.jsx";
import { useDispatch, useSelector } from "react-redux";
import { loginByToken } from "../services/authentication.js";
import { login } from "../toolkits/features/user/authSlice.jsx";
import MainLoader from "../components/loader/MainLoader.jsx";
import AdminProtectedRoute from "../utils/AdminProtectedRoute.jsx";

const LandingPage = lazy(() => import("../pages/LandingPage"));
const Login = lazy(() => import("../pages/Login"));
const AdminLogin = lazy(() => import("../pages/AdminLogin"));
const StudentHomePage = lazy(() => import("../pages/StudentHomePage"));
const TeacherHomePage = lazy(() => import("../pages/TeacherHomePage"));
const StudentSubjects = lazy(() => import("../pages/StudentSubjects"));
const TeacherSubjects = lazy(() => import("../pages/TeacherSubjects"));
const StudentAssignments = lazy(() => import("../pages/StudentAssignments"));
const StudentMaterials = lazy(() => import("../pages/StudentMaterials"));
const TeacherMaterials = lazy(() => import("../pages/TeacherMaterials"));
const Routine = lazy(() => import("../pages/Routine"));
const StudentResult = lazy(() => import("../pages/StudentResult"));
const TeacherAssignments = lazy(() => import("../pages/TeacherAssignments"));
const Notices = lazy(() => import("../pages/Notices"));
const StudentResultSpecific = lazy(() =>
  import("../pages/StudentResultSpecific")
);
const StudentMaterialSpecific = lazy(() =>
  import("../pages/StudentMaterialSpecific")
);
const StudentAssignmentSpecific = lazy(() =>
  import("../pages/StudentAssignmentSpecific")
);
const TeacherAssignmentsSpecific = lazy(() =>
  import("../pages/TeacherAssignmentsSpecific")
);
const TeacherAssignmentSpecificDashboard = lazy(() =>
  import("../pages/TeacherAssignmentSpecificDashboard")
);
const TeacherMaterialsSpecific = lazy(() =>
  import("../pages/TeacherMaterialsSpecific.jsx")
);
const TeacherResultGive = lazy(() => import("../pages/TeacherResultGive.jsx"));
const TeacherResultGiveSpecific = lazy(() =>
  import("../pages/TeacherResultGiveSpecific.jsx")
);
const AdminHome = lazy(() => import("../pages/AdminHome.jsx"));
const AdminSubjects = lazy(() => import("../pages/AdminSubjects.jsx"));
const AdminCreateTeacher = lazy(() =>
  import("../pages/AdminCreateTeacher.jsx")
);
const AdminCreateBatch = lazy(() => import("../pages/AdminCreateBatch.jsx"));
const AdminCreateStudent = lazy(() =>
  import("../pages/AdminCreateStudent.jsx")
);

const Router = () => {
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.auth.value);

  if (!authSelector) {
    const token = localStorage.getItem("cms-token");
    if (token) {
      loginByToken(token).then((res) => {
        if (res.role) {
          dispatch(login(res));
        }
      });
    }
  }
  return (
    <BrowserRouter>
      <Toaster position="top-center" />
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            element={<ProtectedRoute auth={authSelector} portal={"student"} />}
          >
            <Route path="/in/student" element={<OutletPage />}>
              <Route path="" element={<StudentHomePage />} />
              <Route path="subjects" element={<StudentSubjects />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="notices" element={<Notices />} />

              <Route path="assignments" element={<StudentAssignments />} />
              <Route
                path="assignments/:subjectCode"
                element={<StudentAssignmentSpecific />}
              />

              <Route path="materials" element={<StudentMaterials />} />
              <Route
                path="materials/:subjectCode"
                element={<StudentMaterialSpecific />}
              />
              <Route path="routine" element={<Routine />} />
              <Route path="result" element={<StudentResult />} />
              <Route path="result/:sem" element={<StudentResultSpecific />} />
            </Route>
          </Route>
          <Route
            element={<ProtectedRoute auth={authSelector} portal={"teacher"} />}
          >
            <Route path="/in/teacher" element={<OutletPage />}>
              <Route path="" element={<TeacherHomePage />} />
              <Route path="subjects" element={<TeacherSubjects />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="notices" element={<Notices />} />

              <Route path="assignments" element={<TeacherAssignments />} />
              <Route
                path="assignments/:subjectCode"
                element={<TeacherAssignmentsSpecific />}
              />
              <Route
                path="assignments/:subjectCode/:assignmentId"
                element={<TeacherAssignmentSpecificDashboard />}
              />
              <Route path="materials" element={<TeacherMaterials />} />
              <Route
                path="materials/:subjectCode"
                element={<TeacherMaterialsSpecific />}
              />
              <Route path="routine" element={<Routine />} />
              <Route path="result" element={<TeacherResultGive />} />
              <Route
                path="result/:subjectCode"
                element={<TeacherResultGiveSpecific />}
              />
            </Route>
          </Route>
          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/in" element={<AdminOutletPage />}>
              <Route path="" element={<AdminHome />} />
              <Route path="subjects" element={<AdminSubjects />} />
              <Route path="createteacher" element={<AdminCreateTeacher />} />
              <Route path="createbatch" element={<AdminCreateBatch />} />
              <Route path="createstudent" element={<AdminCreateStudent />} />
            </Route>
          </Route>
          <Route path="*" element={<>Error 404..Page not found</>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export { Router };
