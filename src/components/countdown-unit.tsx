export function CountdownUnit({ value, label }: { value: number, label: string }) {
    return (
      <div className="flex flex-col items-center bg-pink-100 rounded-lg p-2 sm:p-4 shadow-md">
        <span className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{value}</span>
        <span className="text-xs sm:text-sm md:text-base">{label}</span>
      </div>
    )
  }
  
  