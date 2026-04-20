// G.I. RADIO ENGINE
// AI-generated radio stations + playlists

export interface GiRadioStation {
  id: string;
  name: string;
  description: string;
  tracks: string[];
}

const stations: GiRadioStation[] = [];

export function createStation(name: string, description: string) {
  const s: GiRadioStation = {
    id: "radio-" + Math.random().toString(36).substring(2, 10),
    name,
    description,
    tracks: []
  };
  stations.push(s);
  return s;
}

export function listStations() {
  return stations;
}

export function addTrack(station_id: string, track: string) {
  const s = stations.find(st => st.id === station_id);
  if (s) s.tracks.push(track);
  return s;
}

