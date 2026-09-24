import { Compass, Hotel, Landmark, Search, Utensils } from "lucide-react";

// Shared by the hero tabs and the explore segmented control so both stay in sync.
export const CATEGORIES = [
  {
    id: "all",
    label: "Search All",
    pillLabel: "All",
    icon: Search,
    placeholder: "Places to go, things to do, hotels...",
  },
  {
    id: "destinations",
    label: "Destinations",
    pillLabel: "Overview",
    icon: Compass,
    placeholder: "Search for a country or city...",
  },
  {
    id: "attractions",
    label: "Attractions",
    pillLabel: "Attractions",
    icon: Landmark,
    placeholder: "Search a destination for attractions...",
  },
  {
    id: "hotels",
    label: "Hotels",
    pillLabel: "Hotels",
    icon: Hotel,
    placeholder: "Search a destination for hotels...",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    pillLabel: "Restaurants",
    icon: Utensils,
    placeholder: "Search a destination for restaurants...",
  },
];

// Quick searches from the SRS (§3 Search): London, Paris, Dubai, Istanbul, Tokyo, Lahore, New York
export const POPULAR_SEARCHES = ["London", "Paris", "Dubai", "Istanbul", "Tokyo", "Lahore", "New York"];