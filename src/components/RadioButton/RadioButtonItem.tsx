import { Box, RadioButton, RadioButtonProps, Text } from '@components'

export type RadioButtonItemProps = RadioButtonProps & {
  label: string
  description?: string
}

export function RadioButtonItem({
  label,
  description,
  isSelected,
  onPress,
}: RadioButtonItemProps) {
  return (
    <Box paddingVertical='s12'>
      <Box
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Text semiBold={true}>{label}</Text>
        <RadioButton isSelected={isSelected} onPress={onPress} />
      </Box>

      {description && (
        <Text color='paragraphSecondary' width='80%'>
          {description}
        </Text>
      )}
    </Box>
  )
}
