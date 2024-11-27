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
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-white">
              Equipo 3
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
      <DropdownMenuContent align="end" className="bg-gray-800 border border-gray-700 shadow-md">
        <DropdownMenuItem className="flex items-center hover:bg-gray-700 text-gray-200">
          <User className="mr-2 h-4 w-4" />
          <span>Equipo 6</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">
          <a href="/" className="flex items-center w-full text-gray-200">
            <User className="mr-2 h-4 w-4" />
            <span>Perfil</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">
          <button className="flex items-center w-full text-gray-200" onClick={() => console.log('Cerrar sesión')}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

