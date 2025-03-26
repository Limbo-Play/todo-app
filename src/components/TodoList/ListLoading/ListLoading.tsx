import { CircularProgress } from "@mui/material";

const ListLoading = () => {
  return (
    <div className="flex justify-center bg-white rounded-xl w-full">
      <CircularProgress className="m-5" />
    </div>
  );
};

export default ListLoading;
