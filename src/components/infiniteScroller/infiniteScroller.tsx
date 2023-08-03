"use client";

import React, { useEffect, useRef } from "react";
import { Flex } from "@chakra-ui/react";
import classNames from "classnames";
import { Loader } from "./loader/loader";

import styles from "./infiniteScroller.module.scss";

type Props<T> = {
	data: T[];
	hasMore: boolean;
	isGridView?: boolean;
	itemContent: (dataItem: T, index: number) => React.ReactNode;
	loadMore: () => void;
	threshold?: number;
};

export const InfiniteScroller = <T,>({
	data,
	hasMore,
	isGridView,
	itemContent,
	loadMore,
	threshold = 500,
}: Props<T>) => {
	const observerTarget = useRef<HTMLDivElement | null>(null);
	const containerClasses = classNames(styles.container, {
		[styles["grid-view"]]: !!isGridView,
	});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting && hasMore) {
					loadMore();
				}
			},
			{
				root: document.querySelector(`.${styles.container}`),
				rootMargin: `${threshold}px`,
			},
		);

		const current = observerTarget.current;
		if (current) {
			observer.observe(current);
		}

		return () => {
			observer.disconnect();
		};
	}, [observerTarget, hasMore, loadMore, threshold]);

	return (
		<>
			<div className={containerClasses}>
				{data.map((elementData, index) =>
					itemContent(elementData, index),
				)}

				<Flex
					flexBasis="100%"
					justifyContent="center"
					ref={observerTarget}
				>
					{hasMore && <Loader />}
				</Flex>
			</div>
		</>
	);
};
