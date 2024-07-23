import axios, { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Response = {
  accessToken: string,
  refreshToken?: string
}

export default () => {
  const [ code, setCode ] = useState("");
  const params = useSearchParams();

  useEffect(() => {
    const callback = async () => {
      setCode(params.get("code") ?? "");
      if (code === "") {
        return;
      }

      try {
        const { data: { accessToken } } = await axios.post<Response>(
          "http://localhost:8080/kakao-redirected",
          { code },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );

        localStorage.setItem("accessToken", accessToken);
        location.href = "/home"
      } catch(e) {
        if (axios.isAxiosError(e)) {
          if (e.response?.status === 404) {
            const { email, nickname, profile_url } = await e.response?.data;
            location.href = `/?email=${email}&nickname=${nickname}&profile_url=${profile_url}`;
            return;
          }
        }

        location.href = "/";
      }
    };

    callback();
  }, [code, params]);

  return <>code: {code}</>
};