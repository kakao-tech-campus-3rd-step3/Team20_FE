// shared layer에선 슬라이스(ui,hooks,utils)마다 public api를 두면 좋을것 같습니다.
// TODO : shared에서 컴포넌트를 정의한 이상, 이 컴포넌트가 사용될 수 있는 상위 컴포넌트가 있다면
// 무조건 shared컴포넌트를 재사용해주셔야 해요! import경로도 앞으로@/shared/ui/로 해주세요!
export { IconButton } from './IconButton/IconButton';
export { Button, buttonVariants } from './Button/Button';
