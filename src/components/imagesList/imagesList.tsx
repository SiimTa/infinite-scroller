"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { InfiniteScroller } from "@/components/infiniteScroller/infiniteScroller";
import { Flex } from "@chakra-ui/react";
import ImageCard from "./imageCard/imageCard";
import { Image } from "@/types/imageTypes";

const ImagesList = () => {
	const [images, setImages] = useState<Image[]>([]);
	const [page, setPage] = useState(0);
	const [hasMore, setHasMore] = useState(false);

	const fetchNextPage = useCallback(() => {
		setPage((prev) => prev + 1);
	}, []);

	useEffect(() => {
		axios
			.get<Image[], AxiosResponse<Image[]>>(
				`https://picsum.photos/v2/list?page=${page}&limit=30`,
			)
			.then((res) => {
				setImages((prevData) => [...prevData, ...res.data]);
				if (res.headers["link"].includes("next")) {
					setHasMore(true);
				} else {
					setHasMore(false);
				}
			})
			.catch((err) => console.log(err));
	}, [page]);

	return (
		<InfiniteScroller<Image>
			data={images}
			isGridView
			itemContent={(image) => <ImageCard key={image.id} image={image} />}
			loadMore={fetchNextPage}
			hasMore={hasMore}
		/>
	);
};

export default ImagesList;
