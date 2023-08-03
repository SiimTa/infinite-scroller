"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { InfiniteScroller } from "@/components/infiniteScroller/infiniteScroller";
import { User, UserResponse } from "@/types/userTypes";
import { Box } from "@chakra-ui/react";

const PAGE_SIZE = 100;

const UsersList = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [offset, setOffset] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	const fetchNextPage = useCallback(() => {
		setOffset((prev) => prev + PAGE_SIZE);
	}, []);

	useEffect(() => {
		axios
			.get<UserResponse, AxiosResponse<UserResponse>>(
				`https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${PAGE_SIZE}`,
			)
			.then((res) => {
				const { total_users, users } = res.data;
				setUsers((prevData) => [...prevData, ...users]);
				setTotalCount(total_users);
			})
			.catch((err) => console.log(err));
	}, [offset]);

	return (
		<InfiniteScroller<User>
			data={users}
			itemContent={(user) => (
				<div
					key={user.id}
				>{`${user.first_name} ${user.last_name}, ${user.country}`}</div>
			)}
			loadMore={fetchNextPage}
			hasMore={users.length < totalCount}
			threshold={1000}
		/>
	);
};

export default UsersList;
