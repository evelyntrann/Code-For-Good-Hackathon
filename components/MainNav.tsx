import React from "react";
import MainNavLinks from "./MainNavLinks";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <div>
        <Link href={"/"} legacyBehavior passHref prefetch={false}>
          <Image
            src={Logo}
            alt="Logo"
            width={175}
            height={175}
            className="hover:cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center gap-x-6">
        <MainNavLinks />
      </div>
    </div>
  );
};

export default MainNav;
