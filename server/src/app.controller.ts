import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('init')
  async initDB() {
    const GID_BEGIN = 300;
    const UID_BEGIN = 1000;

    console.log("initializer begin");

    await this.prisma.rankings.deleteMany({
      where: { uid: { gte: UID_BEGIN } }
    });
    await this.prisma.checkins.deleteMany({
      where: { uid: { gte: UID_BEGIN } }
    });
    await this.prisma.participants.deleteMany({
      where: { uid: { gte: UID_BEGIN } }
    });
    await this.prisma.groupMembers.deleteMany({
      where: { uid: { gte: UID_BEGIN } }
    });
    await this.prisma.appointments.deleteMany({
      where: { gid: { gte: GID_BEGIN } }
    });
    await this.prisma.groups.deleteMany({
      where: { id: { gte: GID_BEGIN } }
    });
    await this.prisma.users.deleteMany({
      where: { id: { gte: UID_BEGIN } }
    });

    console.log("sucessfully deleted");

    await this.prisma.users.createMany({
      data: data.users
    });
    await this.prisma.groups.createMany({
      data: data.groups
    });
    await this.prisma.appointments.createMany({
      data: data.appointments
    });
    await this.prisma.groupMembers.createMany({
      data: data.groupmembers
    });
    await this.prisma.participants.createMany({
      data: data.participants
    });
    await this.prisma.checkins.createMany({
      data: data.checkins
    });
    await this.prisma.rankings.createMany({
      data: data.rankings
    });

    console.log("sucessfully created");

    return { status: "success" };
  }
}

const data = {
  users: [
    {
      id: 1000,
      email: "whtmddhks@email.com",
      password: "NJs8zLWOEnYA0krl+V6TeKVWn8AsiAh6xhXveji5ZrM=",
      nickname: "조승완",
      profile_url: ""
    },
    {
      id: 1001,
      email: "dksrbcks@email.com",
      password: "NJs8zLWOEnYA0krl+V6TeKVWn8AsiAh6xhXveji5ZrM=",
      nickname: "안규찬",
      profile_url: ""
    },
    {
      id: 1002,
      email: "qkrdbstj@email.com",
      password: "NJs8zLWOEnYA0krl+V6TeKVWn8AsiAh6xhXveji5ZrM=",
      nickname: "박윤서",
      profile_url: ""
    },
    {
      id: 1003,
      email: "tlswlsdud@email.com",
      password: "NJs8zLWOEnYA0krl+V6TeKVWn8AsiAh6xhXveji5ZrM=",
      nickname: "신진영",
      profile_url: "http://k.kakaocdn.net/dn/4Ac4t/btsH9Wgc8dS/uAL0pnBt2OsJVD6E9W1Tj0/img_110x110.jpg"
    }
  ],
  groups: [
    {
      id: 300,
      name: "몰입캠프 1분반",
      participation_code: "SZQHQQ"
    },
    {
      id: 301,
      name: "몰입캠프 1분반 4주차",
      participation_code: "EAR06U"
    }
  ],
  appointments: [
    {
      id: 10000,
      gid: 300,
      title: "2024-07-24 스크럼",
      meet_at: new Date("2024-07-24T11:30:00"),
      location: "대학로 291 N1 111호",
      penalty: "조교님께 커피 사기"
    },
    {
      id: 10001,
      gid: 300,
      title: "마지막 스크럼!",
      meet_at: new Date("2024-07-25T11:30:00"),
      location: "대학로 291 N1 111호",
      penalty: "조교님께 커피 사기"
    },
    {
      id: 10002,
      gid: 300,
      title: "몰입캠프 1분반 MT",
      meet_at: new Date("2024-07-25T17:30:00"),
      location: "계룡산 등나무펜션",
      penalty: "고기 굽기 담당 or 장기 자랑"
    },
    {
      id: 10003,
      gid: 300,
      title: "스타트업 오피스투어",
      meet_at: new Date("2024-08-14T14:00:00"),
      location: "서울 강남구 테헤란로7길 22",
      penalty: "우당탕탕 천하제일 장기자 랑"
    },
    {
      id: 10004,
      gid: 301,
      title: "0723 감자탕",
      meet_at: new Date("2024-07-23T18:00:00"),
      location: "카이스트 쪽문",
      penalty: "없음"
    },
    {
      id: 10005,
      gid: 301,
      title: "0724 피크닉",
      meet_at: new Date("2024-07-24T17:30:00"),
      location: "N1 앞 잔디밭",
      penalty: "음료수 사주기"
    },
    {
      id: 10006,
      gid: 301,
      title: "0725 마지막 저녁",
      meet_at: new Date("2024-07-23T18:00:00"),
      location: "미정",
      penalty: "없음"
    },
  ],
  groupmembers: [
    { gid: 300, uid: 1000 },
    { gid: 300, uid: 1001 },
    { gid: 300, uid: 1002 },
    { gid: 300, uid: 1003 },
    { gid: 301, uid: 1002 },
    { gid: 301, uid: 1003 },
  ],
  participants: [
    { aid: 10000, uid: 1000 },
    { aid: 10000, uid: 1001 },
    { aid: 10000, uid: 1002 },
    { aid: 10000, uid: 1003 },
    { aid: 10001, uid: 1000 },
    { aid: 10001, uid: 1001 },
    { aid: 10001, uid: 1002 },
    { aid: 10001, uid: 1003 },
    { aid: 10002, uid: 1000 },
    { aid: 10002, uid: 1001 },
    { aid: 10002, uid: 1002 },
    { aid: 10002, uid: 1003 },
    { aid: 10003, uid: 1000 },
    { aid: 10003, uid: 1001 },
    { aid: 10003, uid: 1002 },
    { aid: 10003, uid: 1003 },
    { aid: 10004, uid: 1002 },
    { aid: 10004, uid: 1003 },
    { aid: 10005, uid: 1002 },
    { aid: 10005, uid: 1003 },
    { aid: 10006, uid: 1002 },
    { aid: 10006, uid: 1003 },
  ],
  checkins: [
    { aid: 10000, uid: 1000 },
    { aid: 10000, uid: 1001 },
    { aid: 10000, uid: 1002 },
    { aid: 10001, uid: 1000 },
    { aid: 10001, uid: 1001 },
    { aid: 10001, uid: 1002 },
    { aid: 10001, uid: 1003 },
    { aid: 10002, uid: 1000 },
    { aid: 10002, uid: 1001 },
    { aid: 10002, uid: 1002 },
    { aid: 10002, uid: 1003 },
    { aid: 10004, uid: 1002 },
    { aid: 10004, uid: 1003 },
    { aid: 10005, uid: 1002 },
    { aid: 10005, uid: 1003 },
  ],
  rankings: [
    {
      gid: 300, uid: 1000,
      year: 2024, month: 7, accumulated_time: 0
    },
    {
      gid: 300, uid: 1001,
      year: 2024, month: 7, accumulated_time: 0
    },
    {
      gid: 300, uid: 1002,
      year: 2024, month: 7, accumulated_time: 0
    },
    {
      gid: 300, uid: 1003,
      year: 2024, month: 7, accumulated_time: 0
    },
    {
      gid: 301, uid: 1002,
      year: 2024, month: 7, accumulated_time: 0
    },
    {
      gid: 301, uid: 1003,
      year: 2024, month: 7, accumulated_time: 0
    },
  ]
}
