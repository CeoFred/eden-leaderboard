export default function AlternativeStatsSection() {
  return (
    <div className="w-full py-12 md:py-16 dark:bg-black">
      <div className="mx-auto max-w-6xl px-4">
        {/* Mobile layout (vertical) */}
        <div className="relative px-8 md:hidden">
          {/* Left vertical line */}
          <div className="absolute top-0 bottom-0 left-0 w-px">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-purple-600 to-transparent opacity-80 shadow-[0_0_4px_2px_rgba(138,43,226,0.6)]" />
          </div>

          {/* Right vertical line */}
          <div className="absolute top-0 right-0 bottom-0 w-px">
            <div className="h-full w-0.5 bg-gradient-to-b from-transparent via-purple-600 to-transparent opacity-80 shadow-[0_0_4px_2px_rgba(138,43,226,0.6)]" />
          </div>

          <div className="flex flex-col space-y-10">
            {/* Fee */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-4xl font-bold">$0.00004</h3>
              <p className="mt-2 text-gray-400">Average Transaction Fee</p>
            </div>

            {/* Chains */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-4xl font-bold">3</h3>
              <p className="mt-2 text-gray-400">Supported Chains</p>
            </div>

            {/* Monitoring */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-4xl font-bold">24/7</h3>
              <p className="mt-2 text-gray-400">AI Monitoring</p>
            </div>

            {/* Risk Reduction */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-4xl font-bold">87%</h3>
              <p className="mt-2 text-gray-400">Risk Reduction</p>
            </div>
          </div>
        </div>

        {/* Desktop layout (horizontal) */}
        <div className="relative hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-4xl font-bold md:text-5xl">$0.00004</h3>
            <p className="mt-2 text-gray-400">Average Transaction Fee</p>
          </div>

          {/* Divider 1 */}
          <div className="absolute top-0 bottom-0 left-1/4 hidden w-px lg:block">
            <div className="h-full w-[0.5px] bg-gradient-to-b from-transparent via-purple-600 to-transparent opacity-80 shadow-[0_0_4px_1px_rgba(138,43,226,0.6)]" />
          </div>

          {/* Chains */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-4xl font-bold md:text-5xl">3</h3>
            <p className="mt-2 text-gray-400">Supported Chains</p>
          </div>

          {/* Divider 2 */}
          <div className="absolute top-0 bottom-0 left-1/2 hidden w-px lg:block">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-purple-600 to-transparent opacity-80 shadow-[0_0_4px_1px_rgba(138,43,226,0.6)]" />
          </div>

          {/* Monitoring */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-4xl font-bold md:text-5xl">24/7</h3>
            <p className="mt-2 text-gray-400">AI Monitoring</p>
          </div>

          {/* Divider 3 */}
          <div className="absolute top-0 bottom-0 left-3/4 hidden w-px lg:block">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-purple-600 to-transparent opacity-80 shadow-[0_0_4px_1px_rgba(138,43,226,0.6)]" />
          </div>

          {/* Risk Reduction */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h3 className="text-4xl font-bold md:text-5xl">87%</h3>
            <p className="mt-2 text-gray-400">Risk Reduction</p>
          </div>
        </div>
      </div>
    </div>
  )
}
