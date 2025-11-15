import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function Home(){
  const [state, setState] = useState<Post[] | undefined>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false) 
  
  useEffect(() => {
    const getData = async() => {
      setLoading(true)
      setError(false)
      try{
        let data = await fetch("https://jsonplaceholder.typicode.com/posts");
        let jsonData = await data.json()
        setState(jsonData)
      } catch (e) {
        setError(true)
        console.log(e)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])
  
  
  if (error) {
    return (
      <View style={{flex: 1}}><Text>Bir hata oluştu</Text></View>
    )
  }
  
  if (loading){
    return (
      <View><ActivityIndicator size={"large"} /></View>
    )
  }

  

  return (
    <FlatList
      data={state}
      renderItem={({ item }) => (
        <View>
          <Text style={{ fontSize: 24 }}>{item.title}</Text>
          <Text style={{ color: "#808080ff" }}>{item.body}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View>
          <Text>Burada görülecek bir şey yok</Text>
        </View>
      }
      ListHeaderComponent={
        <View>
            <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 20 }}>Header</Text>

        </View>
      }
      ListFooterComponent={
        <View>
          <Text style={{ textAlign: "center" }}>Footer</Text>
        </View>
      }
      ItemSeparatorComponent={() => (
        <View
          style={{ flex: 1, width: "100%", height: 1, borderTopWidth: 1 }}
        />
      )}
    />
  );
}