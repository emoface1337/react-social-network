export const setTitle = (title: string) => {
    const prevTitle = document.title
    document.title = title
    return () => document.title = prevTitle
}
