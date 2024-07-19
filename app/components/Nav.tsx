import { Link, Form } from "@remix-run/react";
import { Navlinks } from "~/constant";

export default function Nav() {
  return (
    <nav className="fixed w-full bg-primary">
      <div className="w-[90%] mx-auto py-5 flex justify-between items-center ">
        <Link to={"/"} className="heading-1">
          OtakuDl
        </Link>

        {/* lists */}
        <div className="flex gap-7 items-center">
          {Navlinks.map((link) => (
            <Link key={link.name} to={link.url} className="heading-3">
              {link.name}
            </Link>
          ))}

          <Form>
            <input
              type="search"
              placeholder="find anime..."
              className="heading-4 bg-tertiary rounded-[20px] px-[20px] py-[10px] border-[#4697E2] border-[3px]"
            />
          </Form>
        </div>
      </div>
    </nav>
  );
}
