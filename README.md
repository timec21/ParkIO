# ParkIO

ParkIO is a mobile application designed to help users explore and discover parks nearby. The app provides detailed information about parks, including their facilities, descriptions, and images. With ParkIO, users can add parks to their favorites, view them on a map, and even download park images for offline use.

## Features

- **Discover Parks**: View detailed information about parks in selected regions (e.g., California and Colorado).
- **Interactive Map**: Visualize parks on an interactive map using React Native Maps.
- **Favorites**: Add parks to your favorites and access them anytime.
- **Offline Access**: Download park images to your device.
- **Modern UI/UX**: User-friendly design with React Native Paper components.

## Screenshots

### Login and Register screen
![Login Screen](./assets/appimages/loginScreen.png)

### Home Screen
![Home Screen](./assets/appimages/HomeScreen.png)

### Map Screen
![Map Screen](./assets/appimages/MapScreen.png)

### Profile Details
![Park Details](./assets/appimages/ProfileScreen.png)

### Detail Screen
![Park Details](./assets/appimages/DetailScreen.png)

### Favorites Screen
![Favorites Screen](./assets/appimages/FavoritesScreen.png)

## Installation

To run ParkIO locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ParkIO.git
   cd ParkIO
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run the app on an Android emulator or connected device:
   ```bash
   press 'A'
   ```

## API Integration

ParkIO uses the [National Park Service API](https://developer.nps.gov) to fetch park data. Ensure you have a valid API key and set it in the appropriate configuration file.

## Usage

- **Explore Parks**: Use the map or search functionality to find parks.
- **View Details**: Tap on a park to see its detailed information.
- **Add to Favorites**: Save parks to your favorites for quick access.
- **Download Images**: Download park images for offline viewing.

## Technologies Used

- **React Native**: For building the mobile application.
- **React Native Maps**: For displaying parks on a map.
- **React Native Paper**: For a modern and consistent UI.
- **SQLite**: For local data storage.
- **Axios**: For API requests.


## License

This project is licensed under the MIT License. See the LICENSE file for more details.

