import { TestBed } from "@angular/core/testing";
import { ActivityService } from "./activity.service";
import { Store } from "@ngrx/store";

import { logActivity } from "../state/app.actions";
import { Activity } from "../models/activity";
import { AppState } from "../state/app.state";

describe("ActivityService", () => {
  let service: ActivityService;
  let store: Partial<Store<AppState>>;

  beforeEach(() => {
    // Creates a mock for Store using the dispatch method
    store = {
      dispatch: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        ActivityService,
        // Mock Store
        { provide: Store, useValue: store },
      ],
    });
    service = TestBed.inject(ActivityService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should dispatch logActivity when logUserActivity is called", () => {
    const mockActivity: Activity = {
      type: "login",
      timestamp: new Date().toISOString(),
      username: "Test User",
      dataset: null,
      status: null,
    };

    // Calls logUserActivity
    service.logUserActivity(mockActivity);

    // Verifies dispatch was called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith(
      logActivity({ activity: mockActivity }),
    );
  });

  it("should return a random activity from getRandomActivity", () => {
    const randomActivity = service.getRandomActivity();

    // Checks if the returned activity matches expected return type
    expect(randomActivity).toHaveProperty("type");
    expect(randomActivity).toHaveProperty("timestamp");
    expect(randomActivity).toHaveProperty("username");
    expect(randomActivity).toHaveProperty("dataset");
    expect(randomActivity).toHaveProperty("status");

    // Checks if type and status are randomly chosen
    const activityTypes = ["login", "issue", "upload"];
    const activityStatuses = [null, "Hydration Failed"];

    expect(activityTypes).toContain(randomActivity.type);
    expect(activityStatuses).toContain(randomActivity.status);
  });
});
