import { useState } from 'react';
import { Button } from '@/components/ui/button';

const WavTest = () => {
  const [status, setStatus] = useState<string>('테스트 PCM16 데이터를 생성하고 WAV로 변환합니다');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  // PCM16 데이터를 WAV Blob으로 변환하는 함수
  const pcm16ToWav = (pcmData: Int16Array, sampleRate: number = 16000): Blob => {
    const numChannels = 1; // 모노
    const bitsPerSample = 16;
    const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
    const blockAlign = numChannels * (bitsPerSample / 8);
    const dataSize = pcmData.length * 2; // Int16 = 2 bytes

    // WAV 파일 전체 크기 계산
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);

    // RIFF 청크
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true); // 파일 크기 - 8
    writeString(view, 8, 'WAVE');

    // fmt 청크
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true); // fmt 청크 크기
    view.setUint16(20, 1, true); // 오디오 포맷 (1 = PCM)
    view.setUint16(22, numChannels, true); // 채널 수
    view.setUint32(24, sampleRate, true); // 샘플레이트
    view.setUint32(28, byteRate, true); // 바이트레이트
    view.setUint16(32, blockAlign, true); // 블록 정렬
    view.setUint16(34, bitsPerSample, true); // 비트/샘플

    // data 청크
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true); // 데이터 크기

    // PCM 데이터 쓰기
    let offset = 44;
    for (let i = 0; i < pcmData.length; i++) {
      view.setInt16(offset, pcmData[i], true);
      offset += 2;
    }

    return new Blob([buffer], { type: 'audio/wav' });
  };

  // 헬퍼 함수: 문자열을 DataView에 쓰기
  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  // 테스트용 PCM16 데이터 생성 (1초 사인파)
  const generateTestPCM = (): Int16Array => {
    const sampleRate = 16000;
    const duration = 1; // 1초
    const frequency = 440; // A4 음 (라)
    const samples = sampleRate * duration;
    const pcmData = new Int16Array(samples);

    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      const value = Math.sin(2 * Math.PI * frequency * t);
      pcmData[i] = Math.floor(value * 32767); // 16비트 범위로 변환
    }

    return pcmData;
  };

  const handleConvert = () => {
    try {
      setStatus('PCM16 데이터 생성 중...');
      
      // 테스트용 PCM16 데이터 생성
      const pcmData = generateTestPCM();
      setStatus(`${pcmData.length}개 샘플 생성 완료, WAV로 변환 중...`);

      // WAV Blob으로 변환
      const wavBlob = pcm16ToWav(pcmData, 16000);
      setStatus('WAV 변환 완료, 다운로드 준비 중...');

      // 다운로드 URL 생성
      const url = URL.createObjectURL(wavBlob);
      setDownloadUrl(url);
      setStatus(`WAV 파일 준비 완료 (크기: ${(wavBlob.size / 1024).toFixed(2)} KB)`);

    } catch (error) {
      console.error('변환 오류:', error);
      setStatus(`오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  const handleClear = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }
    setStatus('테스트 PCM16 데이터를 생성하고 WAV로 변환합니다');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">PCM16 → WAV 변환 테스트</h1>
          <p className="text-muted-foreground">브라우저에서 PCM16 데이터를 WAV 파일로 변환</p>
        </div>

        <div className="space-y-4">
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm font-medium">상태:</p>
            <p className="text-sm text-muted-foreground mt-1">{status}</p>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={handleConvert}
              className="flex-1"
              size="lg"
            >
              PCM16 생성 & WAV 변환
            </Button>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              초기화
            </Button>
          </div>

          {downloadUrl && (
            <div className="border-2 border-primary rounded-lg p-6 text-center space-y-3">
              <p className="text-sm font-semibold text-primary">WAV 파일이 준비되었습니다!</p>
              <a
                href={downloadUrl}
                download="test-audio.wav"
                className="inline-block"
              >
                <Button size="lg" variant="default">
                  WAV 파일 다운로드
                </Button>
              </a>
            </div>
          )}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold">동작 원리:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>테스트용 PCM16 데이터 생성 (440Hz 사인파, 1초)</li>
            <li>WAV 헤더 생성 (RIFF, fmt, data 청크)</li>
            <li>PCM16 데이터를 WAV 포맷으로 변환</li>
            <li>Blob으로 변환 후 다운로드 URL 생성</li>
            <li>&lt;a download&gt; 태그로 파일 다운로드</li>
          </ol>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="font-semibold">설정:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>샘플레이트: 16000Hz</li>
              <li>채널: 모노 (1채널)</li>
              <li>비트 깊이: 16-bit PCM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WavTest;
