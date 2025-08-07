import React from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { Box, Icon, ProfileUser, Text } from '@components'
import { User } from '@domain'
import { useSearchHistory, useSearchHistoryService } from '@services'

export function SearchHistory() {
  const userList = useSearchHistory()
  const { removeUser } = useSearchHistoryService()

  function renderItem({ item: user }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={user}
        marginBottom='s8'
        profileAvatarProps={{ size: 48 }}
        RightComponent={
          <Icon
            name='trash'
            color='primary'
            onPress={() => {
              removeUser(user.id)
            }}
          />
        }
      />
    )
  }

  function keyExtractor(user: User) {
    return user.username
  }
  return (
    <Box>
      <FlatList
        ListHeaderComponent={
          <Text preset='headingMedium' marginBottom='s16'>
            Buscas recentes
          </Text>
        }
        data={userList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Box>
  )
}
