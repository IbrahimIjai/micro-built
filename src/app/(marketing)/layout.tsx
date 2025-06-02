import { MainNav } from "@/components/site-header";


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainNav /> 
      {children}
    </>
  );
}
