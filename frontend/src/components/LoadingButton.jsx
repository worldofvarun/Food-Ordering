import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"

export function LoadingButton() {
    return (
        <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Loading...
        </Button>
    )
}
