/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link, Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Navlinks } from "~/constant";

export default function Nav() {
  const [navBlur, setNavBlur] = useState("bg-[rgba(51,52,78,0.5)] backdrop-blur-none");
  const [showNavMobile, setShowNavMobile] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 0) {
        setNavBlur("bg-[rgba(40,44,58,0.5)] backdrop-blur-lg");
        return;
      }
      setNavBlur("bg-[rgba(51,52,78,0.5)] backdrop-blur-none");
    });
  }, []);

  useEffect(() => {
    const body = document.body;

    body.addEventListener("click", (e: MouseEvent) => {
      if (e.target instanceof HTMLElement && e.target.id === "mobile-nav") {
        document.body.classList.remove("overflow-hidden");

        setShowNavMobile(false);
      }
    });
  }, []);

  function handleToggleNav() {
    setShowNavMobile((prev) => !prev);
    document.body.classList.add("overflow-hidden");
  }

  return (
    <>
      <nav className={`fixed w-full ${navBlur} transition-all z-10`}>
        <div className="w-[90%] mx-auto py-5 flex justify-between items-center">
          <Link to={"/"} className="heading-1">
            OtakuDl
          </Link>

          {/* lists desktop */}
          <div className="flex gap-7 items-center">
            {Navlinks.map((link) => (
              <Link key={link.name} to={link.url} className="heading-3 hover:underline md:flex hidden" prefetch="intent" rel="prefetch">
                {link.name}
              </Link>
            ))}

            <Form action="/search" method="get">
              <input
                type="search"
                name="title"
                placeholder="find anime..."
                className="heading-4 bg-tertiary rounded-[20px] px-4 py-2 max-sm:w-[100px] border-[#4697E2] border-[3px] max-sm:focus:w-[150px] transition-all"
              />
            </Form>

            <button className="md:hidden block rotate-90 cursor-pointer" onClick={handleToggleNav}>
              <span className="text-[24px] font-semibold">|||</span>
            </button>
          </div>
        </div>
      </nav>

      {showNavMobile && (
        <div id="mobile-nav" className="h-screen w-[100%] bg-[rgba(0,0,0,0.5)] backdrop-blur-sm fixed z-20">
          <div className="bg-tertiary p-5 absolute right-5 top-24 roudned-[20px]">
            {Navlinks.map((link) => (
              <Link
                key={link.name}
                to={link.url}
                className="heading-3 hover:underline flex mb-1"
                prefetch="intent"
                rel="prefetch"
                onClick={handleToggleNav}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
