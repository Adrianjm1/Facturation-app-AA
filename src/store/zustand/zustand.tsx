import Api from 'api/apiConfig'
import { create } from 'zustand'

type Store = {
    count: number
    inc: () => void
    token: string
    setToken: (token: string) => void
    items: any[]
    setItems: (items: any[]) => void
}

export const useStoreZ = create<Store>()((set) => ({
    count: 1,
    inc: () => set((state) => ({ count: state.count + 1 })),

    token: '',
    setToken: (token: string) => set({ token }),

    items: [],
    setItems: (items) => set({ items })
}))


// function to set items from api
export const setItemsFuction = async () => {
    const { setItems } = useStoreZ.getState();
    try {
        const res = await Api.get('/items');
        setItems(res.data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};