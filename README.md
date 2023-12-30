## Controller <=> Service Layer <=> Data Access layer

#### 3개의 계층으로 관심사를 분리했습니다.

1. Controller(/controllers) => req를 받아서 res 처리
2. Service(/services) => 비즈니스 로직
3. Data(/models) => DB에 접근하는 queries