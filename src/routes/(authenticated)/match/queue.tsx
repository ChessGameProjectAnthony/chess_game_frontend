import DefaultPageContainer from '@/components/Commons/DefaultPageContainer'
import { Button } from '@/components/ui/button'
import { createFileRoute, Link, redirect, useRouter } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/(authenticated)/match/queue')({
  component: RouteComponent,

})

function RouteComponent() {
  const [foundMatch, setFoundMatch] = useState(false)
  const { navigate } = useRouter()
  setTimeout(() => {
    setFoundMatch(true)
  }, 2000)
  setTimeout(() => {
    navigate({
      to: `/match/$matchId`, params: {
        matchId: "Fodase kfakfka"
      }
    })
  }, 3000)
  return (
    <DefaultPageContainer className='h-screen items-center justify-center gap-22'>
      {
        foundMatch ?
          <h1>Partida encontrada!</h1>
          :
          <h1
            className='max-h-fit bg-linear-to-r p-0 overflow-clip animate-WriteText max-w-fit repeat-infinite'
          >
            Buscando...
          </h1>
      }

      <Button asChild>
        <Link to='/play'>
          Cancelar
        </Link>
      </Button>
    </DefaultPageContainer >
  )
}
