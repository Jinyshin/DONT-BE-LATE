import axios, { AxiosResponse } from "axios";
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
            const { email, picture, nickname } = await e.response?.data;
            location.href = `/signup?email=${email}&nickname=${nickname}&profile_url=${picture}`;
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