// import axios from 'axios';
// import { Platform } from 'react-native';
// import Constants from 'expo-constants';

// // 개발 컴퓨터의 로컬 IP를 동적으로 감지합니다.
// // Expo Go 환경에서는 Constants.expoConfig?.hostUri를 통해 개발 서버 IP를 자동으로 받아옵니다.
// const getBaseUrl = (): string => {
//   // 1. 에뮬레이터 환경 판별
//   if (__DEV__) {
//     if (Platform.OS === 'android') {
//       // Android 에뮬레이터에서 호스트 PC의 localhost를 가리키는 특수 IP
//       return 'http://10.0.2.2:8080';
//     }
    
//     // Expo 개발 서버의 호스트 주소(IP) 추출 시도
//     const hostUri = Constants.expoConfig?.hostUri;
//     if (hostUri) {
//       const ip = hostUri.split(':').shift();
//       return `http://${ip}:8080`;
//     }
//   }

//   // 2. iOS 시뮬레이터 또는 기본값 (에뮬레이터 외 실제 배포 환경)
//   // 실제 서버에 배포하는 경우 배포된 서버 도메인 주소를 여기에 기입합니다.
//   return 'http://localhost:8080';
// };

// const apiClient = axios.create({
//   baseURL: getBaseUrl(),
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // 요청 인터셉터 추가 (필요시 토큰 등을 헤더에 주입)
// apiClient.interceptors.request.use(
//   (config) => {
//     // 예: const token = await AsyncStorage.getItem('token');
//     // if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 응답 인터셉터 추가 (에러 핸들링 단순화)
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API 통신 에러:', error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
