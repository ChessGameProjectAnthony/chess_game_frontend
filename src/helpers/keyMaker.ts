function keyMakerFactory(baseKey: string) {
    return function (id: string) {
        return `${baseKey}-${id}`
    }
}

export const transformPawnKey = keyMakerFactory("tranform-container")
