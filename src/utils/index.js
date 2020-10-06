export const setTitle = (title) => {
    const prevTitle = document.title
    document.title = title
    return () => document.title = prevTitle
}