"use client";
import React from "react";
import styled from "styled-components";
import {useGlobalState} from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import {IMenu} from "@/app/types/menuType";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {logout} from "@/app/utils/icons";
import {SignOutButton, UserButton, useUser} from "@clerk/nextjs";

export default function Sidebar() {
  const {theme} = useGlobalState();
  const {user} = useUser();

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyles theme={theme}>
      <div className="profile">
        <div className="profile-overlay"></div>
        <Link href={"/user-profile"}>
          <div className="image">
            <Image
              width={70}
              height={70}
              src={`${user?.imageUrl ? user?.imageUrl : "/pr1.jpg"}`}
              alt="profile"
            />
          </div>
        </Link>
        <h1 className="line-clamp-1">
          <span>{user?.firstName}</span>
          <span>{user?.lastName}</span>
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item: IMenu) => {
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === item.link && "active"}`}
              onClick={() => handleClick(item.link)}>
              {item.icon}
              <Link href={item.link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="font-semibold my-8 ml-10 text-gray-200 flex gap-3 items-center cursor-pointer w-fit">
        {" "}
        {logout} <SignOutButton />
      </div>
    </SidebarStyles>
  );
}

const SidebarStyles = styled.nav`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colorGrey3};

  .profile {
    margin: 1.5rem;
    padding: 1rem 0.8rem;
    position: relative;
    border-radius: 1rem;
    cursor: pointer;
    font-weight: 500;
    color: ${(props) => props.theme.colorGrey0};
    display: flex;
    align-items: center;
  }

  .nav-item {
    position: relative;
    padding: 0.9rem 1.5rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.activeNavLinkHover};
      z-index: 1;
      transition: all 0.3s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }

    a {
      font-weight: 500;
      transition: all 0.3 ease-in-out;
      z-index: 2;
      line-height: 1.4rem;
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorIcons};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

  .active {
    background-color: ${(props) => props.theme.activeNavLink};
    i,
    a {
      color: ${(props) => props.theme.colorIcons2};
    }
  }

  .active::before {
    width: 0.3rem;
  }

  .profile-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
    z-index: 0;
    background: ${(props) => props.theme.colorBg3};
    transition: all 0.55s linear;
    border-radius: 1rem;
    border: 2px solid ${(props) => props.theme.borderColor2};
    opacity: 0.2;
  }

  h1 {
    font-size: 1.2rem;
    margin-left: 0.8rem;
    display: flex;
    flex-direction: column;
    line-height: 1.5rem;
  }

  .image,
  h1 {
    position: relative;
    z-index: 1;
  }

  .image {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    transition: all, 5s ease;
    border-radius: 100%;
    width: 70px;
    height: 70px;
  }

  &:hover {
    .profile-overlay {
      opacity: 1;
      border: 2px solid ${(props) => props.theme.borderColor2};
    }

    img {
      transform: scale(1.1);
      transition: all, 0.5s ease;
    }
  }
`;
