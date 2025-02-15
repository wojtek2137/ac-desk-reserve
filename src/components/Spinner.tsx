export const Spinner = ({ size = 16 }) => (
  <div className="flex justify-center items-center">
    <div
      className="inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
      role="status"
    >
    </div>
  </div>
);