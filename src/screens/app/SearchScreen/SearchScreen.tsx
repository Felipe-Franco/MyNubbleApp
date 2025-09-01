import React, { useState } from 'react'
import { FlatList, ListRenderItemInfo } from 'react-native'

import { Icon, ProfileUser, Screen, TextInput } from '@components'
import { User, useUserSearch } from '@domain'
import { useDebounce } from '@hooks'
import { AppScreenProps } from '@routes'
import { useSearchHistoryService } from '@services'

import { SearchHistory } from './components/SearchHistory'

type SearchScreenProps = AppScreenProps<'SearchScreen'>

export function SearchScreen({}: SearchScreenProps) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { list } = useUserSearch(debouncedSearch)
  const { addUser } = useSearchHistoryService()

  function renderItem({ item: user }: ListRenderItemInfo<User>) {
    return (
      <ProfileUser
        user={user}
        onPress={() => {
          addUser(user)
        }}
        profileAvatarProps={{ size: 48 }}
      />
    )
  }

  function keyExtractor(user: User) {
    return user.username
  }

  return (
    <Screen
      canGoBack={true}
      HeaderComponent={
        <TextInput
          value={search}
          placeholder='Digite sua busca'
          LeftComponent={<Icon name='search' color='gray3' />}
          onChangeText={setSearch}
        />
      }
    >
      {search.length === 0 ? (
        <SearchHistory />
      ) : (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </Screen>
  )
}
