import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Paintbrush } from 'lucide-react'
// import { useState } from 'react'

// export function PickerExample() {
//   const [background, setBackground] = useState('')

//   return (
//     <div
//       className="w-full h-full preview flex  justify-center p-10 items-center rounded transition-all"
//       // style={{ background }}
//     >
//       <GradientPicker background={background} setBackground={setBackground} />
//     </div>
//   )
// }

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string
  setBackground: (background: string) => void
  className?: string
}) {
  const solids = [
    '#091E3A',
    '#9400D3',
    '#c84e89',
    '#00F5A0',
    '#F7941E',
    '#72C6EF',
    '#FD8112',
    '#bf5ae0',
    '#fbed96',
    '#FFE000',
    '#F7F8F8',
    '#00416A',
    '#334d50',
    '#E2E2E2',
    '#ff75c3',
    '#ffa647',
    '#ffe83f',
    '#9fff5b',
    '#70e2ff',
    '#cd93ff',
    '#09203f',
  ]
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[220px] justify-start text-left font-normal',
            !background && 'text-muted-foreground',
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-4 w-4 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">
              {background ? background : 'Pick a color'}
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-black">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Color Picker</h4>
          </div>
        </div>
        <div className='flex flex-wrap gap-1 mt-4'>
        {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-105"
                onClick={() => setBackground(s)}
              />
            ))}
        </div>
        
        <Input
          id="custom"
          value={background}
          className="col-span-2 h-8 mt-4 bg-black text-white"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  )
}

