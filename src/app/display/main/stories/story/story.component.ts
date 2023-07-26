import { Component, Input, OnInit } from '@angular/core';
import EasySpeech from 'easy-speech';
@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  @Input() story: number|undefined = 0;
  readingState = "notStarted";

  ngOnInit() { }

  readText = async () => {
    let enVoices: any[] = [];
    let prefVoice;
    await EasySpeech.init();
    const elements = Array.from(document.querySelectorAll('.story p, .story h2'));
    let paragraphs: string[] = [];

    elements.forEach((p) => {
      paragraphs.push(p.innerHTML);
    });
    
    const voices = EasySpeech.voices();
    
    voices.forEach((voice) => {
      if (voice.voiceURI == 'Google UK English Female') {
        prefVoice = voice;
        return;
      }
      if (voice.lang.startsWith('en')) {
        enVoices.push(voice);
      }
    });

    if (!prefVoice && enVoices.length > 0) prefVoice = enVoices[0];

    let options = {
      text: paragraphs.join('. '),
      rate: 0.9,
      voice: prefVoice,
      volume: 1,
      pitch: 1
    }
    this.readingState = "Reading";
    await EasySpeech.speak(options);
    this.readingState = "notStarted"
  }

  pauseReadText() {
    console.log(EasySpeech.detect());
    console.log(EasySpeech.status());
    console.log(EasySpeech.debug);
    EasySpeech.pause();
    this.readingState = "Paused";
  }

  resumeReadText() {
    console.log(EasySpeech.detect());
    console.log(EasySpeech.status());
    EasySpeech.resume();
    this.readingState = "Reading"
  }
}