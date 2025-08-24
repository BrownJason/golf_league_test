# Flyover Feature Chat Documentation

## User Question
Is it possible to create a fly over of each hole of the course that we are golfing on. Using a separate page to host each fly-over. Only show one at a take and have navigation at the bottom of the page to select which hole you'd llike to see the fly over of.

## Copilot Response
Yes, it's possible to create a fly-over page for each hole of the golf course in your React project. Here’s a high-level approach:

1. **Create a separate React component/page for each hole’s fly-over.**  
   Each page can display a video, animation, or image representing the fly-over.

2. **Use React Router** to navigate between pages for each hole.  
   This allows only one fly-over to be shown at a time.

3. **Add navigation controls** (e.g., buttons or links) at the bottom of each page to select which hole’s fly-over to view.

**Example structure:**
- `/flyover/hole/1`
- `/flyover/hole/2`
- ...
- Navigation at the bottom: “Previous Hole”, “Next Hole”, or a dropdown to select a hole.

Would you like a sample implementation or code scaffold for this?

---

## User Question
Is it possible to use something like google maps for the fly-over?

## Copilot Response
Yes, you can use Google Maps for the fly-over effect. Google Maps JavaScript API allows you to embed interactive maps, satellite views, and even custom overlays for each hole.

**Options:**
- Use the **Satellite view** to show the course layout.
- Use the **Street View** or **custom markers/paths** to highlight each hole.
- Animate the map or pan/zoom to simulate a fly-over.

**How to implement:**
1. Get a Google Maps API key.
2. Use a React Google Maps library (e.g., `@react-google-maps/api`) to embed the map.
3. Center the map on each hole’s coordinates for each fly-over page.
4. Add navigation to switch between holes.

Would you like sample code for integrating Google Maps in your React project?

---

## User Question
Yes, can you show me sample code for integrating google maps.

## Copilot Response
Certainly! Here’s a sample of how to integrate Google Maps in your React project using [`@react-google-maps/api`](https://www.npmjs.com/package/@react-google-maps/api):

**1. Install the package:**
```powershell
npm install @react-google-maps/api
```

**2. Create a FlyoverMap component:**
```jsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

// Example coordinates for a hole (replace with actual hole coordinates)
const holeCoordinates = {
  lat: 37.7749,
  lng: -122.4194,
};

const FlyoverMap = ({ holeNumber, coordinates }) => (
  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates || holeCoordinates}
      zoom={18}
      mapTypeId="satellite"
    >
      <Marker position={coordinates || holeCoordinates} label={`Hole ${holeNumber}`} />
    </GoogleMap>
  </LoadScript>
);

export default FlyoverMap;
```

**3. Use the component in your fly-over page:**
```jsx
import React from "react";
import FlyoverMap from "../components/FlyoverMap";

const holeData = [
  { number: 1, coordinates: { lat: 37.7749, lng: -122.4194 } },
  // Add more holes here...
];

const FlyoverPage = () => {
  const [currentHole, setCurrentHole] = React.useState(0);

  return (
    <div>
      <h2>Hole {holeData[currentHole].number} Fly-over</h2>
      <FlyoverMap
        holeNumber={holeData[currentHole].number}
        coordinates={holeData[currentHole].coordinates}
      />
      <div style={{ marginTop: "20px" }}>
        <button
          disabled={currentHole === 0}
          onClick={() => setCurrentHole(currentHole - 1)}
        >
          Previous Hole
        </button>
        <button
          disabled={currentHole === holeData.length - 1}
          onClick={() => setCurrentHole(currentHole + 1)}
        >
          Next Hole
        </button>
      </div>
    </div>
  );
};

export default FlyoverPage;
```

**Note:**  
- Replace `"YOUR_GOOGLE_MAPS_API_KEY"` with your actual API key.
- Add real coordinates for each hole in `holeData`.

Let me know if you need help with routing or more advanced map features!

---

## User Comment
When suggesting using API keys, those DO NOT go into the client code or any component. These go into a key store or into a .env file so they are not exposed to the public.

## Copilot Response
You're absolutely right! API keys should **never** be hard-coded in client-side code or components, as this exposes them to the public. Instead, store your API key in a `.env` file and access it via environment variables.

**Example:**

1. **Add your API key to `.env`:**
```
REACT_APP_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

2. **Access it in your component:**
```jsx
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const FlyoverMap = ({ holeNumber, coordinates }) => (
  <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={coordinates}
      zoom={18}
      mapTypeId="satellite"
    >
      <Marker position={coordinates} label={`Hole ${holeNumber}`} />
    </GoogleMap>
  </LoadScript>
);

export default FlyoverMap;
```

**Note:**  
- Never commit your `.env` file to version control.
- Restart your development server after adding or changing `.env` variables.

This keeps your API keys secure and out of your public codebase.