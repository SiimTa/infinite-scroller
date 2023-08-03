"use client";

import React from "react";
import Image from "next/image";
import { Card, CardBody, Heading } from "@chakra-ui/react";
import { Image as ImageType } from "@/types/imageTypes";

type Props = {
	image: ImageType;
};

const ImageCard = ({ image }: Props) => {
	return (
		<Card m="2">
			<CardBody>
				<Image
					key={image.id}
					alt={image.author}
					src={image.download_url}
					height={300}
					width={300}
					style={{ width: "auto", height: "auto" }}
					priority
				/>
				<Heading size="md">{image.author}</Heading>
			</CardBody>
		</Card>
	);
};

export default React.memo(ImageCard);
