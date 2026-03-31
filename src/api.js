const mockAlerts = [
  {
    id: "AL-1001",
    crime_type: "Theft",
    location: "Main Entrance",
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), 
    status: "active",
    confidence: 0.92,
    image_url: "https://images.unsplash.com/photo-1549492423-400259a2e574?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: "AL-1002",
    crime_type: "Vandalism",
    location: "Parking Lot B",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), 
    status: "resolved",
    confidence: 0.88,
    image_url: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: "AL-1003",
    crime_type: "Trespassing",
    location: "Back Alley",
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), 
    status: "active",
    confidence: 0.75,
    image_url: "https://images.unsplash.com/photo-1541888052161-001099b2eb8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: "AL-1004",
    crime_type: "Suspicious Activity",
    location: "Sector 4 Hallway",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), 
    status: "resolved",
    confidence: 0.65,
    image_url: "https://images.unsplash.com/photo-1453873531674-2151bcd01707?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  },
  {
    id: "AL-1005",
    crime_type: "Assault",
    location: "North Gate",
    timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(), 
    status: "active",
    confidence: 0.96,
    image_url: "https://images.unsplash.com/photo-1596773341883-9b921501e74f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
  }
];

export const fetchAlerts = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockAlerts);
      
    }, 800);
  });
};
