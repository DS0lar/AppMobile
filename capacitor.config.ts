import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'MiApp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
