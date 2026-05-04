import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Search, Heart, Star } from 'lucide-react-native';
import axios from 'axios';

interface Cancha {
  id: string | number;
  nombre: string;
  direccion: string;
  precio_hora: number;
  tipo_superficie: string;
}

export default function ReservarCancha() {
  const [canchas, setCanchas] = useState<Cancha[]>([]);
  const IP_MI_PC = "127.0.0.1"; // O tu IP si vuelves al celular

  useEffect(() => {
    const consultarCanchas = async () => {
      try {
        const respuesta = await axios.get(`http://${IP_MI_PC}:8000/canchas`);
        setCanchas(respuesta.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    consultarCanchas();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header Verde con Buscador */}
      <View style={styles.headerContainer}>
        <View style={styles.navBar}>
           <Text style={styles.navTitle}>RESERVAR CANCHA</Text>
        </View>
        
        <View style={styles.searchBar}>
          <Search color="#999" size={20} style={{marginRight: 10}} />
          <TextInput 
            placeholder="Buscar por nombre, ciudad o zona..." 
            style={styles.searchInput}
          />
        </View>

        {/* Filtros rápidos */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersScroll}>
          {['Fecha', 'Hora', 'Tipo', 'Superficie'].map((filter, index) => (
            <View key={index} style={styles.filterChip}>
              <Text style={styles.filterText}>{filter}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Lista de Canchas */}
      <FlatList
        data={canchas}
        contentContainerStyle={{ padding: 15 }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.imageContainer}>
              {/* Imagen de muestra - Luego usaremos URLs de Supabase */}
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=500' }} 
                style={styles.cardImage} 
              />
              <TouchableOpacity style={styles.heartButton}>
                <Heart color="white" size={20} />
              </TouchableOpacity>
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>{item.nombre}</Text>
              <Text style={styles.cardSubtitle}>(Bogotá, Chapinero)</Text>
              
              <View style={styles.ratingRow}>
                <Star color="#f1c40f" fill="#f1c40f" size={14} />
                <Text style={styles.ratingText}> 4.8 (120 reseñas)</Text>
              </View>

              <Text style={styles.cardDescription}>
                Cancha de 7, Césped {item.tipo_superficie}, Vestuarios, Parqueadero
              </Text>
              
              <Text style={styles.cardPrice}>${item.precio_hora.toLocaleString()} / hora</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerContainer: {
    backgroundColor: '#064e3b', // Verde oscuro de la imagen
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  navBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  navTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  searchBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 8,
    height: 45,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filtersScroll: { marginTop: 15 },
  filterChip: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  filterText: { color: 'white', fontSize: 12 },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
  },
  imageContainer: { position: 'relative' },
  cardImage: { width: '100%', height: 180 },
  heartButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 8,
    borderRadius: 20,
  },
  cardInfo: { padding: 15 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a1a1a' },
  cardSubtitle: { color: '#666', fontSize: 14, marginVertical: 2 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 4 },
  ratingText: { fontSize: 13, color: '#444' },
  cardDescription: { fontSize: 13, color: '#777', marginVertical: 5 },
  cardPrice: { fontSize: 18, fontWeight: 'bold', color: '#064e3b', marginTop: 5 },
});