import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [data, setData] = useState([])

  const getData = async() => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonData = await data.json()
    setData(jsonData);
  }

  useEffect(() => {
    getData()
  }, [])

  if (data.length === 0){
    return <Text>Yükleniyor...</Text>
  }

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={styles.container}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.renderItemContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.body}</Text>

          <Text style={{textAlign: "right"}}>
            <Text>ID {item.id}</Text>{" "}
            <Text>posted by {item.userId}</Text>
          </Text>

        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textTransform: "capitalize",
  },
  container: {
    padding: 16,
  },
  renderItemContainer: {
    backgroundColor: "#f0f0f0ff",
    marginBottom: 8,
    padding: 12,
    borderRadius: 4,
  },
  desc: {
    fontSize: 12,
    color: "#646464ff",
  },
});
