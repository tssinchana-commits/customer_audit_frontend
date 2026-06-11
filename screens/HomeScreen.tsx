import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
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
];

export default function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>Today</Text>

      {/* BIG CARD */}
      <View style={styles.bigCard}>

        <Text style={styles.cardTitle}>
          TO COLLECT TODAY
        </Text>

        <Text style={styles.amount}>
          ₹17,280
        </Text>

        <View style={styles.row}>

          <View style={styles.due}>
            <Text style={styles.smallText}>
              3 due
            </Text>
          </View>

          <View style={styles.overdue}>
            <Text style={styles.smallText}>
              2 overdue
            </Text>
          </View>

        </View>

      </View>

      {/* SMALL CARDS */}
      <View style={styles.cardContainer}>

        <View style={styles.smallCard}>

          <Text style={styles.icon}>📅</Text>

          <Text style={styles.cardNumber}>
            3
          </Text>

          <Text style={styles.cardText}>
            Due today
          </Text>

        </View>

        <View style={styles.smallCard}>

          <Text style={styles.icon}>⚠️</Text>

          <Text style={styles.cardNumber}>
            2
          </Text>

          <Text style={styles.cardText}>
            Overdue
          </Text>

        </View>

      </View>

      {/* HEADER */}
      <View style={styles.listHeader}>

        <Text style={styles.listTitle}>
          Next collections
        </Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Dues')
          }
        >
          <Text style={styles.seeAll}>
            See all
          </Text>
        </TouchableOpacity>

      </View>

      {/* LIST */}
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
            <Text style={styles.amountText}>
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
    paddingTop: 70,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  bigCard: {
    backgroundColor: '#001B44',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
  },

  cardTitle: {
    color: '#aaa',
    marginBottom: 10,
  },

  amount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  due: {
    backgroundColor: '#00B3B3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  overdue: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  smallText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  smallCard: {
    width: '48%',
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    padding: 20,
  },

  icon: {
    fontSize: 28,
    marginBottom: 10,
  },

  cardNumber: {
    fontSize: 34,
    fontWeight: 'bold',
  },

  cardText: {
    marginTop: 10,
    color: 'gray',
    fontSize: 16,
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },

  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  seeAll: {
    color: '#2563eb',
    fontWeight: '600',
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

  amountText: {
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