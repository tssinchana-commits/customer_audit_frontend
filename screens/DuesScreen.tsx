import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

const customers = [
  {
    id: 1,
    name: 'Rakesh Verma',
    loan: 'LN-2024-0017',
    amount: '₹3,580',
    date: '16 May',
    image: 'https://i.pravatar.cc/100?img=1',
  },
  {
    id: 2,
    name: 'Arjun Patel',
    loan: 'LN-2024-0073',
    amount: '₹3,810',
    date: '18 May',
    image: 'https://i.pravatar.cc/100?img=2',
  },
  {
    id: 3,
    name: 'Rahul Sharma',
    loan: 'LN-2024-0091',
    amount: '₹5,120',
    date: '19 May',
    image: 'https://i.pravatar.cc/100?img=3',
  },
  {
    id: 4,
    name: 'Kiran Kumar',
    loan: 'LN-2024-0123',
    amount: '₹2,450',
    date: '20 May',
    image: 'https://i.pravatar.cc/100?img=4',
  },
  {
    id: 5,
    name: 'Sanjay Patel',
    loan: 'LN-2024-0144',
    amount: '₹7,980',
    date: '21 May',
    image: 'https://i.pravatar.cc/100?img=5',
  },
];

export default function DuesScreen() {

  return (

    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Collections
      </Text>

      <Text style={styles.subHeading}>
        Pending loan collections
      </Text>

      {customers.map((item) => (

        <View
          key={item.id}
          style={styles.customerCard}
        >

          <View style={styles.leftSection}>

            <Image
              source={{ uri: item.image }}
              style={styles.avatar}
            />

            <View>

              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.loan}>
                {item.loan}
              </Text>

            </View>

          </View>

          <View>

            <Text style={styles.amount}>
              {item.amount}
            </Text>

            <Text style={styles.dateRed}>
              {item.date}
            </Text>

          </View>

        </View>

      ))}

    </ScrollView>
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
  },

  subHeading: {
    color: 'gray',
    marginBottom: 25,
    marginTop: 5,
  },

  customerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    padding: 15,
    borderRadius: 16,
    marginBottom: 15,
  },

  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  loan: {
    color: 'gray',
    marginTop: 5,
  },

  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },

  dateRed: {
    color: 'red',
    marginTop: 5,
    textAlign: 'right',
  },

});