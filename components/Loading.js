import AutorenewIcon from "@mui/icons-material/Autorenew";

const Loading = () => {
  return (
    <div className="flex justify-center items-center">
      <AutorenewIcon className="animate-spin text-violet-700" sx={{ fontSize: 50 }} />
    </div>
  );
};

export default Loading;
