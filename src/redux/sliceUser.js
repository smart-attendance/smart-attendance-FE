import { createSlice } from "@reduxjs/toolkit"

const initialValue = {
    username: "",
    token: ""
}

export const sliceUser = createSlice({
    name: "user",
    initialState: {
        users: initialValue
    },
    reducers: {
        // function that use for save user data to global state
        saveUser: (state, action) => {
            const newUser = {...action.payload}
            state.users = newUser
        },
        // function that use for delete user data from global state
        deleteUser: (state) => {
            state.users = initialValue
        }
    }
})

export const { saveUser, deleteUser } = sliceUser.actions;
export default sliceUser.reducer;