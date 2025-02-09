import { ApiBuilder, BASE_URL } from "./common";


type SignInReqDto = { email: string, password: string };
type SignInResDto = { accessToken: string };
export const signIn = new ApiBuilder()
  .setUrl("accounts/signin", BASE_URL)
  .setMethod("POST")
  .setHeader("Content-Type", "application/json")
  .commit<SignInReqDto, SignInResDto>();

type KakaoSignInReqDto = { code: string };
type KakaoSignInResDto = SignInResDto;
export const kakaoSignIn = new ApiBuilder()
  .setUrl("accounts/kakao/signin", BASE_URL)
  .setMethod("POST")
  .setHeader("Content-Type", "application/json")
  .commit<KakaoSignInReqDto, KakaoSignInResDto>();

type SignUpReqDto = {
  email: string,
  nickname: string,
  password: string,
  profileUrl?: string,
};
type SignUpResDto = { id: number };
export const signUp = new ApiBuilder()
  .setUrl("accounts/signup", BASE_URL)
  .setMethod("POST")
  .setHeader("Content-Type", "application/json")
  .commit<SignUpReqDto, SignUpResDto>();
