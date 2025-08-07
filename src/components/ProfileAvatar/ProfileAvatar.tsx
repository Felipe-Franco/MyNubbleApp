import { Image } from 'react-native'

export interface ProfileAvatarProps {
  profileURL: string
  size?: number
  borderRadius?: number
}

export function ProfileAvatar({
  profileURL,
  size = 32,
  borderRadius = 14,
}: ProfileAvatarProps) {
  return (
    <Image
      style={{ width: size, height: size, borderRadius }}
      source={{ uri: profileURL }}
    />
  )
}
