import { Link, Form } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Navlinks } from "~/constant";

export default function Nav() {
  const [navBlur, setNavBlur] = useState("bg-primary");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (document.documentElement.scrollTop > 0) {
        setNavBlur("bg-tertiary");
        return;
      }
      setNavBlur("bg-primary");
    });
  }, []);

  return (
    <nav className={`fixed w-full ${navBlur} transition-all z-10`}>
      <div className="w-[90%] mx-auto py-5 flex justify-between items-center">
        <Link to={"/"} className="heading-1">
          OtakuDl
        </Link>

        {/* lists */}
        <div className="flex gap-7 items-center">
          {Navlinks.map((link) => (
            <Link key={link.name} to={link.url} className="heading-3 hover:underline" prefetch="intent" rel="prefetch">
              {link.name}
            </Link>
          ))}

          <Form action="/search" method="get">
            <input
              type="search"
              name="title"
              placeholder="find anime..."
              className="heading-4 bg-tertiary rounded-[20px] px-[20px] py-[10px] border-[#4697E2] border-[3px]"
            />
          </Form>
        </div>
      </div>
    </nav>
  );
}
