import { create } from "zustand"
import { persist } from "zustand/middleware"
import { userSlice } from "./userSlice"
import { notificationSlice } from "./notificationSlice"

const manageStore = create(
    persist((set, get) => ({
        ...userSlice(set, get),
        ...notificationSlice(set),
    }),
        {
            name: "app-storage"
        }
    )
)

export default manageStore