import { create } from "zustand";

export const useStyleStore = create(() => ({
    theme: 'light',
}))

export const setTheme = (switchTheme) => useStyleStore.setState({ theme: switchTheme })