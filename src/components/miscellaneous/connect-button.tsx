import { cn } from '~/lib/utils'

export default function ConnectButton() {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2.5 rounded-lg border border-[rgba(150,105,237,0.1)] bg-[#0A090B] px-4 py-2 text-md font-medium text-white shadow-[1px_2px_200px_0px_rgba(150,105,237,0.5)] transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[rgba(150,105,237,0.1)] hover:via-[#9669ED] hover:to-[rgba(150,105,237,0.1)]'
      )}
    >
      Connect Wallet
    </button>
  )
}
