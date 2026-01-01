import DefaultPageContainer from '@/components/Commons/DefaultPageContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(authenticated)/(layout)/profile/manage-account/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <DefaultPageContainer>
      Manage
    </DefaultPageContainer>
  )
}
