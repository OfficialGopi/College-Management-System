import React, { useEffect } from "react";
import { Box, Typography, Card, Avatar, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { useFileHandler } from "6pp";
import { CameraAlt } from "@mui/icons-material";
import toast from "react-hot-toast";
import { postAvatar } from "../services/getOthers";

const StudentProfile = () => {
  const avatar = useFileHandler("single", 5);
  const student = useSelector((state) => state.auth.value);

  const handleUpdateProfile = () => {
    // You can implement the logic to update the profile here.
    toast
      .promise(postAvatar(student._id, avatar.file), {
        loading: "Loading",
        success: "Profile updated successfully",
        error: "Failed to update profile",
      })
      .then((data) => {
        console.log(data);

        avatar.clear();
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (avatar.file) {
      handleUpdateProfile();
    }
  }, [avatar.file]);
  return (
    <Box className="flex items-center justify-center h-full ">
      <Card className="flex flex-col p-8 rounded-3xl shadow-none w-full max-w-2xl  bg-opacity-30">
        <Box className="flex items-center  mb-6">
          <form className="relative mr-3 " id="avatarForm">
            <Avatar
              alt={student.name}
              src={avatar.preview ? avatar.preview : student.avatarUrl}
              sx={{
                width: 200,
                height: 200,

                border: "4px solid white",
                boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
              }}
            />
            <IconButton
              sx={{
                position: "absolute",
                right: 0,
                bottom: 0,
              }}
              component={"label"}
            >
              <CameraAlt />
              <input
                type="file"
                className="w-0 h-0 overflow-hidden"
                onChange={avatar.changeHandler}
                accept="image/*"
                name="avatar"
                multiple={false}
              />
            </IconButton>
          </form>
          <Box>
            <Typography
              variant="h3"
              className="font-extrabold text-black"
              sx={{
                fontWeight: "100",
              }}
            >
              {student.name}
            </Typography>
            {student.batchId?.startingYear && (
              <Typography
                variant="h5"
                className="font-extrabold text-black"
                sx={{
                  fontWeight: "100",
                }}
              >
                Batch Starting Year :{" "}
                {student.batchId.startingYear.split("-")[0]}
              </Typography>
            )}
          </Box>
        </Box>

        <Box className="space-y-4 text-lg">
          <Typography variant="body1" className="text-black">
            <strong>ID:</strong> {student._id}
          </Typography>
          <Typography variant="body1" className="text-black">
            <strong>Address:</strong> {student.address}
          </Typography>
          <Typography variant="body1" className="text-black">
            <strong>Mobile No:</strong> {student.mobileNumber}
          </Typography>
          <Typography variant="body1" className="text-black">
            <strong>Email:</strong> {student.email}
          </Typography>
          <Typography variant="body1" className="text-black">
            <strong>Date of Birth:</strong> {student.dateOfBirth.split("T")[0]}
          </Typography>
          <Typography variant="body1" className="text-black">
            <strong>Blood Group:</strong> {student.bloodGroup}
          </Typography>
          {student.department && (
            <Typography variant="body1" className="text-black">
              <strong>Department:</strong> {student.department}
            </Typography>
          )}
          {student.semester && (
            <Typography variant="body1" className="text-black">
              <strong>Semester:</strong> {student.semester}
            </Typography>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default StudentProfile;
