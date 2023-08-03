"use client";

import {
	Box,
	Flex,
	Avatar,
	HStack,
	IconButton,
	useDisclosure,
	Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "./navlink/navlink";
import { NavLink as NavLinkType } from "@/types/navTypes";

const LINKS: NavLinkType[] = [
	{ name: "Home", href: "/" },
	{ name: "Images", href: "/images" },
	{ name: "Users", href: "/users" },
];

export const Navbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box bg={"orange.400"} pos="fixed" px={4} w="100%" zIndex={9999}>
			<Flex h={16} alignItems="center" justifyContent="space-between">
				<IconButton
					colorScheme="orange.400"
					size="md"
					icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
					aria-label="Open Menu"
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems="center">
					<HStack
						as={"nav"}
						spacing={4}
						display={{ base: "none", md: "flex" }}
					>
						{LINKS.map((link) => (
							<NavLink key={link.name} link={link} />
						))}
					</HStack>
				</HStack>
				<Flex alignItems="center">
					<Avatar
						size="sm"
						title="Siim Tali"
						src="https://github.com/SiimTa.png"
					/>
				</Flex>
			</Flex>

			{isOpen ? (
				<Box pb={4} display={{ md: "none" }}>
					<Stack as="nav" spacing={4}>
						{LINKS.map((link) => (
							<NavLink key={link.name} link={link} />
						))}
					</Stack>
				</Box>
			) : null}
		</Box>
	);
};
