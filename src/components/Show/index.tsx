type Props = {
    children: React.ReactNode
    condition: boolean
}
function ShowOnlyWhen({ children, condition }: Props) {
    if (condition) {
        return children
    }
    return
}



const Show = {
    ShowOnlyWhen
}

export default Show