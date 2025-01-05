import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Response = {
  accessToken: string,
  refreshToken?: string
}

export default () => {
  const router = useRouter();
  const params = useSearchParams();

  const [ code, setCode ] = useState("");

  useEffect(() => {
    const callback = async () => {
      setCode(params.get("code") ?? "");
      if (code === "") {
        return;
      }

      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/accounts/kakao/signin`;
        const { data: { accessToken } } = await axios.post<Response>(
          url,
          { code },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        localStorage.setItem("accessToken", accessToken);
        router.push('/home');
      } catch(e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            const { email, nickname, profile_url } = await e.response?.data;
            router.push(`/signup?email=${email}&nickname=${nickname}&profile_url=${profile_url}`);
            return;
          }
        }

        router.push('/');
      }
    };

    callback();
  }, [code, params]);

  return <></>
  // return <>code: {code}</>
};
