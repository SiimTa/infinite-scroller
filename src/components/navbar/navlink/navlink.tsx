"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink as NavLinkType } from "@/types/navTypes";

type Props = {
	link: NavLinkType;
};

export const NavLink = ({ link }: Props) => {
	const pathname = usePathname();
	const isActive = link.href === pathname;

	return (
		<Box
			bg={isActive ? "orange.300" : "orange.400"}
			color="gray.100"
			px={2}
			py={1}
			rounded={"md"}
			_hover={{
				textDecoration: "none",
				bg: "orange.500",
			}}
		>
			<Link href={link.href}>{link.name}</Link>
		</Box>
	);
};
