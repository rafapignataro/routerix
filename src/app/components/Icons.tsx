export const Icons: Record<string, (props: IconProps) => JSX.Element> = {
  chevronRight: (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  arrowRight: (props: IconProps) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  )
};

interface IconProps extends React.HTMLAttributes<SVGElement> {
  name: string;
};

export function Icon({ name, ...props }: { name: string } & IconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) return null;

  return <IconComponent name={name} {...props} />;
};