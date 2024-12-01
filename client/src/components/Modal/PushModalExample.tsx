import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import confetti from 'canvas-confetti';

interface PushModalExampleProps{
  appointmentdata: {
    title: string,
    penalty: string,
    latecheckins: {name: string, latency:number,}[],
    earlycheckins: {name: string, latency:number,}[],
    incompletecheckins: {name: string}[],
    meet_at: Date};
  data?: {message: string};
  onClose: () => void;
}

export default function PushModalExample(
  {data, appointmentdata, onClose}: PushModalExampleProps
) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <h2>푸시 알림</h2>
        <p>{data ? data.message : '알림 내용을 확인할 수 없습니다.'}</p>
        <p>{appointmentdata?.meet_at ? new Date(appointmentdata.meet_at).toLocaleString() : '약속시간을 확인할 수 없습니다.'}</p>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}
