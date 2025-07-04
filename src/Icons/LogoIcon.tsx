interface LogoIconType {
  width?: number;
  height?: number;
  className?: string;
}

 export const LogoIcon = ({ width = 80, height = 80, className }: LogoIconType) =>  (
    <svg
      width={width}
      height={height}
      viewBox='0 0 306 306'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${className}`}
    >
      <circle cx='153' cy='153' r='110' fill='white' />
      <path
        d='M190.319 152.752L125.953 195.497C122.971 197.485 121.479 200.715 121.479 203.946V214.632L199.514 163.438C202.993 160.953 205.23 156.976 205.23 152.752C205.23 148.527 203.242 144.55 199.514 142.065L121.479 91.3677V101.308C121.479 104.788 123.219 108.018 125.953 109.758L190.319 152.752Z'
        fill='black'
      />
      <path
        d='M151.55 156.231C155.029 158.467 159.503 158.467 162.982 156.231L168.449 152.503L127.692 124.918C125.207 123.178 121.479 124.918 121.479 128.148V136.349L142.603 150.515L151.55 156.231Z'
        fill='black'
      />
    </svg>
  );

