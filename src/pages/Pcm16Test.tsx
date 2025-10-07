import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Pcm16Test: React.FC = () => {
  const [status, setStatus] = useState<string>('대기 중');
  const audioContextRef = useRef<AudioContext | null>(null);

  // PCM16 → Float32 변환 함수
  const pcm16ToFloat32 = (pcm16Array: Int16Array): Float32Array => {
    const float32Array = new Float32Array(pcm16Array.length);
    for (let i = 0; i < pcm16Array.length; i++) {
      // Int16 범위: -32768 ~ 32767을 -1.0 ~ 1.0으로 변환
      float32Array[i] = pcm16Array[i] / 32768.0;
    }
    return float32Array;
  };

  // 테스트용 PCM16 데이터 생성 (440Hz 사인파, 1초)
  const generateTestPcm16 = (): Int16Array => {
    const sampleRate = 24000;
    const duration = 1; // 1초
    const frequency = 440; // A4 음
    const numSamples = sampleRate * duration;
    const pcm16 = new Int16Array(numSamples);

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;
      const value = Math.sin(2 * Math.PI * frequency * t);
      // Float (-1.0 ~ 1.0)을 Int16 (-32768 ~ 32767)로 변환
      pcm16[i] = Math.floor(value * 32767);
    }

    return pcm16;
  };

  // PCM16 데이터를 AudioBuffer로 재생
  const playPcm16Audio = async () => {
    try {
      setStatus('PCM16 데이터 생성 중...');
      
      // 1. 테스트용 PCM16 데이터 생성
      const pcm16Data = generateTestPcm16();

      setStatus('Float32로 변환 중...');
      
      // 2. PCM16 → Float32 변환
      const float32Data = pcm16ToFloat32(pcm16Data);

      setStatus('AudioContext 초기화 중...');
      
      // 3. AudioContext 생성 (이미 있으면 재사용)
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 24000 });
      }
      
      const audioContext = audioContextRef.current;
      
      // AudioContext가 suspended 상태면 resume
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      setStatus('AudioBuffer 생성 중...');
      
      // 4. AudioBuffer 생성
      const audioBuffer = audioContext.createBuffer(
        1,              // 채널 수 (모노)
        float32Data.length,  // 샘플 수
        24000           // 샘플레이트
      );

      // 5. Float32 데이터를 AudioBuffer에 복사
      audioBuffer.copyToChannel(float32Data, 0);

      setStatus('재생 중...');
      
      // 6. AudioBufferSourceNode로 재생
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      source.onended = () => {
        setStatus('재생 완료');
      };

      source.start(0);

    } catch (error) {
      setStatus(`오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">PCM16 → Float32 → Web Audio API 테스트</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">테스트 정보</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>샘플레이트: 24000 Hz</li>
              <li>채널: 1 (모노)</li>
              <li>테스트 신호: 440Hz 사인파, 1초</li>
              <li>변환: PCM16 (Int16Array) → Float32Array → AudioBuffer</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={playPcm16Audio}
              className="w-full"
              size="lg"
            >
              테스트 오디오 재생
            </Button>

            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">상태:</p>
              <p className="text-sm text-muted-foreground mt-1">{status}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <h3 className="font-semibold text-foreground">작동 방식:</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>테스트용 PCM16 데이터 생성 (Int16Array)</li>
              <li>PCM16 → Float32 변환 (정규화: -1.0 ~ 1.0)</li>
              <li>AudioContext 생성 및 resume</li>
              <li>AudioBuffer 생성 (24000Hz, 모노)</li>
              <li>Float32 데이터를 AudioBuffer에 복사</li>
              <li>AudioBufferSourceNode로 재생</li>
            </ol>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Pcm16Test;
