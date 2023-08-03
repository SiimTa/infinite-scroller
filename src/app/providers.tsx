"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

type Props = {
	children: React.ReactNode;
};

export const Providers = ({ children }: Props) => {
	return (
		<CacheProvider>
			<ChakraProvider>{children}</ChakraProvider>
		</CacheProvider>
	);
};
