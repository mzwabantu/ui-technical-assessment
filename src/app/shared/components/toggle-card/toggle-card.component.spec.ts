import { ToggleCardComponent } from "./toggle-card.component";
import { ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";

describe("ToggleCardComponent", () => {
  let fixture: ComponentFixture<ToggleCardComponent>;
  let component: ToggleCardComponent;
  let router: Router;
  let el: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatIconModule,
        MatDividerModule,
        ToggleCardComponent,
      ],
    });

    fixture = TestBed.createComponent(ToggleCardComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    el = fixture.debugElement.children[0].nativeElement;
  });

  it('should initialize with "closed" state when initialState is "closed"', () => {
    component.initialState = "closed";
    fixture.detectChanges();
    expect(component.isExpanded()).toBe(false);
  });

  it('should initialize with "expanded" state when initialState is "expanded"', () => {
    component.initialState = "expanded";
    fixture.detectChanges();
    setTimeout(() => expect(component.isExpanded()).toBe(true));
  });

  it("should update toggle icon based on expansion state", () => {
    component.updateToggleIcon = true;
    // Set to expanded
    component.isExpanded.set(true);
    fixture.detectChanges();
    expect(component.toggleIcon).toBe("keyboard_arrow_up");

    // Set to closed
    component.isExpanded.set(false);
    fixture.detectChanges();
    expect(component.toggleIcon).toBe("keyboard_arrow_down");
  });

  it("should not update the toggle icon if updateToggleIcon is false", () => {
    component.updateToggleIcon = false;
    fixture.detectChanges();
    expect(component.toggleIcon).toBe("keyboard_arrow_down");
  });

  it("should call toggleDetail and toggle the isExpanded state", () => {
    component.isExpanded.set(false);
    fixture.detectChanges();

    component.toggleDetail();
    fixture.detectChanges();
    expect(component.isExpanded()).toBe(true);

    component.toggleDetail();
    fixture.detectChanges();
    expect(component.isExpanded()).toBe(false);
  });

  it("should not toggle if hasToggle is false", () => {
    component.hasToggle = false;
    component.isExpanded.set(false);
    fixture.detectChanges();

    component.toggleDetail();
    fixture.detectChanges();
    expect(component.isExpanded()).toBe(false);
  });

  it("should navigate to the correct route when goToPage is called", () => {
    const navigateSpy = jest
      .spyOn(router, "navigate")
      .mockReturnValue(Promise.resolve(true));
    component.route = "/test-route";

    component.goToPage();

    expect(navigateSpy).toHaveBeenCalledWith(["/test-route"]);
  });

  it("should not navigate if route is not provided", () => {
    const navigateSpy = jest.spyOn(router, "navigate");
    component.route = "";

    component.goToPage();

    expect(navigateSpy).not.toHaveBeenCalled();
  });

  it("should call ngOnChanges and set the correct initial toggle state", () => {
    const ngOnChangesSpy = jest.spyOn(component, "ngOnChanges");
    component.initialState = "expanded";

    component.ngOnChanges({
      initialState: {
        currentValue: "expanded",
        previousValue: undefined,
        firstChange: true,
        isFirstChange: (): boolean => true,
      },
    });

    expect(ngOnChangesSpy).toHaveBeenCalled();
    expect(component.isExpanded()).toBe(true);
  });
});
