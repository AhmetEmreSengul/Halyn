import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="w-full h-60 md:h-40 border-t-2 flex items-center">
      <div className="flex justify-center md:justify-between items-center px-30 w-full flex-col md:flex-row">
        <div>
          <div className="inline-flex items-center">
            <img src="./halyn_logo.png" className="size-15" />
            <p className="text-xl font-bold">Halyn Halal / Haram Check</p>
          </div>
          <p className="font-light text-lg text-center md:text-start">
            Helping you make the right decisions.
          </p>
        </div>
        <div className="mt-5">
          <div className="flex items-center gap-2 md:justify-end justify-between">
            <Link
              className="underline hover:text-green-200 transition text-lg"
              to="/all-scans"
            >
              View All Scans
            </Link>
            <p className="underline hover:text-green-200 transition text-lg cursor-pointer">
              Privacy Policy
            </p>
          </div>
          <p className="font-extrabold text-lg mt-2">
            © 2026 Halyn. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
