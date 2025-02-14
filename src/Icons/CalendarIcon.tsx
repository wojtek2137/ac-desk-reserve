export const CalendarIcon = ({ fill, width = 16, height = 16 }: { fill?: string, width?: number, height?: number}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill={fill ?? 'white'}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_35_2019)">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14 0H12V2H4V0H2V2C0.895431 2 0 2.89543 0 4V5V6V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V6V5V4C16 2.89543 15.1046 2 14 2V0ZM14 6H2V14H14V6ZM12 8H9V11H12V8Z"
        fill="fill"
      />
    </g>
    <defs>
      <clipPath id="clip0_35_2019">
        <rect width="16" height="16" fill="fill" />
      </clipPath>
    </defs>
  </svg>
);
