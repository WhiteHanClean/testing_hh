import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post"],
  endpoints: (build) => ({
    fetchAllPosts: build.query({
      query: (page = 1) => ({
        url: `/posts`,
        params: {
          _limit: 10,
          _page: page,
        },
      }),
      providesTags: ["Post"],
    })
  }),
});

export const { useFetchAllPostsQuery, useSearchPostsQuery } = postAPI;
