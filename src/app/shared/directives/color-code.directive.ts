import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from "@angular/core";

@Directive({
  selector: "[colorCode]",
})
export class ColorCodeDirective implements OnChanges {
  @Input() colorCode!: "up" | "down" | "";

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["colorCode"]) {
      this.updateColor(this.colorCode);
    }
  }

  // Changes colour of the element based on trend: "up" | "down"
  private updateColor(value: string): void {
    if (value === "up") {
      this.renderer.setStyle(this.el.nativeElement, "color", "#75bb34");
    } else if (value === "down") {
      this.renderer.setStyle(this.el.nativeElement, "color", "#eb4528");
    } else {
      this.renderer.removeStyle(this.el.nativeElement, "color");
    }
  }
}
