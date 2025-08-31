//alias 무조건 사용 (FSD) -> @/layer/slices/segment 까지만 import 합니다.
//'@/entities/content/ui/Grandparent'; 이렇게도 가능하지만, 휴먼 에러 방지와 캡슐화를 위해 경로 아래처럼 작성!

import { Grandparent } from '@/entities/content/ui';

export const Example = () => {
  return (
    <div>
      <Grandparent />
    </div>
  );
};

// api는 entities에서 도메인별로 정의하고, features에서 사용하는 방식으로 정의합니다.
