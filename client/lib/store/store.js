import { create } from "zustand"
import { persist } from "zustand/middleware"
import { userSlice } from "./userSlice"

const manageStore = create(
    persist((set, get) => ({
        ...userSlice(set, get),
    }),
        {
            name: "app-storage"
        }
    )
)

export default manageStore