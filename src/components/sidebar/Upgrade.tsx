'use client'

import { authClient } from '@/lib/auth-client'
import React from 'react'
import { Button } from '../ui/button'
import { Crown, Sparkles } from 'lucide-react'

const Upgrade = () => {

  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "e26ecf14-9b3f-4e48-b8b9-a2ca3030da6c",
        "fc00d8f1-246d-4356-9af8-91bf9e844dcd",
        "af0e0639-d255-407b-bb6c-447d50ae9483"
      ]
    })
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="group relative ml-2 cursor-pointer overflow-hidden border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
      onClick={upgrade}
    >
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Upgrade</span>
        <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  )
}

export default Upgrade