import { useMultiStepForm } from '../_hooks/use-stepped-form'
import { Button } from '@/components/ui/button'

const PrevButton = ({ text }: { text: string }) => {
    const { isFirstStep, previousStep } = useMultiStepForm()

    return (
        <Button
            variant='outline'
            type='button'
            size="sm"
            className="font-medium"
            onClick={previousStep}
            disabled={isFirstStep}
        >
            {text}
        </Button>
    )
}
export default PrevButton