# AR Cube Web Project

## Overview
The AR Cube Web Project is an augmented reality application that allows users to scan a cube using their mobile phones. The application utilizes AR technology to render a 3D cube model in real-time when the designated marker is detected.

## Project Structure
```
ar-cube-web-project
├── public
│   ├── index.html          # Main HTML document
│   ├── styles
│   │   └── main.css       # CSS styles for the application
│   └── assets
│       └── markers
│           └── pattern-marker.patt  # AR tracking marker
├── src
│   ├── index.js           # Main JavaScript entry point
│   ├── components
│   │   ├── ARScene.js     # Manages the AR environment
│   │   ├── CubeModel.js    # Handles the 3D cube model
│   │   └── UI.js          # Manages user interface elements
│   ├── utils
│   │   ├── ar-utils.js    # Utility functions for AR
│   │   └── device-detection.js  # Device capability detection
│   └── services
│       └── camera-access.js  # Camera access handling
├── models
│   └── cube.gltf          # 3D model of the cube
├── package.json           # npm configuration file
├── webpack.config.js      # Webpack configuration
└── README.md              # Project documentation
```

## Setup Instructions
1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd ar-cube-web-project
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Run the application**:
   ```
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000` to view the application.

## Usage
To use the AR Cube application:
1. Open the application on your mobile device.
2. Allow camera access when prompted.
3. Point your camera at the AR marker (pattern-marker.patt) to see the 3D cube rendered in augmented reality.

## Scanning the AR Cube
To scan the AR cube:
- Ensure you have a compatible mobile device with a camera.
- Use the application to scan the provided marker.
- The cube will appear on your screen once the marker is detected.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.