The solution is to avoid using custom camera types and only use `Camera.Constants.Type.front` and `Camera.Constants.Type.back`.  This ensures compatibility with the Expo Camera API.

```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(CameraType.back);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        {/* ... other camera UI elements ... */}
      </Camera>
      <Button title="Flip Camera" onPress={() => {
          setType(type === CameraType.back ? CameraType.front : CameraType.back);
        }} />
    </View>
  );
}
```