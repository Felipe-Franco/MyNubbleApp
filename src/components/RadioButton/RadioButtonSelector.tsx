import { Box, Divider, RadioButtonItem } from '@components'

type ItemTConstraint = Record<string, any>

export type RadioButtonSelectorProps<ItemT extends ItemTConstraint> = {
  items: ItemT[]
  selectedItem?: ItemT
  onSelect: (item: ItemT) => void
  labelKey: keyof ItemT
  valueKey: keyof ItemT
  descriptionKey: keyof ItemT
}

export function RadioButtonSelector<ItemT extends ItemTConstraint>({
  items,
  selectedItem,
  onSelect,
  valueKey,
  descriptionKey,
  labelKey,
}: RadioButtonSelectorProps<ItemT>) {
  return (
    <Box>
      {items.map((item, index) => (
        <Box key={index}>
          <RadioButtonItem
            isSelected={
              selectedItem ? item[valueKey] === selectedItem[valueKey] : false
            }
            label={item[labelKey]}
            description={item[descriptionKey]}
            onPress={() => onSelect(item)}
          />
          {index < items.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  )
}
