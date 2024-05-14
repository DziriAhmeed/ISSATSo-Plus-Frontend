export type NavigationLink = {
    name: string;
    href: string;
    icon?: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
    sublinks?: NavigationLink[];
  };
  
  export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };