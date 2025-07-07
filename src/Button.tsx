

type Props = {
    title: string
    onClickHandler?: () => void;
    disabled?: boolean;
    className?: string;
}

export const Button = ({title, onClickHandler, disabled, className}: Props) => {
    return (
        <button className={className} disabled={disabled} onClick={onClickHandler}>{title}</button>
    )
}