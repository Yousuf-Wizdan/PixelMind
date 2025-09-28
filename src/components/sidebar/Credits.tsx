import getUserCredits from '@/actions/users'
import { Coins, Sparkles } from 'lucide-react';
import React from 'react'

const Credits = async () => {

  const credits = await getUserCredits();

  return (
    <div className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50 px-2 py-1.5 transition-all duration-200 hover:shadow-sm border border-amber-200/50">
      <div className="flex items-center gap-1.5">
        <div className="relative">
          <div className="rounded-md bg-gradient-to-r from-amber-500 to-yellow-500 p-1">
            <Coins className="h-3 w-3 text-white" />
          </div>
          <Sparkles className="absolute -top-1 -right-1 h-2 w-2 text-amber-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>
        <div className="flex flex-col">
          <span className="text-amber-700 text-sm font-bold transition-colors duration-200 group-hover:text-amber-800">
            {credits}
          </span>
          <span className="text-amber-600/70 text-xs leading-tight">
            Credits
          </span>
        </div>
      </div>
    </div>
  )
}

export default Credits