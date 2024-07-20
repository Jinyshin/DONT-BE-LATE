import TimelineCard from '../components/TimelineCard';
import { formatDate } from '../utils/dateFormatter';
import {useRouter} from 'next/router';

export default function Home() {
  const handleCheckIn = () => {
    alert('Checked in!');
  };
  const router= useRouter();

  const appointments = [
    {
      title: '밥 약속',
      location: '사당역 2호선 00식당',
      date: formatDate('2024-05-26T10:00:00'),
    },
    {
      title: '취업 스터디',
      location: '사당역 2호선 00카페',
      date: formatDate('2024-05-26T14:00:00'),
    },
  ];

  return (
    <div>
      <h1>나의 약속</h1>
      {appointments.map((appointment, index) => (
        <TimelineCard
          key={index}
          title={appointment.title}
          location={appointment.location}
          date={appointment.date}
          onCheckIn={handleCheckIn}
        />
      ))}
      <button onClick={()=>router.push('/login')}>임시버튼입니당</button>
    </div>
  );
}

// import styles from '../styles/Home.module.css';

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing{' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/canary/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by{' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   );
// }
