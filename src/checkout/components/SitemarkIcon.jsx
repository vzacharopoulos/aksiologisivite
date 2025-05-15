import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export default function FactoryIcon() {
  return (
    <SvgIcon sx={{ height: 80, width: 150 }}> {/* Adjust size as needed */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width="40px"
        height="20px"
        fill="currentColor" // You can change the fill color here or via CSS
      >
 <path d="M496 448H448V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v96l-96-64v64l-96-64v128H80a16 16 0 0 0-16 16v208H16a16 16 0 0 0 0 32h480a16 16 0 0 0 0-32ZM96 256h32v32H96Zm0 64h32v32H96Zm0 64h32v32H96Zm64-128h32v32h-32Zm0 64h32v32h-32Zm0 64h32v32h-32Zm64-128h32v32h-32Zm0 64h32v32h-32Zm0 64h32v32h-32Zm64-128h32v32h-32Zm0 64h32v32h-32Zm0 64h32v32h-32Zm96 32h-32v-32h32Zm0-64h-32v-32h32Zm0-64h-32v-32h32Z" />      </svg>
    </SvgIcon>
  );
}