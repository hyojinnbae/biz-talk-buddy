import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

const AudioTest = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('WAV 파일을 선택하세요');
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'audio/wav' || selectedFile.name.endsWith('.wav')) {
        setFile(selectedFile);
        setStatus(`파일 선택됨: ${selectedFile.name}`);
      } else {
        setStatus('WAV 파일만 선택 가능합니다');
        setFile(null);
      }
    }
  };

  const playAudio = async () => {
    if (!file) {
      setStatus('먼저 파일을 선택하세요');
      return;
    }

    try {
      setStatus('오디오 재생 준비 중...');

      // AudioContext 생성
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext();
      }

      // AudioContext resume (사용자 제스처 필요)
      await audioContextRef.current.resume();
      setStatus('AudioContext resumed');

      // 파일을 ArrayBuffer로 읽기
      const arrayBuffer = await file.arrayBuffer();
      setStatus('파일 읽기 완료, 디코딩 중...');

      // decodeAudioData로 디코딩
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      setStatus('디코딩 완료, 재생 시작');

      // 이전 재생 중지
      if (sourceRef.current) {
        sourceRef.current.stop();
      }

      // AudioBufferSourceNode 생성 및 재생
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
      sourceRef.current = source;

      source.onended = () => {
        setStatus('재생 완료');
      };

    } catch (error) {
      console.error('오디오 재생 오류:', error);
      setStatus(`오류 발생: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  };

  const stopAudio = () => {
    if (sourceRef.current) {
      sourceRef.current.stop();
      setStatus('재생 중지됨');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-card rounded-lg shadow-lg p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">WAV 파일 재생 테스트</h1>
          <p className="text-muted-foreground">Web Audio API 테스트 페이지</p>
        </div>

        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
            <input
              type="file"
              accept=".wav,audio/wav"
              onChange={handleFileChange}
              className="block w-full text-sm text-foreground
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-primary-foreground
                hover:file:bg-primary/90
                file:cursor-pointer cursor-pointer"
            />
          </div>

          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm font-medium">상태:</p>
            <p className="text-sm text-muted-foreground mt-1">{status}</p>
          </div>

          <div className="flex gap-4">
            <Button 
              onClick={playAudio} 
              disabled={!file}
              className="flex-1"
              size="lg"
            >
              재생
            </Button>
            <Button 
              onClick={stopAudio} 
              variant="outline"
              className="flex-1"
              size="lg"
            >
              중지
            </Button>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
          <p className="font-semibold">동작 원리:</p>
          <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
            <li>input type="file"로 WAV 파일 선택</li>
            <li>재생 버튼 클릭 시 AudioContext 생성 및 resume()</li>
            <li>file.arrayBuffer()로 파일 데이터 읽기</li>
            <li>decodeAudioData()로 오디오 버퍼로 디코딩</li>
            <li>AudioBufferSourceNode로 재생</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default AudioTest;
