import DefaultPageContainer from '@/components/Commons/DefaultPageContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(layout)/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DefaultPageContainer>
      Home fkakfka

    </DefaultPageContainer>
  )
}
