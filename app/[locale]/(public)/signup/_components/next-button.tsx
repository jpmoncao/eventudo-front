import { Button } from "@/components/ui/button";
import { useMultiStepForm } from "../_hooks/use-stepped-form";

const NextButton = ({
    onClick,
    type,
    text,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) => {
    const { nextStep } = useMultiStepForm()

    return (
        <Button
            size="sm"
            className="font-medium"
            type={type ?? 'button'}
            onClick={onClick ? onClick : nextStep}
            {...rest}
        >
            {text}
        </Button>
    )
}

export default NextButton;
