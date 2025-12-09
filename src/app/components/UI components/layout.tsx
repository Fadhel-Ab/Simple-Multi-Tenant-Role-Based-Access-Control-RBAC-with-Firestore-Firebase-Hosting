type LayoutProps={
  children: React.ReactNode;
  className?:string
}
export default function FlexCcenter({children, className}: LayoutProps) {
  return <div className={`flex flex-col items-center justify-center ${className}`}>{children}</div>;
}
