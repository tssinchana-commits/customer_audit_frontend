import API_BASE_URL from '../src/config/api';
import React, { useState, useEffect } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';


import { Ionicons } from '@expo/vector-icons';

export default function CustomerScreen() {

  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<any[]>([]);
  const [page, setPage] = useState(1);
const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

const fetchCustomers = (pageNumber=1) => {

  fetch(`${API_BASE_URL}/customer/api/v1/customers?page=${pageNumber}&size=5`)
    .then((response) => response.json())
    .then((data) => {

      console.log('API DATA:', data);
      if (pageNumber === 1) {
  setCustomers(data);
} else {
  setCustomers((prev) => [...prev, ...data]);
}
      setLoading(false);
      setRefreshing(false);

    })
    .catch((error) => {

      console.log(error);

      setLoading(false);
      setRefreshing(false);

    });

};

useEffect(() => {
  fetchCustomers();
}, []);

const onRefresh = () => {

  setRefreshing(true);

  fetchCustomers();

};

const loadMoreCustomers = () => {

  if (loadingMore) return;

  setLoadingMore(true);

  const nextPage = page + 1;

  fetch(
    `${API_BASE_URL}/customer/api/v1/customers?page=${nextPage}&size=5`
  )
    .then((response) => response.json())
    .then((data) => {

      if (data.length > 0) {

        setCustomers((prev) => [...prev, ...data]);

        setPage(nextPage);

      }

      setLoadingMore(false);

    })
    .catch((error) => {

      console.log(error);

      setLoadingMore(false);

    });

};

if (loading) {

  return (

    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >

      <ActivityIndicator
        size="large"
        color="#001B44"
      />

    </View>

  );
}

const filteredCustomers = customers.filter(
  (item) =>
    item.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    item.phone?.includes(search)
);

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        Customers
      </Text>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />

        <TextInput
          placeholder="Search by name or phone"
          value={search}
          onChangeText={setSearch}
          style={styles.searchBar}
        />

      </View>

{loading ? (
  <ActivityIndicator size="large" color="blue" />
) : (

      <FlatList
        data={filteredCustomers}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={loadMoreCustomers}
        onEndReachedThreshold={0.5}
        keyExtractor={(item,index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
  loadingMore ? (
    <ActivityIndicator
      size="small"
      color="#001B44"
      style={{ marginVertical: 20 }}
    />
  ) : null
}
        renderItem={({ item }) => (


          
          <TouchableOpacity style={styles.card}>

            <View style={styles.leftSection}>

              <Image
                source={{ uri:'https://i.pravatar.cc/100 ' }}
                style={styles.avatar}
              />

              <View>

                <Text style={styles.name}>
                  {item.name}
                </Text>

                <Text style={styles.phone}>
                  {item.phone}
                </Text>

              </View>

            </View>

            <View style={styles.rightSection}>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="gray"
              />

            </View>

          </TouchableOpacity>

        )}
      />
)}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchBar: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 16,
    borderRadius: 18,
    marginBottom: 14,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  phone: {
    color: 'gray',
    marginTop: 5,
  },

  rightSection: {
    alignItems: 'flex-end',
  },

});