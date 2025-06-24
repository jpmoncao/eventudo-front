import { Loader2 } from "lucide-react";

import './globals.css';

export default function RootLoading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 size={48} />
      <span className="ml-4 text-gray-700">Carregando...</span>
    </div>
  )
}