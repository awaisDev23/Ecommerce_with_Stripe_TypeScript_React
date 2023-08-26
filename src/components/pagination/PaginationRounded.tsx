// import React from "react";
// import { Stack, Pagination } from "@mui/material";
// import "./Pagination.css";
// const PaginationRounded = ({ page, onChange, totalPages }) => {
//   return (
//     <div className="pagination">
//       <Stack spacing={2}>
//         <Pagination
//           variant="outlined"
//           shape="rounded"
//           page={page}
//           onChange={onChange}
//           count={totalPages}
//           defaultPage={1}
//           boundaryCount={2}
//           currentPage={page}
//           siblingCount={0}
//         />
//       </Stack>
//     </div>
//   );
// };

// export default PaginationRounded;
import React, { FC } from "react";
import { Stack, Pagination as MuiPagination } from "@mui/material";
import "./Pagination.css";

interface PaginationRoundedProps {
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  totalPages: number;
}

const PaginationRounded: FC<PaginationRoundedProps> = ({
  page,
  onChange,
  totalPages,
}) => {
  return (
    <div className="pagination">
      <Stack spacing={2}>
        <MuiPagination
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={onChange}
          count={totalPages}
          defaultPage={1}
          boundaryCount={2}
          siblingCount={0}
        />
      </Stack>
    </div>
  );
};

export default PaginationRounded;
