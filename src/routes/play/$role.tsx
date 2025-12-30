import { createFileRoute, useParams } from '@tanstack/react-router';
import Gameboard, { PlayerTypes } from '../../components/Gameboard'
import { GameboardProvider } from '../../context/GameboardContextProvider'

export const Route = createFileRoute("/play/$role")({
  component: Play,
});

function Play() {
  const { role } = useParams({ from: '/play/$role' })


  return (
    <>
      <GameboardProvider>
        <Gameboard playerRole={role as PlayerTypes} />
      </GameboardProvider>
    </>
  )
}

