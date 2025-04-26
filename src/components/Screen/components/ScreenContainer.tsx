import { ScrollView, StyleSheet, View } from 'react-native'

interface ScreenContainerProps {
  children?: React.ReactNode
  backgroundColor: string
}

export function ScrollViewContainer({
  backgroundColor,
  children,
}: ScreenContainerProps) {
  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      style={{ ...styles.container, backgroundColor }}
    >
      {children}
    </ScrollView>
  )
}

export function ViewContainer({
  backgroundColor,
  children,
}: ScreenContainerProps) {
  return (
    <View style={{ ...styles.container, backgroundColor }}>{children}</View>
  )
}

const styles = StyleSheet.create({ container: { flex: 1 } })
