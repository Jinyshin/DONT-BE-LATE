import { useEffect, useState } from 'react';
import PushModalExample from  '../../../components/Modal/PushModalExample';;
import {useParams, useRouter} from 'next/navigation';

export default function NotificationsPage() {
  const params = useParams<{ aid: string }>();
  const [aid, setAid] = useState<number | null>(null);
  const router=useRouter();

  useEffect(() => {
    if(params&&params.aid){
      const aidNumber = parseInt(params.aid,10);
      setAid(aidNumber);

      if(!isNaN(aidNumber)){
        router.push(`/appointments/${aidNumber}?modal=true`);
      }else{
        console.error('aid parameter is missing');
      }
    }
  }, [params, router]);



  return (
    <div>
      <h1>Notifications Page</h1>
    </div>
  );
}
