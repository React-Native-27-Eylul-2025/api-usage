import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: Boolean;
};

export default function Explore() {
  const [state, setState] = useState<Todo[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      setError(false);
      try {
        let data = await fetch("https://jsonplaceholder.typicode.com/todos");
        let jsonData = await data.json();
        setState(jsonData);
      } catch (e) {
        setError(true);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1 }}>
        <Text>Bir hata oluştu</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <FlatList
      data={state}
      renderItem={({ item }) => (
        <View
          style={{ flexDirection: "row", flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}
        >
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Ionicons
              name={
                item.completed ? "checkmark-circle" : "checkmark-circle-outline"
              }
              size={24}
              color={item.completed ? "green" : "red"}
            />
            <Text style={{flex: 1, paddingHorizontal: 24, fontSize: 18}}>{item.title}</Text>
          </View>
          <Text>{item.userId}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View>
          <Text>Burada görülecek bir şey yok</Text>
        </View>
      }
      ListHeaderComponent={
        <View>
          <Text
            style={{ textAlign: "center", fontSize: 20, marginVertical: 20 }}
          >
            Header
          </Text>
        </View>
      }
      ListFooterComponent={
        <View>
          <Text style={{ textAlign: "center" }}>Footer</Text>
        </View>
      }
    />
  );
}
