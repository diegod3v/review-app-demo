import NavBar from "./NavBar/NavBar";

function NavBarLayout({ children }) {
  return (
    <>
      <header className="fixed w-full top-0 z-30">
        <NavBar />
      </header>
      <main className="pt-8">{children}</main>
    </>
  );
}

export default NavBarLayout;
