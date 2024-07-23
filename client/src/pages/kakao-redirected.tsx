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
          "http://localhost:8080/accounts/kakao/signin",
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
            const { email, picture, nickname } = await e.response?.data;
            location.href = `/signup?email=${email}&nickname=${nickname}&profile_url=${picture}`;
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