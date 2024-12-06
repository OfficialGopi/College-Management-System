import { Button, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getBatches, postBatch } from "../services/batches";
import { Delete } from "@mui/icons-material";
import toast from "react-hot-toast";

const AdminCreateBatch = () => {
  const [batches, setBatches] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const handleSave = (e) => {
    e.preventDefault();
    toast
      .promise(postBatch(new Date(`${year}`)), {
        loading: "Loading",
        success: "Batch created successfully",
        error: "Failed to create batch",
      })
      .then((response) => {
        console.log(response.data);
        setBatches([...batches, response.data]);
      });
  };

  useEffect(() => {
    getBatches().then((data) => {
      console.log(data.data);
      setBatches(data.data);
    });
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-full flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-bold">Create Batch</h1>
        <div className=" mt-1 flex  bg-slate-200 rounded-lg">
          <form className="p-4 flex w-full  text-black gap-4">
            <div
              className="flex flex-1  gap-2 flex-col"
              style={{
                height: "100%",
              }}
            >
              <div className="flex gap-2 items-center">
                <YearPicker year={year} setYear={setYear} />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                  }}
                  type="submit"
                  onClick={handleSave}
                >
                  Add Batch
                </Button>
              </div>
            </div>
          </form>
        </div>
        <BatchesCreated batches={batches} setBatches={setBatches} />
      </div>
    </div>
  );
};

const YearPicker = ({ year, setYear }) => {
  // Generate an array of years from 1900 to the current year
  const years = Array.from(
    new Array(20),
    (val, index) => new Date().getFullYear() - 5 + index
  );

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <TextField
      select
      label="Select Starting Year"
      value={year}
      onChange={handleYearChange}
      variant="outlined"
      fullWidth
    >
      {years.map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </TextField>
  );
};

const BatchesCreated = ({ batches, setBatches }) => {
  return (
    <div className="flex flex-col gap-1 bg-slate-300 rounded-xl p-4">
      <h2 className="text-lg font-bold">Subjects Created</h2>
      <div className="flex flex-col gap-2">
        {batches.map((batch, index) => (
          <>
            <BatchComp startingYear={batch.startingYear} />
          </>
        ))}
      </div>
    </div>
  );
};

const BatchComp = ({ startingYear }) => {
  const handleDelete = () => {
    return toast.error(
      "For deleting batch contact the authority directly to access database!"
    );
  };
  return (
    <div className="flex rounded-lg items-center justify-between bg-slate-400 p-4 ">
      <div className=" flex-1 flex justify-between">
        <span className="text-2xl font-semibold">
          Batch Starting Year : {new Date(startingYear).getFullYear()}
        </span>

        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
};

export default AdminCreateBatch;
