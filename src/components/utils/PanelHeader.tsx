import {
  PanelHeaderButton,
  PanelHeader as VKPanelHeader,
} from '@vkontakte/vkui'
import BackButton from './BackButton'
import { PanelHeaderProps } from '@vkontakte/vkui/dist/components/PanelHeader/PanelHeader'

interface Props extends PanelHeaderProps {
  onBackButtonClick?(): void
  text: JSX.Element
  showBackButton: boolean
}

export default function PanelHeader({
  onBackButtonClick = () => {},
  text,
  showBackButton = true,
  ...rest
}: Props): JSX.Element {
  const vkPanelHeaderProps = { ...rest }
  if (showBackButton)
    vkPanelHeaderProps.left = (
      <PanelHeaderButton onClick={onBackButtonClick}>
        <BackButton />
      </PanelHeaderButton>
    )
  else vkPanelHeaderProps.left = undefined
  return <VKPanelHeader {...vkPanelHeaderProps}>{text}</VKPanelHeader>
}
