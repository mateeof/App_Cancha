import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Jugadores {
  id: string | number;
  nombre_jugador: string;
  posicion_favorita: string;
  nivel_habilidad: string;
  zona_bogota: string;
  disponible_para_jugar: boolean;
}


export default function BuscarJugadores() {
  const [jugadores, setJugadores] = useState<Jugadores[]>([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/jugadores')
      .then(res => setJugadores(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>¡Completa tu equipo!</Text>
        <Text style={styles.subTitle}>Jugadores Disponibles</Text>
      </View>

      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.playerCard}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.nombre_jugador} <Text style={styles.rating}>⭐ {item.nivel_habilidad}</Text></Text>
              <Text style={styles.detail}>{item.zona_bogota} | {item.posicion_favorita}</Text>
              <Text style={styles.availability}>Disponibilidad: {item.disponible_para_jugar}</Text>
            </View>
            <TouchableOpacity style={styles.btnContactar}>
              <Text style={styles.btnText}>Contactar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  subTitle: { fontSize: 16, color: '#064e3b', fontWeight: '600' },
  playerCard: { 
    flexDirection: 'row', 
    padding: 15, 
    marginHorizontal: 15, 
    marginBottom: 10, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 12,
    alignItems: 'center'
  },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  info: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: 'bold' },
  rating: { color: '#f1c40f', fontSize: 14 },
  detail: { color: '#666', fontSize: 13 },
  availability: { color: '#064e3b', fontSize: 12, marginTop: 4, fontWeight: '500' },
  btnContactar: { backgroundColor: '#064e3b', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 }
});