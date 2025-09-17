import { Icon, Text, TouchableOpacityBox } from '@components'

export type MenuItemProps = {
  label: string
  onPress: () => void
}

export function MenuItem({ label, onPress }: MenuItemProps) {
  return (
    <TouchableOpacityBox
      onPress={onPress}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      paddingVertical='s16'
    >
      <Text semiBold={true}>{label}</Text>
      <Icon name='chevronRight' />
    </TouchableOpacityBox>
  )
}
