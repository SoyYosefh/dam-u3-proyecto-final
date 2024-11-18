'use client'

import { User, LogOut } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-primary">
              Mi Aplicación
            </a>
          </div>
          <div className="">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  )
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative size-20 rounded-full">
          <img
            src="/logo.jpeg"
            alt="Avatar del usuario"
            className="rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border shadow-md">
        <DropdownMenuItem className="flex items-center hover:bg-accent">
          <User className="mr-2 h-4 w-4" />
          <span>Juan Pérez</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-accent">
          <a href="/" className="flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-accent">
          <button className="flex items-center w-full" onClick={() => console.log('Cerrar sesión')}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}