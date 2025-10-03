import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Pcm16khzTest: React.FC = () => {
  const [status, setStatus] = useState<string>('대기 중');
  const audioContextRef = useRef<AudioContext | null>(null);

  // PCM16 → Float32 변환 함수
  const pcm16ToFloat32 = (pcm16Array: Int16Array): Float32Array => {
    const float32Array = new Float32Array(pcm16Array.length);
    for (let i = 0; i < pcm16Array.length; i++) {
      // Int16 범위: -32768 ~ 32767을 -1.0 ~ 1.0으로 변환
      float32Array[i] = pcm16Array[i] / 32768.0;
    }
    console.log('PCM16 → Float32 변환 완료:', pcm16Array.length, '→', float32Array.length, 'samples');
    return float32Array;
  };

  // 테스트용 PCM16 데이터 생성 (440Hz 사인파, 1초, 16000Hz)
  const generateTestPcm16 = (): Int16Array => {
    const sampleRate = 16000;
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

    console.log('PCM16 테스트 데이터 생성:', numSamples, 'samples @', sampleRate, 'Hz');
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
      
      // 3. AudioContext 생성 (16000Hz)
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext({ sampleRate: 16000 });
        console.log('AudioContext 생성:', audioContextRef.current.sampleRate, 'Hz');
      }
      
      const audioContext = audioContextRef.current;
      
      // AudioContext가 suspended 상태면 resume
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
        console.log('AudioContext resumed');
      }

      setStatus('AudioBuffer 생성 중...');
      
      // 4. AudioBuffer 생성: createBuffer(채널수, 샘플수, 샘플레이트)
      const audioBuffer = audioContext.createBuffer(
        1,                    // 채널 수 (모노)
        float32Data.length,   // 샘플 수
        16000                 // 샘플레이트 (16000Hz)
      );

      console.log('AudioBuffer 생성:', {
        numberOfChannels: audioBuffer.numberOfChannels,
        length: audioBuffer.length,
        sampleRate: audioBuffer.sampleRate,
        duration: audioBuffer.duration
      });

      // 5. Float32 데이터를 AudioBuffer의 채널 0에 복사
      audioBuffer.copyToChannel(float32Data, 0);
      console.log('copyToChannel 완료 (채널 0)');

      setStatus('재생 중...');
      
      // 6. AudioBufferSourceNode로 재생
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      
      source.onended = () => {
        setStatus('재생 완료');
        console.log('재생 완료');
      };

      source.start(0);
      console.log('재생 시작');

    } catch (error) {
      console.error('재생 중 오류:', error);
      setStatus(`오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-6">16000Hz 모노 PCM16 재생 테스트</h1>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">테스트 설정</h2>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>샘플레이트: <strong className="text-foreground">16000 Hz</strong></li>
              <li>채널: <strong className="text-foreground">1 (모노)</strong></li>
              <li>포맷: <strong className="text-foreground">PCM16 (Int16Array)</strong></li>
              <li>테스트 신호: 440Hz 사인파, 1초</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={playPcm16Audio}
              className="w-full"
              size="lg"
            >
              재생 테스트
            </Button>

            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium">상태:</p>
              <p className="text-sm text-muted-foreground mt-1">{status}</p>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <h3 className="font-semibold text-foreground">코드 예시:</h3>
            <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
{`// PCM16 → Float32 변환
const float32 = pcm16ToFloat32(pcm16Data);

// AudioContext 생성
const ctx = new AudioContext({ sampleRate: 16000 });
await ctx.resume();

// AudioBuffer 생성 (채널1, 샘플수, 16000Hz)
const buffer = ctx.createBuffer(1, float32.length, 16000);

// 채널 0에 복사
buffer.copyToChannel(float32, 0);

// 재생
const source = ctx.createBufferSource();
source.buffer = buffer;
source.connect(ctx.destination);
source.start(0);`}
            </pre>
          </div>

          <div className="p-4 bg-primary/10 rounded-lg text-sm">
            <p className="font-semibold mb-2">✅ 확인 사항:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>createBuffer의 세 번째 인자가 16000이어야 정확한 재생 속도</li>
              <li>copyToChannel(data, 0)으로 첫 번째 채널에 복사</li>
              <li>모노 오디오는 채널 1개만 사용</li>
              <li>AudioContext의 sampleRate와 createBuffer의 sampleRate를 일치시키는 것이 좋음</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Pcm16khzTest;
