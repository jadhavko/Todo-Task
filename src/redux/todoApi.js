import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const todoApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/todos" }),
    tagTypes: ["todos"],
    endpoints: (builder) => {
        return {
            getTodos: builder.query({
                query: () => {
                    return {
                        url: "/",
                        method: "GET"
                    }
                },
                providesTags: ["todos"]
            }),
            addTodo: builder.mutation({
                query: userData => {
                    return {
                        url: "/",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["todos"]
            }),
            updateTodo: builder.mutation({
                query: userData => {
                    return {
                        url: `/${userData.id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["todos"]
            }),
            deleteTodo: builder.mutation({
                query: id => {
                    return {
                        url: `/${id}`,
                        method: "DELETE",
                        // body: userData
                    }
                },
                invalidatesTags: ["todos"]
            }),

        }
    }
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi
