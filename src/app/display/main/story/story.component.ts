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
  ngOnInit() {  
    
  }

  readText = async () => {
    await EasySpeech.init();
    const elements = Array.from(document.querySelectorAll('.story p, .story h2'));
    let paragraphs: string[] = [];

    elements.forEach((p) => {
      paragraphs.push(p.innerHTML);
    });
    
    const voices = EasySpeech.voices();

    let options = {
      text: paragraphs.join('. '),
      rate: 0.9,
      voice: voices[5],
      volume: 1,
      pitch: 1
    }
    this.readingState = "Reading";
    await EasySpeech.speak(options);
    this.readingState = "notStarted";
  }

  pauseReadText() {
    EasySpeech.pause();
    this.readingState = "Paused";
  }

  resumeReadText() {
    EasySpeech.resume();
    this.readingState = "Reading"
  }
}
