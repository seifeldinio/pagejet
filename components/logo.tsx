import React from "react";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Link
      href={"/"}
      className="w-8 mix-blend-difference filter brightness-0 invert hover:scale-110 transition-all duration-150 ease-in-out"
    >
      <img src="/images/logo.webp" alt="PageJet Logo" />
    </Link>
  );
};

export default Logo;
