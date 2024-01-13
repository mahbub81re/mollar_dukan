import { Button } from "@/components/ui/button"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Detail({children,child2}:{children:React.ReactNode,child2:React.ReactNode}) {
  return (
    <Popover>
      {/* <PopoverTrigger asChild>
      {children}
      </PopoverTrigger>
      <PopoverContent className="w-80">
       {child2}
      </PopoverContent> */}
    </Popover>
  )
}
