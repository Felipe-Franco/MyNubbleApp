import { Box, ProfileAvatar, Text } from '@components'

interface PostHeaderProps {
  profileURL: string
  name: string
}

export function PostHeader({ profileURL, name }: PostHeaderProps) {
  return (
    <Box flexDirection='row' alignItems='center'>
      <ProfileAvatar profileURL={profileURL} />
      <Text preset='paragraphMedium' semiBold={true} marginLeft='s12'>
        {name}
      </Text>
    </Box>
  )
}
